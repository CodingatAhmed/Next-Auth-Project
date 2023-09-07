"use client"
import {useState} from "react"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {toast} from "react-hot-toast"
export default function Profile(){
    const router = useRouter();
    const [data,setData] = useState("nothing");
    const onLogout = async () =>{
        try {
            await axios.get("/api/users/logout")
            toast.success("logout successfully")
            router.push("/login")
        } catch (error:any) {
            console.log("error occured",error.response.message);
        }
    }
    const getUserDetails = async () => {
        try {
            const response = await axios.get("/api/users/me")
            console.log(response.data)
            setData(response.data.data._id)
        } catch (error:any) {
            console.log("error occured",error.message);
        }
    } 
    return(
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl">Profile Page</h1>
        <p>Your Profile</p>
        <hr/>
        <h2 className="p-1 bg-green-500 rounded">{data === 'nothing' ? "Nothing" : <Link href={`/profile/${data}`}>{data}
            </Link>}</h2>
        <button className="bg-blue-500 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={onLogout}>Logout</button>
        <button className="bg-green-500 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" onClick={getUserDetails}>Get User Details</button>
    </div>
    )
}