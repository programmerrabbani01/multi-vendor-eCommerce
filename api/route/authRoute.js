import express from "express";
import { adminLogin } from "../controller/authController.js";
import { tokenVerify } from "../middlewares/verifyToken.js";

//router
const router = express.Router();

//create routes
router.route("/adminLogin").post(adminLogin);
// router.route("/userLogin").post(userLogin);

//export
export default router;
