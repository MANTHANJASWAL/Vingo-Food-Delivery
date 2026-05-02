const Shop = require("../models/shopModel");
const uploadOnCloudinary = require("../utils/cloudinary");

 const createEditShop=async(req ,res)=>{
  try {
    const {name,city,state,address}=req.body
    let image;
    if(req.file){
      const uploaded=await uploadOnCloudinary(req.file.path)
      image=uploaded.url
    }
    let shop=await Shop.findOne({owner:req.userId})
    if(shop){
      shop=await Shop.findByIdAndUpdate(shop._id,{
      name,city,state,address,image,owner:req.userId
    }, { returnDocument:"after"})
    }
    else{
      shop=await Shop.create({
      name,city,state,address,image,owner:req.userId
    })
    }
    
    await shop.populate("owner Items")
    return res.status(201).json(shop);
  } catch (error) {
    return res.status(500).json({message:`create shop error ${error}`})
  }
}
 const getMyShop =async(req ,res)=>{
  try {
    const shop=await Shop.findOne({owner:req.userId}).populate("owner Items")
    if(!shop){
      return res.status(200).json(null);
    }
    return res.status(200).json(shop)

  } catch (error) {
    return res.status(500).json({message:`Get my shop error ${error}`})
  }
}
 const getAllShops =async(req ,res)=>{
  try {
    const shops=await Shop.find({}).populate({
      path:"Items",
      options:{sort:{updatedAt:-1}}
    })
    return res.status(200).json(shops)
  } catch (error) {
    return res.status(500).json({message:`Get all shops error ${error}`})
  }
}
module.exports={
  createEditShop,
  getMyShop,
  getAllShops
}
