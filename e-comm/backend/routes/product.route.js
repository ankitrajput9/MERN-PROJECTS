import express from "express";
import {
  createController,
  deleteProductController,
  getallProductController,
  getsingleProductController,
  updateProductController,
  updatesingleProductController,
} from "../controllers/product.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { upload } from "../config/multer.js";

const router = express.Router();

router.post("/create",authMiddleware,upload.array('images',5),createController);
router.get("/", getallProductController);
router.get("/:productId", getsingleProductController);
router.put("/update/:productId",authMiddleware, updateProductController);
router.patch("/update-single/:productId",authMiddleware, updatesingleProductController);
router.delete("/delete/:productId",authMiddleware, deleteProductController);

export default router;
