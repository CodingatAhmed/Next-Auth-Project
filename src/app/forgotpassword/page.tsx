"use client"
import Link from "next/link"
import useSWR from "swr"
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
export default function ForgotPassword(){
    const notify = () => toast.warn('Please enter a valid Email Address', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: "",
        theme: "light",
        });
    const router = useRouter()
    function waitFor(timeInMillis: number): Promise<void> {
        return new Promise((resolve) => {
          setTimeout(resolve, timeInMillis);
        });
      }
      const [Email, setEmail] = React.useState({
          email:""
        })
        const [Done, setDone] = useState(false)
        const forgotPassword = async () => {
            try {
                if (Email.email !== ""){
                    const response = await axios.post("api/users/forgotpassword",Email)
                    console.log("verified user successfully",response)
                    setDone(true)
                }
            } catch (error:any) {
                
                console.log("error occured",error.response)
            } 
        }
    const { data, error, isLoading } = useSWR("api/users/forgotpassword", forgotPassword)  
    if (isLoading) return <div className="flex flex-col items-center justify-center min-h-screen py-2">Loading...</div>;
     return (
        Done ? (
            <div className="flex flex-col items-center justify-center min-h-screen py-2">
                    <h1 className="font-light text-2xl">Check Your Email & Verify yourself from there</h1>
            </div>
        ) : (
             <div className="flex flex-col items-center justify-center min-h-screen py-2">
                <h1 className="font-bold text-2xl">Forgot Your Password?Enter Your Email</h1>
                <input id="email" type = "email" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"  value={Email.email} onChange={(e)=>setEmail({...Email,email:e.target.value})}
            placeholder="email"/>
            <button className="rounded-lg py-3 px-6 text-white bg-black" onClick={Email.email !== "" || Email.email.includes("@") === true ? forgotPassword : notify}>Click here</button>
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
            </div>
        )
    )
}
