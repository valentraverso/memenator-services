const { mongoose, model, Types } = require("mongoose");

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
            required: [true, "You need to add a description."]
        },
        tags: {
            type: Array
        },
        views: {
            type: Number,
            required: false,
            default: 0
        },
        owner:{
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

const gifModel = model("gifs", gifSchema);

module.exports = gifModel;