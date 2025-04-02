import {loginDriver} from "../controllers/loginDriver.js";

import express from "express";
const router = express.Router();


router.post("/login", loginDriver);




export default router;