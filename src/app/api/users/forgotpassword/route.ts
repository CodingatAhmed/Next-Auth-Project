import { ConnectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server";
import { sendEmail } from "@/helpers/mailer";
ConnectToDB()

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const {email} = reqBody
        const findUser = await User.findOne({email})
            if (!findUser){
                return NextResponse.json({error:"User does not exist"},{status:400})
            }
            await sendEmail({email, emailType: "RESET", userID:findUser._id})
            findUser.password = ""
            findUser.save()
            // create token data
            // // create token
            return NextResponse.json({
                message:"user verified successfully",
                findUser
            })
            // const newUser = new User({
    //     username,
    //     email,
    //     password:hashedPassword,
    // })
    // const savedUser = await newUser.save()
    // await User.findByIdAndUpdate(userID,
    //     {
    //         forgotPasswordToken:hashedToken,
    //         forgotPasswordTokenExpiry:Date.now()+3600000
    //       })
    //     }
            //await sendEmail({email, emailType: "RESET", userID:findUser._id})
            // check if user already exists
        // const user = await User.findOne({email})
        // if(!user){
        //     return NextResponse.json({error:"User does not exist"},{status:400})
        // }
        // console.log("user exists");
        
        // check if password is correct 
        // const validPassword = await bcryptjs.compare(password,user.password)
        // if(!validPassword){
        //     return NextResponse.json({error:"Invalid password"},{status:400})
        // }
        // response.cookies.set("token",token,{
        //     httpOnly:true,
        //     sameSite:"strict",
        //     secure:true
        // })
        // return token
        // return response
    } catch (error:any) { 
        return NextResponse.json({error:error.message},{status:500})
    }
}