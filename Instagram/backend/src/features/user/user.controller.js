const userModel = require("../../models/user.model");
const asyncHandler = require("../../utils/asyncHandler");
const CustomError = require("../../utils/errorHandler");

const profileController = asyncHandler(async(req,res)=>{


    // here we use populate ye objecId ko open karke pura object return karta hai usmai se jo chaiye select krke nikkal lo 
   
    const userProfile = await userModel.findById(req.user._id).populate("posts","photos videos")

  const post = userProfile.posts.length
  const follower = userProfile.followers.length
  const following = userProfile.following.length


  const userPostData = {...userProfile,post,follower,following}


  return res.status(200).json({
    success:true,
    message:"user profile fetched",
    user:userPostData
  })

})

const targetUserProfileController = asyncHandler(async(req,res)=>{

const targetUserId = req.params
if(!targetUser) throw new CustomError("id not Found",404)
    // here we use populate ye objecId ko open karke pura object return karta hai usmai se jo chaiye select krke nikkal lo 
   
    const userProfile = await userModel.findById(targetUserId).populate(
        "posts",
        "photos videos")

  const post = userProfile.posts.length
  const follower = userProfile.followers.length
  const following = userProfile.following.length


  const targetUserPostData = {...userProfile,post,follower,following}


  return res.status(200).json({
    success:true,
    message:"user profile fetched",
    user:targetUserPostData 
  })

})




module.exports= {
    profileController,
    targetUserProfileController

}