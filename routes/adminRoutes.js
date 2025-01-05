import loginAdmin from "../controllers/loginAdmin.js";
import registerAdmin from "../controllers/registerAdmin.js";
import registerDriver from "../controllers/registerDriver.js";
import express from "express";
const router = express.Router();

import verifyAdmin from "../middlewares/verifyAdmin.js";

router.post("/login", loginAdmin);
router.post("/register", verifyAdmin, registerAdmin);
router.post("/register-driver", verifyAdmin, registerDriver);




export default router;