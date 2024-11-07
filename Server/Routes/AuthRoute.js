import {SignUp,Login} from '../Controllers/AuthController.js'
import { UserVerification } from '../Middlwares/AuthMiddleware.js';
import express from 'express'
export const router=express.Router();
router.post("/signup",SignUp);
router.post("/login",Login);
router.post('/',UserVerification);

