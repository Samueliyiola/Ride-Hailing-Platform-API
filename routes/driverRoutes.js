// import {loginDriver} from "../controllers/loginDriver.js";
import { loginDriver, availabilityDriver, updateDriverLocation} from "../controllers/driver.controller.js";
import verifyDriver from "../middlewares/verifyDriver.js";

import express from "express";
const router = express.Router();


router.post("/login", loginDriver);

router.patch("/availability", verifyDriver, availabilityDriver);

router.post("/update-location", verifyDriver, updateDriverLocation);


export default router;