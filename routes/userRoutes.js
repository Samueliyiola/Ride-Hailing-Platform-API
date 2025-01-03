import getAllUsers from "../controllers/getAllUsers.js";
import registerUser from "../controllers/registerUser.js";
import verifyOtp from "../controllers/verify-otp.js"


import express from "express";
const router = express.Router();

router.get("/users", getAllUsers);

router.post("/register", registerUser);

router.post("/verify-otp", verifyOtp)


export default router;
