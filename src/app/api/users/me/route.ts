import { getDatafromToken } from "@/helpers/getDatafromToken";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";
import { ConnectToDB } from "@/dbConfig/dbConfig";

ConnectToDB()
export async function GET(request:NextRequest){
    try {
        const userID = await getDatafromToken(request)
        const user = await User.findOne({_id:userID}).select("-password")
        return NextResponse.json(
                {
                    mesaaage:"User found",
                    data:user
                }
        )
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400})
    }
}