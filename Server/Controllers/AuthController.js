import User from "../Models/UserModel";
import { CreateSecreteToken } from "../Util/SecreteToken";
import bcrypt from 'bcrypt'

export const SignUp=(req,res,next)=>{
    const {email,username,password}=req.body;
    
    try {
        const existingUser=User.findOne({email});
    if(existingUser){
        res.json({message:"user already existed"})
    }
    password=bcrypt.hash(password,12);
    const user=User.create({email,password,username});
    const token=CreateSecreteToken(user._id);
    res.cookie("token",token,{
        withCredentials:true,
        httpOnly:false,

    });
    res.status(201).json({sucess:true,message:"user signup succesfully",user})
next();
    } catch (error) {
        console.log(error);
    }
}

export const Login=(req,res,next)=>{
    const {email,password}=req.body;
    password=bcrypt.hash(password,12);
    try {
        if(!email ||!password){
            res.json({message:"All fields required"})
        }
        const user=User.findOne({email});
        if(!user){
            res.json({message:"Incorrect email or password!"});
        }
        const auth=bcrypt.compare(password,user.password);
        if(!auth){
            res.json({message:"Incorrect email or password"});
        }
    const token=CreateSecreteToken(user._id);
    res.cookie("token",token,{
        withCredentials:true,
        httpOnly:false,
    });
    res.status(201).json({success:true,message:"user login successfully"})  
    } catch (error) {
        console.log(error)
    }
    
}