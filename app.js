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

// Import inbuilt middlewares to be used globally.
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));

// Import custom middlewares
import limiter from "./middlewares/rateLimiter.js";

// Import routes
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";


// Endpoints
app.use(limiter);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/driver", driverRoutes);








export default app;
