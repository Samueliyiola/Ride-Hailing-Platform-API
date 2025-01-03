import VerificationCode from "../models/VerificationCode.js";
import User from "../models/users.js";
import bcrypt from "bcrypt";


const verifyOtp = async(req, res) =>{
   try {
        // accept the otp from the user
        const {firstName, lastName, dateOfBirth, gender, email, password, phone, address, otp} = req.body; 
        // check the database for the code.
        const code = await VerificationCode.findOne({where : {email, code : otp, expiresAt: { [Op.gt]: new Date()}}});
        // confirm the validity of the otp
        if(!code){
            return res.status(400).json({Message : "Invalid or expired OTP"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create a new user
        await User.create({firstName, lastName, dateOfBirth, gender, email, password : hashedPassword, phone, address});
        // delete the verification code from the database
        await VerificationCode.destroy({where : {email, code : otp, expiresAt: { [Op.gt]: new Date()}}});
        return res.status(201).json({Message : "User registered successfully!"});
        
   } catch (error) {
        console.log(error.detals[0].message);
        return res.status(500).json({Message : "An error has occured"});
   }

};

export default verifyOtp;