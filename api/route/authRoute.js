import express from "express";
import {
  adminSellerLogin,
  loggedInUser,
} from "../controller/authController.js";
import { tokenVerify } from "../middlewares/verifyToken.js";

//router
const router = express.Router();

//create routes
router.route("/adminSellerLogin").post(adminSellerLogin);
// router.route("/userLogin").post(userLogin);

router.route("/me").get(tokenVerify, loggedInUser);

//export
export default router;
