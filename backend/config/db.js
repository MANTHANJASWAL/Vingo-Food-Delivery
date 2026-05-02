const mongoose = require("mongoose");

const connectDb=async()=>{
  try{
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("db connected")
  }catch(error){
    console.log("db error");
  }
}

module.exports=connectDb;
