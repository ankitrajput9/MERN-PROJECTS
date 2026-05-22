import express from "express"
import authRoute from "./routes/auth/index.js"
import { connectDB } from "./config/db.js"

const app = express()

connectDB()

app.get("/api/auth",authRoute)

export default app