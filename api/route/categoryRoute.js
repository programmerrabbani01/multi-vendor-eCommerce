import express from "express";

import { tokenVerify } from "../middlewares/verifyToken.js";
import { categoryMulter } from "../utils/multer.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
} from "../controller/categoryController.js";

// create router

const router = express.Router();

//verify token
router.use(tokenVerify);

// routing

router.route("/").get(getAllCategory).post(categoryMulter, createCategory);

router
  .route("/:id")
  .get(getSingleCategory)
  .delete(deleteCategory)
  .put(categoryMulter, updateCategory);

// export router

export default router;
