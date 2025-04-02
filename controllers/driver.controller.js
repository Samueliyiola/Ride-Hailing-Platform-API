import {User, Vehicle} from "../models/associations.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// import User from "../models/associations.js";
import {User, Vehicle} from "../models/associations.js";
import {validateUser, validateVehicle} from "../utils/validation.js";
import sequelize from "../config/sequelize.js";


export const registerDriver = async(req, res) => {
    try{
        const {firstName, lastName, dateOfBirth, gender, email, password, phone, address, manufacturer, model, year, color, plateNumber} = req.body;
        // validate inputs
        const {error, value} = validateUser.validate({firstName, lastName, dateOfBirth, gender, email, password, phone, address});
        if(error){
            console.log(error);
            return res.status(400).json({Message : "Please input driver's details correctly!"});
        }
        const{error1, value1} = validateVehicle.validate({manufacturer, model, year, color, plateNumber});
        if(error1){
            return res.status(400).json({Message : "Please input vehicle's details correctly!"})
        }
        // check if driver already exists in the database
        const existingUser = await User.findOne({where : {email}});
        if(existingUser){
            return res.status(403).json({Message : "User already exists!"});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        // Use transactions to make sure the driver and vehicle are added together.
        const transaction = await sequelize.transaction();
        try{
            // create the driver
            const driver = await User.create({firstName, lastName, dateOfBirth, gender, email, password : hashedPassword, phone, address, role : "driver"}, {transaction});
            await Vehicle.create({manufacturer, model, year, color, plateNumber, UserId: driver.id}, {transaction});
            await transaction.commit();
            return res.status(201).json({Message : "Driver registered successfully"});
        }
        catch(error){
            await transaction.rollback();
            throw error;
        }
    }
    catch(error){
        console.log(error);
        return res.status(500).json({Message : "An error has occured!"});
    }
};



export const loginDriver = async(req, res) =>{
    try {
        const {email, password} = req.body;
        // Confirm all fields are filled 
        if(!email || !password){
            return res.status(403).json({Message : "Please input all fields"});
        }
        // check if user exists
        const user = await User.findOne({where : {email}});
        // verify user is a driver
        if(user.role == "driver"){
            const comparePassword = await bcrypt.compare(password, user.password);
            if(!comparePassword){
                return res.status(401).json({Message : "Invalid username or password!"});
            }
            const accessToken = jwt.sign({id: user.id, email : user.email, role : user.role}, process.env.JWT_SECRET);
            return res.status(200).json({Message : `Welcome ${user.firstName}, Login successful`, accessToken});
        }
        console.log(user);
        return res.status(404).json({Message : "User doesn't  exist"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({Message : "An error has occured!"})
        
    }
}

