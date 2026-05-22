const userModel = require("../../models/user.model");
const sendImagetoIK = require("../../services/storage.service");
const asyncHandler = require("../../utils/asyncHandler");
const CustomError = require("../../utils/errorHandler");

  const registerController = asyncHandler(async (req,res)=>{
let {name,username,email,password,bio} = req.body
if(!username||!email||!password) throw new CustomError("all fields require",400)

    const isExist =await  userModel.findOne({email})
    if(isExist)throw new CustomError("user already exist",400)

        if(!req.file) throw new CustomError("images not found  ",404)
            
            let {buffer,originalname}= req.file
            let Dp = await sendImagetoIK(buffer,originalname)

    let newUser = await userModel.create({
        name,
        username,
        email,
        password,
        bio,
        profile_pic:Dp
    })

    let token = newUser.generateJWT()
    res.cookie("token",token)

    return res.status(201).json({
        success:true,
        message:"user registered  ",
        user:newUser
    })

  })

const loginController = asyncHandler(async(req,res)=>{
let {email,password} = req.body
if(!email||!password) throw new CustomError("All fields required",400)

let user = await userModel.findOne({email})

if(!user) throw new CustomError("user not found",404)  

  let decode = user.comparePass(password)
  if(!decode) throw new CustomError("invalid password or email",401)

  let token = user.generateJWT()
  req.cookie("token",token)


  return res.status(200).json({
    success:true,
    message:"user logedin",
    user
  })

    




})

const logoutController = asyncHandler(async(req,res)=>{

 const  userId = req.user._id
 if(!user) throw new CustomError("user not Found",404)

  res.clearCookies(token)

  return res.status(200).json({
    success:true,
    message:"user loged Out"

  })

})

  module.exports = {
    registerController,
    loginController,
    logoutController
  }