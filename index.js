import dotenv from "dotenv";
dotenv.config();
import express from "express";
import sequelize from "./config/sequelize.js";
import bodyParser from "body-parser";
const app = express();

// import Admin from "./models/admins.js";
import {User, Vehicle} from "./models/associations.js";
// import User from "./models/users.js";
import VerificationCode from "./models/verificationCode.js"

// Importing inbuilt middlewares to be used globally.
app.use(express.json());
app.use(bodyParser.json());
// Import custom middlewares
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";

// Endpoints
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/driver", driverRoutes);











const PORT = process.env.PORT || 3000;


app.listen(PORT, async () =>{
    try{
        // Sync database
        await sequelize.sync();
        console.log(`The server is running on port:${PORT}`);	
    }
    catch(error){
        console.log(error);
    }
})