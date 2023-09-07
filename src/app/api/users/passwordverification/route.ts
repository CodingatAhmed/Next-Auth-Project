import { ConnectToDB } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";

ConnectToDB()

export async function POST(req: NextRequest) {
try {
    const reqBody = await req.json()
    const {token} = reqBody
    console.log("backend token", {token})
    const user = await User.findOne({forgotPasswordToken: token, forgotPasswordTokenExpiry: {$gt: Date.now()}})
    if (!user){
        return NextResponse.json({error:"Invalid Token"},{status:400})
    }
    return NextResponse.json({
        message:"Successfully Proceeding Request",
        success:true,
        user
    })
    // await User.findByIdAndUpdate(userID,
    //     {
    //         forgotPasswordToken:hashedToken,
    //         forgotPasswordTokenExpiry:Date.now()+3600000
    //       })
    //     }
} catch (error:any) {
    return NextResponse.json({error:error.message},{status:500})
}
}