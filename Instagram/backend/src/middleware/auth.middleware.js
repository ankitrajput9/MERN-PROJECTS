const userModel = require("../models/user.model");
const asyncHandler = require("../utils/asyncHandler");
const CustomError = require("../utils/errorHandler");
const jwt = require("jsonwebtoken")

const authMiddleware = asyncHandler(async (req,res,next)=>{

    const {token} = req.cookies
    if(!token) throw new CustomError("token not found",404)

    const verify =  jwt.verify(token,process.env.SECRET_KEY)

    if(!verify) throw new CustomError("Unauthorized user",401)

        let user = await userModel.findById(verify.id)

        req.user = user
        next()
})

module.exports= authMiddleware