import {SignUp,Login} from '../Controllers/AuthController'
import { UserVerification } from '../Middlwares/AuthMiddleware';
import express from 'express'
const router=express.Router();
router.post("/signup",SignUp);
router.post("/login",Login);
router.post('/',UserVerification);
export default router;
