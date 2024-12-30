import dotenv from "dotenv";
dotenv.config();
import express from "express";
import {sequelize} from "./config/sequelize.js";
const app = express();





const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
    try{
        sequelize.authenticate();
        console.log("Connection has been established successfully.");	
    }
    catch(error){
        console.log(error);
    }
})