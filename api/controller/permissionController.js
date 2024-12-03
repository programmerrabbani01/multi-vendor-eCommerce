import Permission from "../models/Permission.js";
import asyncHandler from "express-async-handler";
import { createSlug } from "../helpers/slug.js";

/**
 * @desc get all Permission data
 * @route GET /permission
 * @access PUBLIC
 */

const getAllPermission = asyncHandler(async (req, res) => {
  const permissions = await Permission.find();

  // if (!permissions?.length === 0) {
  //   return res.status(400).json({ message: "Permission Not found" });
  // }

  if (permissions?.length > 0) {
    res.status(200).json(permissions);
  }
});

/**
 * @desc get Single Permission data
 * @route GET /permission/:id
 * @access PUBLIC
 */
const getSinglePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const permission = await Permission.findById(id).select("-password").lean();

  if (!permission) {
    return res.status(400).json({ message: "No Permission found" });
  }

  res.json(permission);
});

/**
 * @desc create new permission
 * @route POST /permission
 * @access PUBLIC
 */

const createPermission = asyncHandler(async (req, res) => {
  // get data
  const { name } = req.body;

  // check validation
  if (!name) {
    return res.status(400).json({ message: "Permission Name Is required" });
  }

  // name existence
  const nameCheck = await Permission.findOne({ name });

  if (nameCheck) {
    return res.status(400).json({ message: "Name already exists" });
  }

  // create new permission data
  const permission = await Permission.create({ name, slug: createSlug(name) });

  // check
  if (permission) {
    return res
      .status(201)
      .json({ message: "Permission created successful", permission });
  } else {
    return res.status(400).json({ message: "Invalid Permission data" });
  }
});

/**
 * @desc delete Permission data
 * @route DELETE /permission/:id
 * @access PUBLIC
 */
const deletePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const permission = await Permission.findByIdAndDelete(id);

  if (!permission) {
    return res.status(400).json({ message: "Permission delete failed" });
  }

  res.json({ message: "Permission Delete Successful", permission });
});

/**
 * @desc update Permission data
 * @route PATCH /permission/:id
 * @access PUBLIC
 */

const updatePermission = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "Permission Name Is required" });
  }

  const permission = await Permission.findById(id).exec();

  if (!permission) {
    return res.status(400).json({ message: "Permission not found" });
  }

  const updatePermissionData = await Permission.findByIdAndUpdate(
    id,
    {
      name,
      slug: createSlug(name),
    },
    {
      new: true,
    }
  );

  res.json({
    message: `Permission updated successful`,
    permission: updatePermissionData,
  });
});

/**
 * @desc update Permission Status
 * @route PATCH /permission/status/:id
 * @access PUBLIC
 */

const updatePermissionStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const updatePermissionStatus = await Permission.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    {
      new: true,
    }
  );

  res.json({
    message: `Permission updated successful`,
    permission: updatePermissionStatus,
  });
});

// export methods
export {
  getAllPermission,
  createPermission,
  getSinglePermission,
  deletePermission,
  updatePermission,
  updatePermissionStatus,
};
