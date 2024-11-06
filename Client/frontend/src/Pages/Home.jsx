import React,{useEffect,useState}from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {ToastContainer,toast} from 'react-toastify'
import {useCookies} from 'react-cookie'
const navigate =useNavigate();
const [cookies,removeCookie]=useCookies([]);
const [username,setUsername]=useState("");
useEffect(()=>{
    const verifyCookie=async()=>{
        if(!cookies.token){
            navigate('/login');
        }
        const data=await axios.post("http://localhost:4000",{},{
            withCredentials:true,
        });
     const {status,user}=data;
     setUsername(user);
     return status ? toast(`Hello ${user}`,{position:"top-right"}) :
     removeCookie("token",navigate('/login'));
    }
    verifyCookie();

},[cookies,navigate,removeCookies]);
const logout=()=>{
    removeCookie("token");
    navigate('/signup');
}
function Home() {
  return (
    <>
      <div >
        <h4>
          {" "}
          Welcome <span>{username}</span>
        </h4>
        <button onClick={logout}>LOGOUT</button>
      </div>
      <ToastContainer />
    </>
  );
}

export default Home