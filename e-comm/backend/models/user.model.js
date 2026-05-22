import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
     mobile:{
        type:String,
        required:true,
        maxlength:10,
        minlength:10

    },
     password:{
        type:String,
        required:true,
        minlength:6
    },
    products:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"products"
        }
    ],
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"cart"
    }
},{timestamps:true})

export const userModel = mongoose.model("users",userSchema)