import express from "express"
import { homeController } from "../controllers/home.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = express.Router()

router.get('/',authMiddleware,homeController)
export default router ;