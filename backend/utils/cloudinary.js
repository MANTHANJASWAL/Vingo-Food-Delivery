const cloudinary = require("cloudinary").v2;
const fs = require("fs");

cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const result = await cloudinary.uploader.upload(filePath);

    fs.unlinkSync(filePath); // delete local file

    return result; // return full object

  } catch (error) {
    if (filePath) fs.unlinkSync(filePath);
    console.log(error);
    throw error;
  }
};

module.exports = uploadOnCloudinary;