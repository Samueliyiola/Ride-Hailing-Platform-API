import express from "express";
import {requestRide, getRideDetails, respondToRide, driverArrives, startRide, completeRide, cancelRide, getUserRideHistory, getDriverRideHistory} from "../controllers/ride.controller.js";	
import verifyUser from "../middlewares/verifyUser.js";
import verifyDriver from "../middlewares/verifyDriver.js";
const router = express.Router();

router.post("/request", verifyUser, requestRide);

router.get("/:id",  getRideDetails);

router.patch("/respond/:id", verifyDriver, respondToRide);

router.patch("/arrive/:id", verifyDriver, driverArrives);

router.patch("/start-ride/:id", verifyDriver, startRide);

router.patch("/complete-ride/:id", verifyDriver, completeRide);

router.patch("/cancel-ride/:id", cancelRide);

router.get("/history/:id", verifyUser, getUserRideHistory);

router.get("/driver-history/:id", verifyDriver, getDriverRideHistory);
  
export default router;