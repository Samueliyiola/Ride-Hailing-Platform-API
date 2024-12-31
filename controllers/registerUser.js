import User from "../models/users.js";

export const registerUser = async(req, res) =>{
    const {firstName, lastName, dateOfBirth, gender, email, password, phone, address} = req.body;

}