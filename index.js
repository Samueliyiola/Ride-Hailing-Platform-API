const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const sequelize = require("./config/sequelize");
const app = express();





const PORT = process.env.PORT || 3000;

app.listen(PORT, async () =>{
    try{
        await sequelize.sync();
        console.log("Connection has been established successfully.");	
    }
    catch(error){
        console.log(error);
    }
})