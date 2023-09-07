import nodemailer from "nodemailer"
import User from "@/models/userModel"
import bcryptjs, { decodeBase64 } from "bcryptjs"
export const sendEmail = async({email,emailType,userID}:any) =>{
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userID.toString(),10)
    if (emailType === "VERIFY"){
        await User.findOneAndUpdate(userID,
            {
              verifyToken:hashedToken,
                verifyTokenExpiry:Date.now()+3600000
            })
    } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userID,
            {
                forgotPasswordToken:hashedToken,
                forgotPasswordTokenExpiry:Date.now()+3600000
              })
            }
            const transport = nodemailer.createTransport({
              host: 'smtp.ethereal.email',
              port: 587,
              auth: {
                  user: process.env.NODEMAILER_USER,
                  pass: process.env.NODEMAILER_PASS
              }
          });
      const mailOptions = {
        from: "ahmedabdulrehman2005@gmail.com",
        to: email,
        subject: emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
        text: "Click on the link below to reset your password",
        html:`<p>Click <a href="${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "newpassword" }?token=${hashedToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"}
        or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/${emailType === "VERIFY" ? "verifyemail" : "newpassword" }?token=${hashedToken}
        </p>`
      }
      const mailResponse = await transport.sendMail(mailOptions)
      return {
        Token:hashedToken,
        TokenExpiry:Date.now()+3600000,
        Response:mailResponse,
        verifyLink:mailOptions
      }
} catch (error:any) {
    throw new Error(error.message);
  
}
}