import getAllUsers from "../controllers/getAllUsers.js";
import registerUser from "../controllers/registerUser.js";
import verifyOtp from "../controllers/verify-otp.js";
import loginUser from "../controllers/loginUser.js";


import express from "express";
const router = express.Router();

router.get("/", getAllUsers);

router.post("/register", registerUser);

router.post("/verify-otp", verifyOtp);

router.post("/login", loginUser);

export default router;
