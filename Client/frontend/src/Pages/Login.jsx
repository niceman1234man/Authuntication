import React, { useState } from "react";
import {Link,useNavigate} from 'react-router-dom';
import axios from 'axios'
import {ToastContainer,toast} from 'react-toastify';

function Login() {
    const navigate=useNavigate();
  const [inputValue, setInputValue] = useState({
     email: "",
     password: "" });
     const {email,password}=inputValue;
     const onchangeHandle=(e)=>{
        const {name,value}=e.target;
        setInputValue({...inputValue,[name]:value});
     };
     const handleError=(err)=>{
        toast.error(err,
            {position:"bottom-left"});
     }
const handleSucess=(msg)=>{
    toast.success(msg,
        {
        position:"bottom-right"});
}
const submitHandle=async(e)=>{
    e.preventDefault();
    const data=await axios.post("http://localhost:4000/login",{...inputValue},{
        withCredentials:true,
    });
const {sucess,message}=data;
if(sucess){
    handleSucess(message);
    setTimeout(()=>{
        navigate('/');
    },1000);
}else{
    handleError(message);
}
setInputValue({...inputValue,email:"",password:""});
}
  return (
<div >
      <h2>Login Account</h2>
      <form onSubmit={submitHandle}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={onchangeHandle}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={onchangeHandle}
          />
        </div>
        <button type="submit">Submit</button>
        <span>
          Already have an account? <Link to={"/signup"}>Signup</Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
