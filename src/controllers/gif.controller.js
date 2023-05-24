const { default: mongoose } = require("mongoose");
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
    getByDescription: async (req, res) => {
        const { description } = req.params;

        try {
            const gif = await gifModel
                .aggregate([
                    {
                        $match: {
                            description: {
                                $regex: description,
                                $options: "i"
                            }
                        }
                    }
                ])

            if (gif < 1) {
                return res.status(404).send({
                    status: false,
                    msg: "We couldn't find results."
                })
            }

            return res.status(200).send({
                status: true,
                msg: "We find registers.",
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
    getById: async (req, res) => {
        const { idGif } = req.params;

        if (!mongoose.Types.ObjectId.isValid(idGif)) {
            return res.status(400).send({
                status: false,
                msg: "Please you need to send a valid object ID."
            })
        }

        try {
            const gif = await gifModel
                .findById(idGif)
                .lean()
                .exec();

            if (!gif) {
                return res.status(404).send({
                    status: false,
                    msg: "We couldn't find this id."
                })
            }

            return res.status(200).send({
                status: true,
                msg: "We find a register.",
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
    getMostUploadTags: async (req, res) => {
        try {
            const gif = await gifModel
                .aggregate([
                    {
                        $unwind: "$tags"
                    },
                    {
                        $sortByCount: "$tags"
                    },
                    {
                        $limit: 5
                    }
                ])
                .exec();

            if (gif.length < 1) {
                return res.status(400).send({
                    status: false,
                    msg: "We couldn't find tags."
                })
            }

            return res.status(200).send({
                status: true,
                msg: "We could find registers.",
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
    getByTagName: async (req, res) => {
        const { tag } = req.params;

        if (tag.length > 20) {
            return res.status(409).send({
                status: false,
                msg: "The name of the tag need to be less than 20 characters."
            })
        }

        try {
            const gif = await gifModel
                .aggregate([
                    {
                        $match: {
                            tags: {
                                $in: [tag]
                            }
                        }
                    }
                ])
                .exec();

            if (gif.length < 1) {
                return res.status(404).send({
                    status: false,
                    msg: "We couldn't find this tag."
                })
            }

            return res.status(200).send({
                status: true,
                msg: "We could find registers.",
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
    postGif: async (req, res) => {
        const { description, tags } = req.body;
        const { gifs } = req.files;
        const { auth: { payload: { sub } } } = req;

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
                    tags: tags.split(","),
                    owner: sub
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
        const { auth: { payload: { sub } } } = req;

        try {
            const gif = await gifModel
                .create({
                    file: {
                        secure_url: url
                    },
                    description,
                    tags: tags.split(","),
                    owner: sub
                });

            res.status(200).send({
                status: true,
                msg: "We upload your gif.",
                data: gif
            })

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