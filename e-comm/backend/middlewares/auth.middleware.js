import jwt from "jsonwebtoken";
import { userModel } from "../models/user.model.js";

export const authMiddleware = async(req,res,next)=>{

 try {
       const token = req.cookies.token;
 if(!token){
    return res.status(401).json({
        message:"token not found"
    })
 }

 const verify = jwt.verify(token,process.env.SECRET_KEY)

if(!verify){
    return res.status(404).json({
        message:"token not verified"
    })
}

let user = await userModel.findById(verify.id).select("-password")
console.log(user)
req.user = user;
next()


 } catch (error) {
    return res.status(500).json({

        success:false,
        message:"error in middleware",
        error
    })
 }
}