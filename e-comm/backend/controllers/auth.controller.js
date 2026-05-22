import { userModel } from "../models/user.model.js";
import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";
import { cartModel } from "../models/cart.model.js";

export const registerController = async (req, res) => {
  try {
    let { user, password, email, mobile } = req.body;
    if (!user || !email || !password || !mobile) {
      return res.status(400).json({
        message: "All fields require",
      });
    }

    const existeduser = await userModel.findOne({ email })

    if (existeduser) {
      return res.status(400).json({
        message: "user already exist"
      })
    }

    const hashpassword = await bcrypt.hash(password, 10);

    const newUser = await userModel.create({
      user,
      password: hashpassword,
      email,
      mobile,
    });
    console.log(newUser);

    if (!newUser) {
      return res.status(400).json({
        success: false,
        message: "something went wrong ",
      });
    }

    const userCart = await cartModel.create({
      user_id: newUser._id
    })

    
    // newuser mai cart save kiyaa 
    newUser.cart = userCart._id
    await newUser.save()

    const token = jwt.sign({ id: newUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token);

    return res.status(201).json({
      success: true,
      message: "user register",
      user: newUser,
    });


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "All field required",
      });
    }

    const existeduser = await userModel.findOne({ email });
    if (!existeduser) {
      return res.status(404).json({
        message: "user not found ",
      });
    }

    const checkpass = bcrypt.compare(password, existeduser.password);

    if (!checkpass) {
      return res.status(401).json({
        message: "invalid email or password",
      });
    }

    const token = jwt.sign({ id: existeduser._id }, process.env.SECRET_KEY, {
      expiresIn: "1h",
    });
    res.cookie("token", token);

    return res.status(200).json({
      success: true,
      message: "user logedin",
    });


  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error,
    });
  }
};

export const logoutController = async (req, res) => {
  try {

    const logout = res.clearCookie("token")

    return res.status(200).json({
      status: true,
      message: 'user logged out successfully'
    })

  } catch (error) {
    console.log("error in logout controller ", error)
    return res.status(500).json({
      status: false,
      message: 'internal server error',
      error
    })
  }
}


