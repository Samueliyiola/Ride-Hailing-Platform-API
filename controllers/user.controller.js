import User from "../models/associations.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {validateUser} from "../utils/validation.js";
import sendEmail from "../utils/email.js";
import VerificationCode from "../models/verificationCode.js";




exports.loginUser = async(req, res) =>{
    try {
        const {email, password} = req.body;
        // Confirm all fields are filled 
        if(!email || !password){
            return res.status(403).json({Message : "Please input all fields"});
        }
        // check if user exists
        const user = await User.findOne({where : {email}});
        // verify user
        if(!user){
            return res.status(404).json({Message : "User does not exist"});
        }
        const comparePassword = await bcrypt.compare(password, user.password);
        if(!comparePassword){
            return res.status(401).json({Message : "Invalid username or password!"});
        }
        const accessToken = jwt.sign({id: user.id, email : user.email, role : user.role}, process.env.JWT_SECRET);
        return res.status(200).json({Message : `Welcome ${user.firstName}, Login successful`, accessToken});
    } catch (error) {
        console.log(error);
        return res.status(500).json({Message : "An error has occured!"})
        
    }
} 



exports.getAllUsers = async (req, res) =>{
    try{
        const Users = await User.findAll();
        res.status(200).json({Message : "Users retrieved successfully!", Users});
    }
    catch(error){
        res.status(500).json({Message : "Server Error"});
    }
}



exports.registerUser = async(req, res) =>{
   try{
        // Accept input from the user
        const {firstName, lastName, dateOfBirth, gender, email, password, phone, address} = req.body;
        // Validate user inputs
        const newUser = {firstName, lastName, dateOfBirth, gender, email, password, phone, address};
        const {error, value} = await validateUser.validateAsync(req.body);
        if(error){
            return res.status(400).json({Message : "Please input all fields correctly!"});
        }
        // Check if user already exists
        const existingUser = await User.findOne({where : {email}});
        if(existingUser){
            console.log(existingUser);
            return res.status(403).json("User already exists!");
        }
        // hash the password
        const newPassword = await  bcrypt.hash(password, 10);
        // Generate the OTP and the deadline.
        const otp = Math.ceil(100000 + Math.random() * 900000).toString();
        const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
        // Store the OTP and deadline
        await VerificationCode.create({email, code: otp, expiresAt});
        // Send otp to email
        const message = `Your otp is ${otp}`;
        await sendEmail({email, subject : "Verify your email", message});
        return res.status(200).json({Message : "OTP Sent Successfully"});
   }
   catch(error){
        console.log(error);
        return res.status(500).json({Message : "An error has occured!"})
   }
    
}
