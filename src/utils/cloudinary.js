const cloudinary = require('cloudinary').v2;
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = require("../config/config");

const uploadGif = async (filePath) => {
    return await cloudinary.uploader.upload(filePath, {
        resource_type: 'image',
        folder: 'Memenator/gifs'
    });
}

module.exports = {
    uploadGif
}