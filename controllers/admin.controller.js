import User from "../models/associations.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import {validateUser} from "../utils/validation.js";


export const loginAdmin = async(req, res) =>{
    try {
        const {email, password} = req.body;
        // Confirm all fields are filled 
        if(!email || !password){
            return res.status(403).json({Message : "Please input all fields"});
        }
        // check if user exists
        const user = await User.findOne({where : {email}});
        // verify user
        if(!user || user.role !== "admin"){
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



export const registerAdmin = async(req, res) =>{
   try{
        // Accept input from the user
        const {firstName, lastName, dateOfBirth, gender, email, password, phone, address} = req.body;
        // Validate user inputs
        const {error, value} = validateUser.validate(req.body);
        if(error){
            return res.status(400).json({Message : "Please input all fields correctly!"});
        }
        // Check if user already exists
        const existingUser = await User.findOne({where : {email}});
        if(existingUser){
            return res.status(403).json("User already exists!");
        }
        // hash the password
        const newPassword = await bcrypt.hash(password, 10);
        await User.create({firstName, lastName, dateOfBirth, gender, email, password : newPassword, phone, address, role : "admin"});
        res.status(201).json({Message : "Admin created successfully!"});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({Message : "An error has occured!"})
    }
    
}


