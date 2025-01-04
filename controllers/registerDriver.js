import User from "../models/associations.js";
import Vehicle from "../models/asociations.js";
import {validateUser, validateVehicle} from "../utils/validation.js";
import bcrypt from "bcrypt";


const registerDriver = async(req, res) => {
    try{
        const {firstName, lastName, dateOfBirth, gender, email, password, phone, address, manufacturer, model, year, color, plateNumber} = req.body;
        // validate inputs
        const {error, value} = await validateUser.validateAsync(req.body);
        if(error){
            return res.status(400).json({Message : "Please input driver's details correctly!"});
        }
        const{error1, value1} = await validateVehicle.validateAsync(req.body);
        if(error1){
            return res.status(400).json({Message : "Please input vehicle's details correctly!"})
        }
        // check if driver already exists in the database
        const existingUser = await User.findOne({where : {email}});
        if(existingUser){
            return res.status(403).json({Message : "User already exists!"});
        }
        const hashedPassword = bcrypt.hash(password, 10);
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


export default registerDriver;