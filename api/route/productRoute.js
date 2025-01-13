import express from "express";

import { tokenVerify } from "../middlewares/verifyToken.js";
import {
  createProduct,
  getAllProduct,
  updateProduct,
} from "../controller/productController.js";
import { productMulter } from "../utils/multer.js";

// create router

const router = express.Router();

//verify token
router.use(tokenVerify);

// routing

router.route("/").get(getAllProduct).post(productMulter, createProduct);

// router
//   .route("/:id")
//   .get(getSingleCategory)
//   .delete(deleteCategory)
//   .put(categoryMulter, updateCategory);

router.route("/:id").put(productMulter, updateProduct);

// export router

export default router;
