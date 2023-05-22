const cloudinary = require('cloudinary').v2;
cloudinary.config();

const uploadGif = async (filePath) => {
    try {
        return await cloudinary.uploader.upload(filePath, {
            resource_type: 'image',
            folder: 'Memenator/gifs'
        });
    } catch (err) {
        console.log(err)
        return {
            status: false,
            msg: err.message
        }
    }
}

module.exports = {
    uploadGif
}