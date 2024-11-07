import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function SignUp() {
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    email: "",
    password: "",
    username: "",
  });
  const {email,password,username}=inputValue;
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
  };
  const onErrorHandle = (err) => {
    toast.error(err, { position:"top-right" });
  };
  const onHandleSuccess = (msg) => {
    toast.success(msg, { position: "bottom-right" });
  };
  const onSubmithandle = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/signup",
        { ...inputValue },
        { withCredentials: true }
      );
      const { success, message } = data;
      if (success) {
        onHandleSuccess(message);
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        onErrorHandle(message);
      }
    } catch (error) {
      console.log(error);
    }
    setInputValue({ ...inputValue,
         email: "", 
         password: "", 
         username: "" });
  };

  return(
    <div className="w-[50%] mx-auto flex flex-col items-center justify-center bg-cyan-700 p-4 my-4">
      <h2 className="p-2">Signup Account</h2>
      <form onSubmit={onSubmithandle}>
        <div className="p-2">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="Enter your email"
            onChange={handleOnchange}
            className="ml-4 p-2"
          />
        </div>
        <div className="p-2">
          <label htmlFor="email">Username</label>
          <input
            type="text"
            name="username"
            value={username}
            placeholder="Enter your username"
            onChange={handleOnchange}
            className="ml-4 p-2"
          />
        </div>
        <div className="p-2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="Enter your password"
            onChange={handleOnchange}
            className="ml-4 p-2"
          />
        </div>
        <button type="submit" className="p-2 bg-slate-500">Submit</button>
        <p className="p-2">
          Already have an account? <Link to={"/login"} className="bg-emerald-400 p-2">Login</Link>
        </p>
      </form>
      <ToastContainer />
    </div>
  );
}

export default SignUp;
