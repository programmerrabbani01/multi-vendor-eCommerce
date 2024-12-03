import express from "express";
import {
  createPermission,
  deletePermission,
  getAllPermission,
  getSinglePermission,
  updatePermission,
  updatePermissionStatus,
} from "../controller/permissionController.js";
import { tokenVerify } from "../middlewares/verifyToken.js";

//router
const router = express.Router();

//verify token
router.use(tokenVerify);

//routing
router.route("/").get(getAllPermission).post(createPermission);
router
  .route("/:id")
  .get(getSinglePermission)
  .delete(deletePermission)
  .patch(updatePermission);

router.route("/status/:id").patch(updatePermissionStatus);

//export
export default router;
