import express from "express"
import { getUserController, updateUserController, updateUserValueController } from "../controllers/user.controller.js"

const router = express.Router()

router.get("/:userId",getUserController)
router.put("/update/:userId",updateUserController)
router.patch("/update-single/:userId",updateUserValueController)

export default router ;