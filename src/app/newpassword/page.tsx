"use client";
import Link from "next/link";
import axios from "axios";
import useSWR from "swr"
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import { useEffect } from "react";
export default function NewPassword() {
  const [thrownError, setThrownError] = useState(false)
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
    const notify = () => toast.warn('Your Passwords Do Not Match', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: "",
    theme: "light",
    });
  function waitFor(timeInMillis: number): Promise<void> {
    return new Promise((resolve) => {
      setTimeout(resolve, timeInMillis);
    });
  }
  const [token, setToken] = useState("");
  const [Done, setDone] = useState(false);
  const TokenVerify = async () => {
      try {
          const response = await axios.post("api/users/passwordverification", {
        token,
      });
      console.log("verified user successfully", response);
      console.log("id is ", response.data.user._id);
      return response.data.user._id;
    } catch (error: any) {
        setThrownError(true)
        throw error
        
    }
};
const [newPass, setnewPass] = useState({
  newPassword: "",
  newPassword2: "",
  Id:""
});

  const SubmitNewPassword = async () => {
        // Perform password authentication logic here
        newPass.Id = await TokenVerify()
        try {
            if (newPass.newPassword === newPass.newPassword2 && newPass.newPassword !== ""){
                const response = await axios.post("api/users/newpassword", newPass);
                console.log("verified user successfully", response);
                setDone(true);
            }
          } catch (error: any) {
            throw error
            console.log("error occured", error.response);
          }
        }
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const urlToken = queryParams.get("token");
    setToken(urlToken || "");
  }, []);
  useEffect(() => {
    if (token.length > 0 && thrownError == false) {
      TokenVerify();
    }
  }, [token]);
  const { data, error, isLoading } = useSWR("api/users/passwordverification", TokenVerify)  
    if (isLoading) return <div className="flex flex-col items-center justify-center min-h-screen py-2">Loading...</div>;
        if (error){ 
        return <div className="flex flex-col items-center justify-center min-h-screen py-2">{`${error.response.data.error}, please enter a valid token` }</div>
        }
            return (
          Done ? (
            <div className="h-screen flex flex-col justify-center items-center">
                <p>Click <Link className="underline hover:underline hover:text-blue-600" href = "/login">here</Link> To Continue with Login Page</p>
            </div>
         ) :(
            <div className="h-screen flex flex-col justify-center items-center">
             <h1 className="font-bold text-3xl pb-10">User Verified Successfully!</h1>
             <label className="text-xl my-5" htmlFor="username">
               Confirm New Password
             </label>
             <div className="password-container">
             <input
               id="password"
               type={showPassword ? 'text' : 'password'}
               className="text-size p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
               value={newPass.newPassword}
               onChange={(e) =>
                 setnewPass({ ...newPass, newPassword: e.target.value })
               }
               placeholder="Enter Your New Password"
             />
             <button onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
          </button>
             </div>
             <label className="text-xl my-5" htmlFor="username">
               New Password
             </label>
             <div className="password-container">
             <input
               id="confirmpassword"
               type={showPassword2 ? 'text' : 'password'}
               className="text-size p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
               value={newPass.newPassword2}
               onChange={(e) =>
                 setnewPass({...newPass, newPassword2: e.target.value })
               }
               placeholder="Enter Your New Password"
             />
             <button onClick={() => setShowPassword2(!showPassword2)}>
            {showPassword2 ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
          </button>
             </div>
             <button
               className="rounded-lg py-3 px-6 text-white bg-black"
               onClick={newPass.newPassword === newPass.newPassword2 && newPass.newPassword !== "" ? SubmitNewPassword: notify}
             >
               Submit Your New Password
             </button>
             <ToastContainer
               position="top-center"
               autoClose={2000}
               hideProgressBar
               newestOnTop={false}
               closeOnClick={false}
               rtl={false}
               pauseOnFocusLoss
               draggable={false}
               pauseOnHover
               theme="light"
             />
             <h1>
             </h1>
           </div>
    
             )
    
         )
}
