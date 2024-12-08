import express from "express";
import {
  adminSellerLogin,
  loggedInUser,
  userLogOut,
} from "../controller/authController.js";
import { tokenVerify } from "../middlewares/verifyToken.js";

//router
const router = express.Router();

//create routes
router.route("/adminSellerLogin").post(adminSellerLogin);
router.route("/logOut").post(userLogOut);
// router.route("/userLogin").post(userLogin);

router.route("/me").get(tokenVerify, loggedInUser);

//export
export default router;
