export const homeController = async(req,res)=>{

    try {

        res.send("hello i am home")
    console.log(req.user)    
    
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"internal server error",
            error
        })
    }
}