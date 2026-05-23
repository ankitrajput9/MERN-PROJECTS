import express from "express"
import authRoute from "./routes/auth/index.js"
import { connectDB } from "./config/db.js"

const app = express()

connectDB()
app.use(express.json())
app.use(express.urlencoded({extended:true}))



app.use("/api/auth",authRoute)

export default app