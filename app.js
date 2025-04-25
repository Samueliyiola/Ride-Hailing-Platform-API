import dotenv from "dotenv";
dotenv.config();
import express from "express";
import sequelize from "./config/sequelize.js";
import {setCache, getCache} from "./utils/cache.js";
import bodyParser from "body-parser";
import morgan from "morgan";
const app = express();

// import Admin from "./models/admins.js";
import {User, Vehicle} from "./models/associations.js";
// import User from "./models/users.js";
import VerificationCode from "./models/verificationCode.js";
// import ride model from "./models/ride.js"
import Ride from "./models/ride.js";

// Import inbuilt middlewares to be used globally.
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.urlencoded({extended : true}));

// Import custom middlewares
import limiter from "./middlewares/rateLimiter.js";

// Import routes
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import driverRoutes from "./routes/driverRoutes.js";
import rideRoutes from "./routes/rideRoutes.js";	
import paymentRoutes from "./routes/paymentRoutes.js";

// Endpoints
app.use(limiter);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/driver", driverRoutes);
app.use("/api/v1/rides", rideRoutes);
app.use("/api/v1/payment", paymentRoutes);







export default app;
