import express from "express";
import {
  createColor,
  deleteColor,
  getAllColors,
  getSingleColor,
  updateColor,
} from "../controller/colorController.js";
import { tokenVerify } from "../middlewares/verifyToken.js";

//router
const router = express.Router();

//verify token
router.use(tokenVerify);

//routing
router.route("/").get(getAllColors).post(createColor);
router.route("/:id").get(getSingleColor).delete(deleteColor).patch(updateColor);
// router.route("/status/:id").put(updateColorStatus);

//export
export default router;
