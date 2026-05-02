import React from "react";
import { useState } from "react";
import { IoIosArrowRoundBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { serverUrl } from "../App";
import axios from "axios";
import { ClipLoader } from "react-spinners";
function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp,setOtp] = useState("");
  const navigate = useNavigate();
  const [newPassword,setNewPassword] = useState("");
  const [confirmPassword,setConfirmPassword] = useState("");
  const [err,setErr]=useState("");
  const [loading,setLoading]=useState(false);
  const handleSendOtp=async()=>{
    setLoading(true);
    try{
      const result=await axios.post(`${serverUrl}/api/auth/send-otp`,{email},{withCredentials:true});
      console.log(result);
      if(result.status===200){
        setStep(2);
      }
      setErr("");
      setLoading(false);
    }catch(error){
      setErr(error?.response?.data?.message);
      setLoading(false);
    }
  }
  const handleVerifyOtp=async()=>{
    setLoading(true);
    try{
      const result=await axios.post(`${serverUrl}/api/auth/verify-otp`,{email,otp},{withCredentials:true});
      console.log(result);
      if(result.status===200){
        setStep(3);
      }
      setErr("");
      setLoading(false);
    }catch(error){
      setErr(error?.response?.data?.message);
      setLoading(false);    
    }
  }
  const handleResetPassword=async()=>{
    setLoading(true);
    if(newPassword!=confirmPassword){
      return ;
    }
    try{
      const result=await axios.post(`${serverUrl}/api/auth/reset-password`,{email,newPassword},{withCredentials:true});
      console.log(result);
      if(result.status===200){
        navigate("/signin");
      }
      setErr("");
      setLoading(false);
    }catch(error){
      setErr(error?.response?.data?.message);
      setLoading(false);
      
    }
  }

  return (
    <div className="flex w-full items-center justify-center min-h-screen p-4 bg-[#fff9f6]">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">
        <div className="flex items-center gap-4 mb-4">
          <IoIosArrowRoundBack
            size={30}
            className="text-[#ff4d2d] cursor-pointer"
            onClick={() => navigate("/signin")}
          />
          <h1 className="text-2xl font-bold text-center text-[#ff4d2d]">
            Forgot Password
          </h1>
        </div>
        {step == 1 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                Email{" "}
              </label>
              <input
                type="email"
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Enter your Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)} required
              />
            </div>
            <button
              className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleSendOtp} disabled={loading}
            >
              {loading?<ClipLoader size={20}  color='white'/>:"Send OTP"}
            </button>
            {err && <p className='text-red-500 text-center my-[10px]'>*{err} </p>}
          </div>
        )}
        {step == 2 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-1"
              >
                OTP
              </label>
              <input
                type="text"
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)} required
              />
            </div>
            <button
              className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleVerifyOtp} disabled={loading}
            >
              {loading?<ClipLoader size={20}  color='white'/>:"Verify"}
            </button>
            {err && <p className='text-red-500 text-center my-[10px]'>*{err} </p>}
          </div>
        )}
        {step == 3 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="newPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                New Password
              </label>
              <input
                type="password"
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Enter New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)} required                
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="ConfirmPassword"
                className="block text-gray-700 font-medium mb-1"
              >
                Confirm Password
              </label>
              <input
                type="password"
                className="w-full border-[1px] border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:border-orange-500"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <button
              className={`w-full mt-4 flex items-center justify-center gap-2 border rounded-lg px-4 py-2 transition duration-200 bg-[#ff4d2d] text-white hover:bg-[#e64323] cursor-pointer`} onClick={handleResetPassword} disabled={loading}
            >
              {loading?<ClipLoader size={20}  color='white'/>:"Reset Password"}
            </button>
            {err && <p className='text-red-500 text-center my-[10px]'>*{err} </p>}
          </div>
        )}
      </div>
    </div>
  );
}

export default ForgotPassword;
