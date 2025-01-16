import User from "../models/associations.js";

const getAllUsers = async (req, res) =>{
    try{
        const Users = await User.findAll();
        res.status(200).json({Message : "Users retrieved successfully!", Users});
    }
    catch(error){
        res.status(500).json({Message : "Server Error"});
    }
}

export default getAllUsers; 