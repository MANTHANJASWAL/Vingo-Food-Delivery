const Item =require("../models/itemModel") ;
const Shop = require("../models/shopModel");
const uploadOnCloudinary =require("../utils/cloudinary");

 const addItem=async (req ,res)=>{
  try {
    const {name,category,foodType,price}=req.body;
    let image;
    if(req.file){
      const uploaded=await uploadOnCloudinary(req.file.path)
      image=uploaded.url;
    }
    const shop=await Shop.findOne({owner:req.userId})
    if(!shop){
      return res.status(400).json({message:"shop not found"})
    }
    const item=await Item.create({
      name,category,foodType,price,image,shop:shop._id
    })
    shop.Items.push(item._id)
    await shop.save()
    (await shop.populate("owner")).populate({
      path:"Items",
      options:{sort:{updatedAt:-1}}
    })
    return res.status(201).json(shop)
  } catch (error) {
    return res.status(500).json({message:`add item error ${error}`})
  }
}
 const editItem=async(req ,res)=>{
  try {
    const itemId=req.params.itemId
    const {name,category,foodType,price}=req.body
    const updateData={name,category,foodType,price}
    if(req.file){
      const uploaded=await uploadOnCloudinary(req.file.path)
      updateData.image=uploaded.url
    }
    const item=await Item.findByIdAndUpdate(itemId,updateData,{returnDocument:"after"})
    if(!item){
      return res.status(400).json({message:"Item not found"})
    }
    const shop=await Shop.findOne({owner:req.userId}).populate({
      path:"Items",
      options:{sort:{updatedAt:-1}}
    })
    return res.status(200).json(shop)
  } catch (error) {
    return res.status(500).json({message:`edit item error ${error}`})
  }
}
const getItemById=async(req,res)=>{
  try {
    const itemId=req.params.itemId
    const item=await Item.findById(itemId)
    if(!item){
      return res.status(400).json({message:"Item not found"})
    }
    return res.status(200).json(item)
  } catch (error) {
    return res.status(500).json({message:`get item by id error ${error}`})
  }
}
const deleteItem=async (req,res)=>{
  try {
    const itemId=req.params.itemId
    const existingShop=await Shop.findOne({owner:req.userId})
    if(!existingShop){
      return res.status(400).json({message:"shop not found"})
    }
    const item=await Item.findOneAndDelete({_id:itemId,shop:existingShop._id})
    if(!item){
      return res.status(400).json({message:"Item not found"})
    }
    const shop=await Shop.findOneAndUpdate(
      {owner:req.userId},
      {$pull:{Items:itemId}},
      {returnDocument:"after"}
    ).populate({
      path:"Items",
      options:{sort:{updatedAt:-1}}
    })
    return res.status(200).json(shop)
  } catch (error) {
    return res.status(500).json({message:`delete item by id error ${error}`})
  }
}
module.exports={
  addItem,
  editItem,
  getItemById,
  deleteItem
}
