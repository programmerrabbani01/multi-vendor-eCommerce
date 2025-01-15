import express from "express";
import { tokenVerify } from "../middlewares/verifyToken.js";
import {
  getAllSizes,
  createSize,
  getSingleSize,
  deleteSize,
  updateSize,
} from "../controller/sizeController.js";

// create router

const router = express.Router();

//verify token
router.use(tokenVerify);

// routing

router.route("/").get(getAllSizes).post(createSize);

router.route("/:id").get(getSingleSize).delete(deleteSize).patch(updateSize);

// router.route("/status/:id").put(isAdmin, updateSizeStatus);

// export router

export default router;
