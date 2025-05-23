// import getAllUsers from "../controllers/getAllUsers.js";
// import registerUser from "../controllers/registerUser.js";
// import loginUser from "../controllers/loginUser.js";

import verifyOtp from "../services/verify-otp.js";
import {getAllUsers, registerUser, loginUser} from "../controllers/user.controller.js";
import express from "express";

const router = express.Router();

router.get("/", getAllUsers);

router.post("/register", registerUser);

router.post("/verify-otp", verifyOtp);

router.post("/login", loginUser);

export default router;
