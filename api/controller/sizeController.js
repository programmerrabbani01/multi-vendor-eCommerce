import mongoose from "mongoose";
import { createSlug } from "../helpers/slug.js";
import Size from "../models/Size.js";
import asyncHandler from "express-async-handler";

/**
 * @desc get all size data
 * @route GET /size
 * @access PUBLIC
 */

export const getAllSizes = asyncHandler(async (req, res) => {
  const sizes = await Size.find();

  if (sizes.length > 0) {
    return res.status(200).json({ sizes });
  }

  return res.status(200).json({ sizes: [], message: "No Size found" });
});

/**
 * @desc create size data
 * @route POST /size
 * @access PUBLIC
 */

export const createSize = asyncHandler(async (req, res) => {
  // get values
  const { name } = req.body;

  // validations
  if (!name) {
    return res.status(400).json({ message: "Size name is required" });
  }
  // email check
  const nameCheck = await Size.findOne({ name });

  if (nameCheck) {
    return res.status(400).json({ message: "Size already exists" });
  }

  // create new Tag
  const size = await Size.create({
    name,
    slug: createSlug(name),
  });

  res.status(200).json({ size, message: "Size created successfully" });
});

/**
 * @desc get Single SIZE data
 * @route GET /SIZE/:id
 * @access PUBLIC
 */

export const getSingleSize = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const size = await Size.findById(id);

    return res.status(200).json(size);
  } catch (error) {
    res.status(400).json({ message: "No Size found" });
  }
});

/**
 * @desc delete size data
 * @route DELETE /size/:id
 * @access PUBLIC
 */

export const deleteSize = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const size = await Size.findByIdAndDelete(id);

  if (!size) {
    return res.status(400).json({ message: "Size delete failed" });
  }

  res.json({ message: "size Delete Successful", size });
});

/**
 * @desc update size data
 * @route PATCH /size/:id
 * @access PUBLIC
 */
export const updateSize = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // validation
  if (!name) {
    return res.status(400).json({ message: "Size Name Is Required" });
  }

  const size = await Size.findById(id);

  if (!size) {
    return res.status(400).json({ message: "Size not found" });
  }

  const updateSizeData = await Size.findByIdAndUpdate(
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
    message: "Size updated successfully",
    size: updateSizeData,
  });
});

/**
 * @desc update size Status
 * @route PUT /size/status/:id
 * @access PUBLIC
 */

export const updateSizeStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const updateSizeStatus = await Size.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    {
      new: true,
    }
  );

  res.json({
    message: `size Status updated successful`,
    size: updateSizeStatus,
  });
});
