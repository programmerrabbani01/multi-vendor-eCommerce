import express from "express";

import { tokenVerify } from "../middlewares/verifyToken.js";
import {
  deleteBrand,
  createBrand,
  getAllBrand,
  getSingleBrand,
  updateBrand,
} from "../controller/brandController.js";
import { brandMulter } from "../utils/multer.js";

// create router

const router = express.Router();

//verify token
router.use(tokenVerify);

// routing

router.route("/").get(getAllBrand).post(brandMulter, createBrand);

router
  .route("/:id")
  .get(getSingleBrand)
  .delete(deleteBrand)
  .put(brandMulter, updateBrand);

// export router

export default router;
