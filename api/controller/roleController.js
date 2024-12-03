import Role from "../models/Role.js";
import asyncHandler from "express-async-handler";
import { createSlug } from "../helpers/slug.js";

/**
 * @desc get all Role data
 * @route GET /role
 * @access PUBLIC
 */

export const getAllRole = asyncHandler(async (req, res) => {
  const roles = await Role.find().select("-password").lean();

  // if (!roles?.length) {
  //   return res.status(400).json({ message: "Role Not found" });
  // }
  if (roles?.length > 0) {
    res.status(200).json(roles);
  } else {
    return res.status(400).json({ message: "Role Not found" });
  }
});

/**
 * @desc get Single Role data
 * @route GET /Role/:id
 * @access PUBLIC
 */
export const getSingleRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const role = await Role.findById(id);

  if (!role) {
    return res.status(400).json({ message: "No Role found" });
  }

  res.json(role);
});

/**
 * @desc create new Role
 * @route POST /role
 * @access PUBLIC
 */

export const createRole = asyncHandler(async (req, res) => {
  // get data
  const { name, permissions } = req.body;

  // check validation
  if (!name) {
    return res.status(400).json({ message: "All Fields Are required" });
  }

  // email existence
  const nameCheck = await Role.findOne({ name });

  if (nameCheck) {
    return res.status(400).json({ message: "Name already exists" });
  }

  // create new user data
  const role = await Role.create({ name, slug: createSlug(name), permissions });

  // check
  if (role) {
    return res.status(201).json({ message: "Role created successful", role });
  } else {
    return res.status(400).json({ message: "Invalid Role data" });
  }
});

/**
 * @desc delete Role data
 * @route DELETE /role/:id
 * @access PUBLIC
 */
export const deleteRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const role = await Role.findByIdAndDelete(id);

  if (!role) {
    return res.status(400).json({ message: "Role delete failed" });
  }

  res.status(200).json({ message: "Permission Delete Successful", role });
});

/**
 * @desc update Role data
 * @route PUT /role/:id
 * @access PUBLIC
 */

export const updateRole = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { name, permissions } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "Role Name Is required" });
  }

  const updateRoleData = await Role.findByIdAndUpdate(
    id,
    {
      name,
      slug: createSlug(name),
      permissions: permissions,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    message: `Role updated successful`,
    role: updateRoleData,
  });
});

/**
 * @desc update Role Status
 * @route PATCH /role/status/:id
 * @access PUBLIC
 */
export const updateRoleStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const updateRoleStatus = await Role.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    {
      new: true,
    }
  );

  res.json({
    message: `Role Status Updated Successful`,
    role: updateRoleStatus,
  });
});
