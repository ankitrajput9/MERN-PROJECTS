  const express = require ("express")
const { profileController, targetUserProfile, targetUserProfileController } = require("./user.controller")
const authMiddleware = require("../../middleware/auth.middleware")
 const router = express.Router()


 router.get("/profile",authMiddleware,profileController)
 router.get("/profile/:targetuser",authMiddleware,targetUserProfileController)



 module.exports= router