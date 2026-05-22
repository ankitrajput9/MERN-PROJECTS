
const express = require ("express")
const connectDb = require("./config/db")
const errorMiddleware = require("./middleware/error.middleware")
const cookieParser = require("cookie-parser")

 const app = express()
 connectDb()
 app.use(express.json())
app.use(cookieParser())


app.get("/",(req,res)=>{
    console.log("ok")
})

 app.use(errorMiddleware)
module.exports=app

