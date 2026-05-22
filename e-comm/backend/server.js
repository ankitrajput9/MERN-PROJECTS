import dotenv, { config } from "dotenv"
dotenv.config()
import express from 'express'
import { connectDB } from "./config/DB.js"
import Authrouter from "./routes/auth.route.js"
import Homerouter from "./routes/home.route.js"
import Productrouter from "./routes/product.route.js"
import Userrouter from "./routes/user.route.js"
import Cartrouter from "./routes/cart.route.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import { authMiddleware } from "./middlewares/auth.middleware.js"
import { connectCache } from "./config/cache.js"

const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use(cors(
    {
        origin:"http://localhost:5173",
        credentials:true
    }
))
connectDB()
connectCache()
app.use('/api/auth',Authrouter)
app.use('/api/home',Homerouter)
app.use('/api/products',Productrouter)
app.use('/api/user',Userrouter)
app.use("/api/cart",authMiddleware,Cartrouter)



const port = process.env.PORT
app.listen(port,()=>{
console.log(`http://localhost:${port}`)
})