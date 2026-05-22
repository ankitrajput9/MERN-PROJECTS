import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
const userSchema = new mongoose.Schema({
username:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String,
    required:true
},
email:{
    type:String,
    required:true,
    unique:true
}

},{timestamps:true})

userSchema.pre("save",async function(){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password,10)
    }
})
userSchema.methods.comparePassword = async function(currentpassword){
    return await bcrypt.compare(currentpassword,this.password) 
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign({id :this._id},process.env.REFRESH_TOKEN_SECRET,{expiresIn:"7d"})
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign({id : this._id},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"1d"})
}

export const userModel = mongoose.model("user",userSchema)