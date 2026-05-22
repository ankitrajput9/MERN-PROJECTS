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


})


export const loginController = asyncHandler(async(req,res)=>{
    

})


