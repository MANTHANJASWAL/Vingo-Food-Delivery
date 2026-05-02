const express=require("express");

const { isAuth } = require("../middlewares/isAuth");
const { addItem, editItem, getItemById, deleteItem } = require("../controllers/itemControllers");
const { upload } = require("../middlewares/multer");

const itemRouter=express.Router();


itemRouter.post("/add-item",isAuth,upload.single("image"),addItem);
itemRouter.post("/edit-item/:itemId",isAuth,upload.single("image"),editItem);
itemRouter.get("/get-by-id/:itemId",isAuth,getItemById);
itemRouter.get("/delete/:itemId",isAuth,deleteItem);
module.exports=itemRouter;
