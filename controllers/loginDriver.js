import User from "../models/associations.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const loginDriver = async(req, res) =>{
    try {
        const {email, password} = req.body;
        // Confirm all fields are filled 
        if(!email || !password){
            return res.status(403).json({Message : "Please input all fields"});
        }
        // check if user exists
        const user = await User.findOne({where : {email}});
        // verify user is a driver
        if(!user || user.role !== "driver"){
            console.log(user);
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

export default loginDriver;