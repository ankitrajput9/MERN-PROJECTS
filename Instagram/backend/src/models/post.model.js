const { default: mongoose } = require("mongoose");

const postSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    },

    images: [{
        type: String,
        required: true
    }],
    videos: [{
        type: String,
        required: true
    }],
    caption:{
        type: String,
        default:""
    },

    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
    ]
}, { timestamps: true })
const postModel = mongoose.model("posts", postSchema)

module.exports = postModel 