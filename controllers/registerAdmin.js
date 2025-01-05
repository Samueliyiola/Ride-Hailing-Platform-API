import User from "../models/associations.js";
import {validateUser} from "../utils/validation.js";
import bcrypt from "bcrypt";


const registerAdmin = async(req, res) =>{
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

export default registerAdmin;