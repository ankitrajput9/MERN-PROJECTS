import { productModel } from "../models/product.model.js"
import { userModel } from "../models/user.model.js"
import { IKsend } from "../services/storage.service.js"

export const createController = async (req, res) => {

    try {

       
        if(!req.files){
            return res.status(400).json({
                message:"Images are require"    
            })
        }

        let { productName, description, amount ,currency  } = req.body
        if (!productName || !description || !amount) {
            return res.status(400).json({
                message: "All fields require"
            })
        }
// yaha pr imagekit se jo function send kiya hai usse se image buffer or image ka original name nikalna hai map use karke
         
const imageArr = await Promise.all(req.files.map(async(elem)=> await IKsend(elem.buffer,elem.originalname)) )  

        let newProduct = await productModel.create({
            productName,
            description,
            price: {
                amount,
                currency
            },
            images:imageArr.map((elem)=> elem.url),
            user_id:req.user._id
            
        })

        await userModel.findByIdAndUpdate(req.user._id, {
            $push: { products: newProduct._id }
        },
            { new: true }
        )

        return res.status(201).json({
            success: true,
            message: "product created",
            newProduct
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error
        })
    }

}

export const getallProductController = async (req, res) => {

    try {

        let allproducts = await productModel.find()

        return res.status(201).json({
            success: true,
            message: "all products fetched",
            product: allproducts
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error
        })
    }

}

export const getsingleProductController = async (req, res) => {

    try {

        let productId = req.params.productId

        if (!productId) {
            return res.status(404).json({
                message: "product id not found"
            })
        }

        let product = await productModel.findById(productId)
        if (!product) {
            return res.status(404).json({
                message: "product not found"
            })
        }
        return res.status(200).json({
            success: true,
            message: "product fetched",
            product
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error
        })
    }

}

export const updateProductController = async (req, res) => {

    try {

        let productId = req.params.productId

        if (!productId) {
            return res.status(404).json({
                message: "product id not found"
            })
        }

        let { productName, description, amount, currency } = req.body

        if (!productName || !description || !amount) {
            return res.status(400).json({
                message: "All fields require"
            })
        }

        let updatedProduct = await productModel.findByIdAndUpdate(
            productId,
            {
                productName,
                description,
                price: {
                    amount,
                    currency
                },
            
            },
            {
                new: true,
                runValidators: true
            })

        return res.status(200).json({
            success: true,
            message: "product updated",
            updatedProduct
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error
        })
    }

}

export const updatesingleProductController = async (req, res) => {

    try {

        let productId = req.params.productId

        if (!productId) {
            return res.status(404).json({
                message: "product id not found"
            })
        }

        let update = req.body
        if (!update) {
            return res.status(400).json({
                message: "value require"
            })
        }

        let updateUserProduct = await productModel.findByIdAndUpdate(productId, {
            $set: update
        },
            { new: true, runValidators: true })

        return res.status(200).json({
            success: true,
            message: "product value updated ",
            product: updateUserProduct
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error
        })
    }

}

export const deleteProductController = async (req, res) => {
    try {
        let productId = req.params.productId

    if (!productId) {
        return res.status(404).json({
            message: "product id not found"
        })
    }

    let delUser = await productModel.findByIdAndDelete(productId)

    let user = await userModel.findById(req.user._id)

    const updateUserProduct = user.products.filter((elem) => {
        elem !== delUser._id
    })
    user.products = updateUserProduct
    await user.save()

    return res.status(200).json({
        success: true,
        message: "product deleted"
    })



    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error
        })
    }

}