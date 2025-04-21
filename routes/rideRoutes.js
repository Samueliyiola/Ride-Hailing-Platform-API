import express from "express";
import {requestRide, getRideDetails} from "../controllers/ride.controller.js";	
import verifyUser from "../middlewares/verifyUser.js";
const router = express.Router();

router.post("/request", verifyUser, requestRide);

router.get("/:id",  getRideDetails);



export default router;