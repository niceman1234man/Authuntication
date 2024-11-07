import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useCookies } from 'react-cookie';

function Home() {
    const navigate = useNavigate();
    const [cookies, removeCookie] = useCookies([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        const verifyCookie = async () => {
            if (!cookies.token) {
                navigate('/login');
                return; // Exit if there is no token
            }

            try {
                const { data } = await axios.post("http://localhost:4000", {}, {
                    withCredentials: true,
                });
                const { status, user } = data;

                setUsername(user);
                if (status) {
                    toast(`Hello ${user}`, { position: "top-right" });
                } else {
                    removeCookie("token");
                    navigate('/login');
                }
            } catch (error) {
                console.error("Error verifying cookie:", error);
                removeCookie("token");
                navigate('/login');
            }
        };

        verifyCookie();
    }, [cookies, navigate, removeCookie]);

    const logout = () => {
        removeCookie("token");
        navigate('/signup');
    };

    return (
        <>
            <div className="w-max[1240px]">
                <h4>
                    Welcome <span>{username}</span>
                </h4>
                <button onClick={logout}>LOGOUT</button>
            </div>
            <ToastContainer />
        </>
    );
}

export default Home;