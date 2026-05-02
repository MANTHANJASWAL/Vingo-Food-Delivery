const express=require("express");
const { createEditShop, getMyShop, getAllShops } = require("../controllers/shopControllers");
const { isAuth } = require("../middlewares/isAuth");
const {upload} = require("../middlewares/multer");

const shopRouter=express.Router();


shopRouter.post("/create-edit",isAuth,upload.single("image"),createEditShop);
shopRouter.get("/get-my",isAuth,getMyShop);
shopRouter.get("/all",isAuth,getAllShops);
module.exports=shopRouter;
