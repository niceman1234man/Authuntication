import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import {router} from './Routes/AuthRoute.js'
import { connectDb } from './config/db.js';
dotenv.config();

const PORT=process.env.PORT ||4000;
const app =express();

connectDb();
app.use(cors({
    origin:['http://localhost:5173'],
    methods:['GET','PUT','DELETE','PUT'],
    credentials:true,
}))
app.use(express.json());
app.use('/',router);
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
