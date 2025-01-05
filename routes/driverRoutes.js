import loginDriver from "../controllers/loginAdmin.js";

import express from "express";
const router = express.Router();


router.post("/login", loginDriver);




export default router;