const albumModel = require("../models");

const gifController = {
    getAll: async (req, res) => {
        try {

        } catch (err) {
            return res.status(500).send({
                status: false,
                msg: "We have trouble in the server."
            })
        }
    },
    postGif: async (req, res) => {
        const { description, tags } = req.body;
        const { gif } = req.files;

        try {
            const gif = await albumModel
                .create({
                    description,
                    tags
                })
        } catch (err) {
            return res.status(500).send({
                status: false,
                msg: "We have trouble in the server."
            })
        }
    }
}

module.exports = gifController;