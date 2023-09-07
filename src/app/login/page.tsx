"use client"
import { useState } from "react"
import useSWR from "swr"
import { faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, {useEffect} from "react"
import { useRouter } from 'next/navigation'
import axios from 'axios'
import Link from 'next/link'
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const notify = () => toast.warn('Your Passwords Do Not Match', {
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
    })
    
    const [buttonDisabled,setButtonDisabled] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const onLogin = async () => {
      try {
        setLoading(true)
        const response = await axios.post('/api/users/login', user)
        console.log("Login Success",response)
        toast.success("Login Success")
        router.push("/profile")
      } 
      catch (error:any) {
        console.log("error caused", error.response.data);
        toast.error("error occured")
      } finally {
        setLoading(false)
      }
    }
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
    onLogin()
  };
    useEffect(()=>{
      if (user.email.length > 0 && user.password.length > 0){
        setButtonDisabled(true)
      } else {
        setButtonDisabled(false)
      }
    },[user])
  return (
    <div className="h-screen flex flex-col justify-center items-center">
        <h1 className="text-4xl">{loading ? "Processing" : "Login"}</h1>
            <label className="text-xl my-5" htmlFor="email">email</label>
            <input id="email" type="email" className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" value={user.email} onChange={(e)=>setUser({...user,email:e.target.value})}
            placeholder="email"/>
            <label className="text-xl my-5" htmlFor="password">password</label>
            <div className="password-container">
            <input id="password" type={showPassword ? 'text' : 'password'} className="text-size p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600" value={user.password} onChange={(e)=>setUser({...user,password:e.target.value})}
            placeholder="password"/>
            <button onClick={() => setShowPassword(!showPassword)}>
        {showPassword ? <FontAwesomeIcon icon={faEye} /> : <FontAwesomeIcon icon={faEyeSlash} />}
      </button>
            </div>
            <button id="clickbutton" onClick={user.email !== "" || user.email.includes("@") === true ? handleClick : notify} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisabled ? "Login" : "no Login"}</button>
            <button onClick={()=>router.push("/forgotpassword")} className="hover:underline">Forgot Your Password?</button>
            <Link className="hover:underline" href="/signup">Visit SignUp Page</Link>
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
  