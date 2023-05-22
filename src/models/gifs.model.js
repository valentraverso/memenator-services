const mongoose = require("mongoose");

const gifSchema = mongoose.Schema(
    {
        file: {
            public_id: {
                type: String,
                required: false
            },
            secure_url: {
                type: String,
                required: [true, "You need to add a the url of the gif."]
            }
        },
        description: {
            type: String,
            maxlength: 30,
            required: [ture, "You need to add a description."]
        }
    },
    {
        timestamps: true
    }
);

const gifModel = model("gifs", gifSchema);

module.exports = gifModel;