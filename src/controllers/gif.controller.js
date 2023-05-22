const { gifModel } = require("../models");
const { uploadGif } = require("../utils/cloudinary");
const fs = require("fs-extra");

const gifController = {
    getAll: async (req, res) => {
        try {
            const gif = await gifModel
                .find()
                .lean()
                .exec();

            if (!gif) {
                return res.status(400).send({
                    status: false,
                    msg: "We couldn't find registers."
                });
            }

            return res.status(200).send({
                status: true,
                msg: "We find registers.",
                data: gif
            })
        } catch (err) {
            return res.status(500).send({
                status: false,
                msg: "We have trouble in the server."
            })
        }
    },
    postGif: async (req, res) => {
        const { description, tags } = req.body;
        const { gifs } = req.files;

        if (gifs.mimetype !== 'image/gif') {
            await fs.unlink(gifs.tempFilePath);
            return res.status(415).send({
                status: false,
                msg: "We only allow gifs."
            })
        }

        try {
            const { public_id, secure_url } = await uploadGif(gifs.tempFilePath);
            await fs.unlink(gifs.tempFilePath);

            const gif = await gifModel
                .create({
                    file: {
                        public_id,
                        secure_url
                    },
                    description,
                    tags
                });

            res.status(200).send({
                status: true,
                msg: "We upload a gif",
                data: gif
            })
        } catch (err) {
            return res.status(500).send({
                status: false,
                msg: "There was an error",
                data: err.message
            })
        }
    },
    postGifUrl: async (req, res) => {
        const { description, tags, url } = req.body;

        try {

        } catch (err) {
            return res.status(500).send({
                status: false,
                msg: "There was an error",
                data: err.message
            })
        }
    }
}

module.exports = gifController;