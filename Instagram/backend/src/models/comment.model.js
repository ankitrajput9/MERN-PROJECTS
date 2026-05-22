const { default: mongoose } = require("mongoose");

 const commentSchema = new mongoose.Schema({
    user_id : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"users"
    },
    post_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"posts"
    },
    text:{
        type:String,
        required:true
    }
 },{timestamps:true})

 const commentModel = mongoose.model("comments",commentSchema)

 module.exports= commentModel