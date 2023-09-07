"use client"
import React from "react"
import { useEffect } from "react"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
import { useState } from "react"
import useSWR from "swr"
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const notify = () => toast.warn('Please Enter A Valid Email Address', {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: false,
    pauseOnHover: true,
    draggable: false,
    progress: "",
    theme: "light",
    })
    const router = useRouter();
    const [user, setUser] = React.useState({
        email:"",
        password:"",
        username:"",
    })
    const [buttonDisabled,setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const onSignUp = async () => {
      try {
        setLoading(true)
        const response = await axios.post('/api/users/signup', user)
        console.log("Signup Success",response)
        router.push("/login")
      } 
      catch (error:any) {
        console.log("error caused", error.response.data);
        toast.error(error.message)
      }
      finally{
        setLoading(false)
      }
    }
    // effect for submitting form using enter key
    useEffect(() => {
      const handleKeyPress = (event:KeyboardEvent) => {
        if (event.key === "Enter") { // Check if the pressed key is Enter (keycode 13)
        const mybutton = document.getElementById('clickbutton') as HTMLButtonElement
      mybutton.click() // Trigger the button click
      }
    };
    
    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [])
  const handleClick = () => {
    onSignUp()
  };
    useEffect(()=>{
      if (user.email.length > 0 && user.username.length > 0 && user.password.length > 0){
        setButtonDisabled(true)
      } else {
        setButtonDisabled(false)
      }
    },[user])
  return (
    <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl">{loading ? "Processing" : "Signup"}</h1>
            <label className="text-xl my-5" htmlFor="username">username</label>
            <input id="username" type="text" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" value={user.username} onChange={(e)=>setUser({...user,username:e.target.value})}
            placeholder="username"/>
            <label className="text-xl my-5" htmlFor="email">email</label>
            <input id="email" type = "text" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"  value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}
            placeholder="email"/>
            <label className="text-xl my-5" htmlFor="password">password</label>
            <div className="password-container">
            <input id="password" type={showPassword ? 'text' : 'password'} className="text-size p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}
            placeholder="password"/>
            <button onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
      </button>
            </div>
            <button id="clickbutton" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" onClick={user.email !== "" || user.email.includes("@") === true ? handleClick : notify}>{buttonDisabled ? "signup" : "no signup"}</button>
            <button className="rounded-lg py-3 px-6 text-white bg-black" onClick={()=>router.push("/login")}>Visit Login Page</button>
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
}

 