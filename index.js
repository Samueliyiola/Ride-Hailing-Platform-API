import dotenv from "dotenv";
dotenv.config();
import express from "express";
import sequelize from "./config/sequelize.js";
import bodyParser from "body-parser";
const app = express();

import Admin from "./models/admins.js";
import {Driver, Vehicle} from "./models/associations.js";
import User from "./models/users.js";
import VerificationCode from "./models/VerificationCode.js"

// Importing inbuilt middlewares
app.use(express.json());
app.use(bodyParser.json());
// Import custom middlewares
import userRoutes from "./routes/userRoutes.js";

// Endpoints
app.use("/api", userRoutes);











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