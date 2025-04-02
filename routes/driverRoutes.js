// import {loginDriver} from "../controllers/loginDriver.js";
import { loginDriver } from "../controllers/driver.controller.js";

import express from "express";
const router = express.Router();


router.post("/login", loginDriver);




export default router;