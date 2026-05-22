import express from "express"
import {
    addtoCartController,
    decrementInCartController, deleteProductfromCartController, getCartController, incrementInCartController
} from "../controllers/cart.controller.js"

const router = express.Router()

router.post("/add/:productId/:userId", addtoCartController)
router.get("/:cartId", getCartController)
router.post("/increment/:productId/:cartId", incrementInCartController)
router.post("/decrement/:productId/:cartId", decrementInCartController)
router.delete("/delete/:productId/:cartId", deleteProductfromCartController)

export default router;

