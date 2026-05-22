import express from 'express';
import { loginController, registerController } from '../../controllers/auth/index.js';

const route = express.Router()

route.post("/login",loginController)
route.post("/register",registerController)

export default route;