import { ConnectToDB } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer";
ConnectToDB()

export async function POST(req: NextRequest) {
try {
    const reqBody = await req.json()
    const {newPassword,newPassword2,Id} = reqBody
    console.log(reqBody)
    const salt = await bcryptjs.genSalt(10)
        const newHashedPass = await bcryptjs.hash(newPassword,salt)
    const FindUser = await User.findByIdAndUpdate(Id,{
        password:newHashedPass
    })
    return NextResponse.json({
        message:"Password Changed Successfully",
        NewPassword:newHashedPass
    })
        // // create new user
        // const newUser = new User({
        //     username,
        //     email,
        //     password:hashedPassword,
        // })
    // await User.findByIdAndUpdate(userID,
    //     {
    //         forgotPasswordToken:hashedToken,
    //         forgotPasswordTokenExpiry:Date.now()+3600000
    //       })
    //     }
    // return NextResponse.json(reqBody)
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