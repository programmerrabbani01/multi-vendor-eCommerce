import express from "express";

import { tokenVerify } from "../middlewares/verifyToken.js";
import { categoryMulter } from "../utils/multer.js";
import {
  createCategory,
  deleteCategory,
  getAllCategory,
} from "../controller/categoryController.js";

// create router

const router = express.Router();

//verify token
router.use(tokenVerify);

// routing

router.route("/").get(getAllCategory).post(categoryMulter, createCategory);

// router
//   .route("/:id")
//   .get(getSingleCategory)
//   .delete(deleteCategory)
//   .patch(categoryMulter, updateCategory)
//   .put(categoryMulter, updateCategory);

router.route("/:id").delete(deleteCategory);

// router.route("/status/:id").put(updateCategoryStatus);

// export router

export default router;
