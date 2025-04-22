import express from "express";
import {requestRide, getRideDetails, respondToRide, driverArrives} from "../controllers/ride.controller.js";	
import verifyUser from "../middlewares/verifyUser.js";
import verifyDriver from "../middlewares/verifyDriver.js";
const router = express.Router();

router.post("/request", verifyUser, requestRide);

router.get("/:id",  getRideDetails);

router.patch("/respond/:id", verifyDriver, respondToRide);

router.patch("/arrive/:id", verifyDriver, driverArrives);

export default router;