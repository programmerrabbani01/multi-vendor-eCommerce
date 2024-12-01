import express from "express";
import { adminLogin } from "../controller/authController.js";

//router
const router = express.Router();

//create routes
router.route("/adminLogin").post(adminLogin);

//export
export default router;
