import User from "../Models/UserModel";
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();
export const UserVerification=(req,res)=>{
    const token=req.cookes.token;
    if(!token){
        return res.json({status:false});
    }
    jwt.verify(token,process.env.TOKEN_KEY,async(err,data)=>{
        if(err){
          return   res.json({status:false})
        }else{
            const user=User.findById(data.id);
            if(user){
                return res.json({status:true,user:user.username});
            }else{
                return res.json({status:false});
            }
        }
    })
}