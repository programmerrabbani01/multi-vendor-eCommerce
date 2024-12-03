import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
  updateUserStatus,
} from "../controller/userController.js";
import { tokenVerify } from "../middlewares/verifyToken.js";

//router
const router = express.Router();

//verify token
router.use(tokenVerify);

//routing
router.route("/").get(getAllUser).post(createUser);
router.route("/:id").get(getSingleUser).delete(deleteUser).patch(updateUser);
router.route("/status/:id").patch(updateUserStatus);

//export
export default router;
