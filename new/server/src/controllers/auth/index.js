import { userModel } from "../../models/user.model.js"
import { asyncHandler } from "../../services/asyncHandler.js"
import { Customerror } from "../../utils/errorHandler.js"

export const registerController = asyncHandler(async(req,res)=>{
    const {username,password,email} = req.body
if(!username || !password || !email){
   throw new Customerror("All field require",400)
}
const newUser = await  userModel.create({
    username,password,email
})

const AccessToken = newUser.generateAccessToken()
const RefreshToken = newUser.generateRefreshToken()

res.cookie("access",AccessToken).cookie("refresh",RefreshToken)

return res.status(201).json({
    success:true,
    message:"User created successfully",
    user:newUser
})

})


export const loginController = asyncHandler(async(req,res)=>{
const {email,password} = req.body
if(!email || !password){
   throw new Customerror("All field require",400)
}

const user = await userModel.findOne({email}).select("+password")
if(!user){
    throw new Customerror("Invalid credentials",400)}

    const isMatch = await user.comparePassword(password)
    if(!isMatch){
        throw new Customerror("Invalid credentials",400)
    }
    
    const AccessToken = user.generateAccessToken()
const RefreshToken = user.generateRefreshToken()
res.cookie("access",AccessToken).cookie("refresh",RefreshToken)

return res.status(200).json({
    success:true,
    message:"User logged in successfully",
    user

})

})
