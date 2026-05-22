import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    productName:{
        type:String,
        require:true,
    },
    description:{
        type:String
    },
    images:[
    {
     type:String,
    required:true
    
    }
    ],
    price:{
        amount:{
            type:String,
            required:true
        },
        currency:{
            type:String,
            enum:['INR',"$"],
            default:"INR"
        }
    }
},{timestamps:true})

export const productModel = mongoose.model("products",productSchema)