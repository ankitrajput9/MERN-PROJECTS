import bcrypt from "bcrypt"
import { userModel } from "../models/user.model.js"

export const getUserController = async (req, res) => {
    try {
        const {userId} = req.params

        if (!userId) {
            return res.status(404).json({
                message: "User id not found"
            })
        }

        const user = await userModel.findById(userId)
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "user fetched successfully",
            user
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error
        })
    }


}

export const updateUserController = async (req, res) => {
    try {
        const userId = req.params.userId

        if (!userId) {
            return res.status(404).json({
                message: "User id not found"
            })
        }

        let { user, email, mobile, password } = req.body
        if (!user || !email || !mobile || !password) {
            return res.status(400).json({
                message: "All fields required"
            })
        }

        const hashpass = await bcrypt.hash(password, 10)

        const updateduser = await userModel.findByIdAndUpdate(userId, {
            user,
            email,
            mobile,
            password: hashpass
        },
            { new: true, runValidators: true })

        return res.status(200).json({
            success: true,
            message: "user update successfully",
            user: updateduser
        })


    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error
        })
    }


}

export const updateUserValueController = async (req, res) => {
    try {
        // geting user id from URL 

        const{ userId }= req.params

        if (!userId) {
            return res.status(404).json({
                message: "User id not found"
            })
        }

        const update = req.body
        if (!update) {
            return res.status(400).json({
                message: "Atleast one field required"
            })
        }

        // for hash password when user want to change there password 

        if (update.password) {
            const hashpass = await bcrypt.hash(update.password, 10)
            update.password = hashpass
        }

        //   update single value from user model

        const updatedValue = await userModel.findByIdAndUpdate(userId, {
            $set: update
        },
            { new: true, runValidators: true }).select("-password")


        return res.status(200).json({
            success: true,
            message: "user Value updated successfully",
            user: updatedValue
        })

        

    } catch (error) {
        console.log("error in single value update in user ",error)
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error
        })
    }


}