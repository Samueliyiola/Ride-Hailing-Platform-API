import dotenv from "dotenv";
dotenv.config();
import express from "express";
import sequelize from "./config/sequelize.js";
const app = express();

import Admin from "./models/admins.js";
import {Driver, Vehicle} from "./models/associations.js";
import User from "./models/users.js";

// Importing inbuilt middlewares
app.use(express.json());




const PORT = process.env.PORT || 3000;


app.listen(PORT, async () =>{
    try{
        await sequelize.sync();
        console.log(`The server is running on port:${PORT}`);	
    }
    catch(error){
        console.log(error);
    }
})