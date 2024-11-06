import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import AuthRoute from './Routes/AuthRoute'
dotenv.config();

const PORT=4000;
const app =express();


app.use(cors({
    origin:['http://localhost:4000'],
    methods:['GET','PUT','DELETE','PUT'],
    credentials:true,
}))
app.use(express.json());
app.use('/',AuthRoute);
app.listen(PORT,()=>{
    console.log(`server running on port ${PORT}`)
})
