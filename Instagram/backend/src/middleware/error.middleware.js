const errorMiddleware = (err,req,res,next) =>{
console.log("error in middleware --->",err.message)

let statusCode = err.statusCode || 500
return res.status(statusCode).json({
    message: err.message || "internal server error",
    success:false
})

}
  
module.exports = errorMiddleware