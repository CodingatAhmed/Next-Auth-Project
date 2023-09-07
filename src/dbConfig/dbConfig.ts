import mongoose from "mongoose";
export async function ConnectToDB() {
    try {
        mongoose.connect(process.env.MONGODB_URL!)
        const connection = mongoose.connection
        connection.on("connected",()=>{
            console.log("mongodb connected successfully")
        })
        connection.on("error occured",(error)=>{
            console.log("mongodb failed to connect ",error)
            process.exit()
        })
    } catch (error) {
        console.log("error occured: ",error)
    }
}