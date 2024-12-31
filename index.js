import dotenv from "dotenv";
dotenv.config();
import express from "express";
import sequelize from "./config/sequelize.js";
const app = express();

import admin from "./models/admin.js";
import vehicle from "./models/vehicles.js";
import Driver from "./models/drivers.js";


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