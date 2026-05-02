const express=require("express");
const { signUp,signIn,signOut, sendOtp, verifyOtp, resetPassword, googleAuth } = require("../controllers/authControllers");
const authrouter=express.Router();

authrouter.post("/signup",signUp);
authrouter.post("/signin",signIn);
authrouter.get("/signout",signOut);
authrouter.post("/send-otp",sendOtp);
authrouter.post("/verify-otp",verifyOtp);
authrouter.post("/reset-password",resetPassword);
authrouter.post("/google-auth",googleAuth);
module.exports=authrouter;