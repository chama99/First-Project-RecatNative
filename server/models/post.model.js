const mongoose = require("mongoose");
const User = require('../models/user.model');

const PostSchema = new mongoose.Schema(
    {
        userId: {
            type: Object,
            required: true
        },
        desc: String,
        img: [String],
        likes: [String],
        comments: [String],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
