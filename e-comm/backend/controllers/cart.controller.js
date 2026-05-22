import { cartModel } from "../models/cart.model.js"
import { userModel } from "../models/user.model.js"

export const addtoCartController = async (req, res) => {

    try {

        let { productId, userId } = req.params

        if (!productId || !userId) {
            return res.status(400).json({
                message: "id required"
            })
        }

        let user = await userModel.findById(userId)

        const cart_id = user.cart
        const cartData = await cartModel.findById(cart_id)
        const exist = cartData.items.find((elem) => elem.product_id?.toString() === productId)

        // const exist = cart_id.items.find((elem)=> elem.id === productId)
        if (exist) {
            return res.status(400).json({
                message: "product already exist"
            })
        }
        const cart = await cartModel.findByIdAndUpdate(
            cart_id,
            {
                $push: {
                    items: {
                        product_id: productId,
                        quantity: 1
                    }
                }
            }, { new: true }
        )

        return res.status(200).json({
            success: true,
            message: "protudt add to cart ",
            cart
        })

    } catch (error) {
        console.log("error in add to cart controller ", error)
        return res.status(500).json({
            message: "internal server eroor",
            error
        })
    }
}

export const getCartController = async (req, res) => {
    try {
        const { cartId } = req.params

        if (!cartId) {
            return res.status(404).json({
                message: "cart id not found"
            })
        }

        const cart = await cartModel.find()

        return res.status(301).json({
            success: true,
            message: "welcome to cart",
            items: cart
        })

    } catch (error) {
        console.log("error in get cart controller ", error)
        return res.status(500).json({
            message: "internal server eroor",
            error
        })
    }
}

export const incrementInCartController = async (req,res) => {
    try {

        let { cartId, productId } = req.params

        if (!cartId || !productId) {
            return res.status(404).json({
                message: "id not found"
            })
        }

        const cart = await cartModel.findById(cartId)
        let cartItem = cart.items.find((elem) => elem.product_id.toString() === productId )
        cartItem.quantity += 1
        await cart.save()

        return res.status(200).json({
            message: "Product quantity increased",
            success: true,
            cart,
        });


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message:"internal server error",
            error
        })
    }
}

export const decrementInCartController = async (req,res) => {
    try {

        let { cartId, productId } = req.params

        if (!cartId || !productId) {
            return res.status(404).json({
                message: "id not found"
            })
        }

        const cart = await cartModel.findById(cartId)

        let cartItem = cart.items.find((elem) => elem.product_id?.toString() === productId )
        console.log("check carttems",cartItem)
        if (cartItem) {
            if (cartItem.quantity === 0) {
                return res.status(400).json({
                    message: "quantity is 0"
                })
            }
            cartItem.quantity -= 1
        }
        await cart.save()

        return res.status(200).json({
            message: "Product quantity decreased",
            success: true,
            cart,
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
        })
    }
}

export const deleteProductfromCartController = async (req,res) => {
    try {

        let { cartId, productId } = req.params

        if (!cartId || !productId) {
            return res.status(404).json({
                message: "id not found"
            })
        }
        const cart = await cartModel.findById(cartId)
   
        let updatedCart = cart.items.filter((elem) =>  elem.product_id.toString() !== productId )
        console.log("updated carttttttttttttttttttttttttt",updatedCart)
        cart.items = updatedCart
        await cart.save()

        return res.status(200).json({
            message: "Product deleted from cart",
            success: true,
            cart,
        });


    } catch (error) {
        return res.status(500).json({
            success: false,
        })
    }
}