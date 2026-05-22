  
  const express = require("express")
const upload = require("../../config/multer")
const { registerController, loginController, logoutController } = require("./auth.controller")
const authMiddleware = require("../../middleware/auth.middleware")

  const router = express.Router()
  router.post("/register",upload.single("image"),registerController)
  router.post("/login",loginController)
  router.post("/logout",authMiddleware,logoutController)

  module.exports= router