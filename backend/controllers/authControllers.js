const User=require("../models/userModel.js");
const bcrypt=require("bcrypt");
const genToken = require("../utils/token.js");
const sendOtpMail = require("../utils/mail.js");
const signUp=async(req,res)=>{
  try{
    const {fullname,email,password,mobile,role}=req.body;
    let user=await User.findOne({email});
    if(user){
      return res.status(400).json({message:"User Already exist."});
    }
    if(!password || password.length<6){
      return res.status(400).json({message:"Password must be atleast 6 characters,"});
    }
    if(!mobile || mobile.length<10){
      return res.status(400).json({message:"Mobile no. must be of 10 digits."});
    }
    const hashedPassword=await bcrypt.hash(password,10);
    user=await User.create({
      fullname,
      email,
      role,
      mobile,
      password:hashedPassword
    })
    const token=await genToken(user._id);
    res.cookie("token",token,{
      secure:false,
      sameSite:"strict",
      maxAge:7*24*60*60*1000,
      httpOnly:true
    })
    return res.status(201).json(user);
  }catch(error){
    return res.status(500).json(`sign up error ${error}`);
  }

}
const signIn=async(req,res)=>{
  try{
    const {email,password}=req.body;
    const user=await User.findOne({email});
    if(!user){
      return res.status(400).json({message:"User Doesn't exist."});
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch){
      return res.status(400).json({message:"Incorrect password"});
    }
    const token=await genToken(user._id);
    res.cookie("token",token,{
      secure:false,
      sameSite:"strict",
      maxAge:7*24*60*60*1000,
      httpOnly:true
    })
    return res.status(200 ).json(user);
  }catch(error){
    return res.status(500).json(`sign in error ${error}`);
  }
}
const signOut=async(req, res)=>{
  try{
    res.clearCookie("token");
    return res.status(200).json(`logout successfully`);
  }catch(error){
    return res.status(500).json(`signout error ${error}`);
  }
}

const sendOtp=async(req,res)=>{
  try{
    const {email}=req.body;
    const user=await User.findOne({email});
    if(!user){
      return res.status(400).json({message:"User does not exist"});
    }
    const otp=Math.floor(1000+Math.random()*900000).toString();
    user.resetOtp=otp;
    user.otpExpires=new Date(Date.now()+5*60*1000);
    user.isOtpVerifies=false;
    await user.save();
    await sendOtpMail(email,otp);
    return res.status(200).json({message:"OTP sent successfully"});
  }catch(error){
  console.log("SEND OTP ERROR:", error);
  return res.status(500).json({message:"Server error"});
}
}
const verifyOtp=async(req ,res)=>{
  try{
    const {email,otp}=req.body;
    const user=await User.findOne({email});
    if(!user ||user.resetOtp!=otp || user.otpExpires<Date.now()){
      return res.status(400).json({message:"Invalid/expired OTP"});
    }
    user.isOtpVerifies=true;
    user.resetOtp=undefined;
    user.otpExpires=undefined;
    await user.save();
    return res.status(200).json({message:"Otp verify successfully"});
  }catch(error){
    return res.status(500).json (`verify otp error ${error}`);
  }
}
const resetPassword=async(req,res)=>{
  try{
    const {email,newPassword}=req.body;
    const user=await User.findOne({email});
    if(!user || !user.isOtpVerifies){
      return res.status(400).json({message:"otp verification required"});
    }
    const hashedPassword=await bcrypt.hash(newPassword,10);
    user.password=hashedPassword;
    user.isOtpVerifies=false;
    await user.save();
    return res.status(200).json({message:"password reset successfully"});
  } catch(error){
    return res.status(500).json(`reset password error ${error}`);
  }
}

const googleAuth=async(req, res)=>{
  try{
    const {fullname ,email,mobile,role}=req.body;
    let user=await User.findOne({email});
    if(!user){
      user=await User.create({
        fullname ,email,mobile ,role
      })
    }

    const token=await genToken(user._id);
    res.cookie("token",token,{
      secure:false,
      sameSite:"strict",
      maxAge:7*24*60*60*1000,
      httpOnly:true
    })

    return res.status(200).json(user);
  }catch(error){
    return res.status(500).json(`GoogleAuth error ${error}`);
  }
}

module.exports={
  signUp,
  signIn,
  signOut,
  sendOtp,
  resetPassword,
  verifyOtp,
  googleAuth
};
