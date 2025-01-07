import asyncHandler from "express-async-handler";
import Category from "../models/category.js";
import { createSlug } from "../helpers/slug.js";
import cloudinary from "cloudinary";
import { cloudDelete, cloudUploads } from "../utils/cloudinary.js";
import fs from "fs";
import { findFolderPath } from "../helpers/findFolderPath.js";
import { findPublicId } from "../helpers/findPublicId.js";

/**
 * @desc get all Category data
 * @route GET /category
 * @access PRIVATE
 */

export const getAllCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find().populate([
    {
      path: "subCategory",
      populate: {
        path: "subCategory",
        populate: {
          path: "subCategory",
        },
      },
    },
    {
      path: "parentCategory",
      populate: {
        path: "parentCategory",
        populate: {
          path: "parentCategory",
        },
      },
    },
  ]);

  if (categories.length > 0) {
    return res.status(200).json({ categories });
  }

  return res.status(404).json({ message: "No Category found" });
});

/**
 * @desc create Category data
 * @route POST /category
 * @access PRIVATE
 */

export const createCategory = asyncHandler(async (req, res) => {
  const { name, parentCategory } = req.body;

  // Validations
  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  // Check if the category name already exists
  const nameCheck = await Category.findOne({ name });
  if (nameCheck) {
    return res.status(400).json({ message: "Category already exists" });
  }

  // Photo upload
  let catPhoto = null;
  if (req.file) {
    try {
      // Upload photo to Cloudinary in the "multi-vendor-ecommerce/categories" folder
      const uploadedPhoto = await cloudUploads(req.file.path, {
        folder: `multi-vendor-ecommerce/categories/${name.toLowerCase()}`, // Nested folder structure
      });

      catPhoto = uploadedPhoto.secure_url; // Save the secure URL of the uploaded photo
    } catch (error) {
      console.error("Error uploading category photo:", error);

      // Ensure the uploaded file is cleaned up
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res
        .status(500)
        .json({ message: "Failed to upload category photo" });
    }
  }

  // Create new category
  const category = await Category.create({
    name,
    slug: createSlug(name),
    photo: catPhoto || null,
    parentCategory: parentCategory || null,
  });

  // Update parent category with the new subcategory (if applicable)
  if (parentCategory) {
    await Category.findByIdAndUpdate(parentCategory, {
      $push: { subCategory: category._id },
    });
  }

  // Respond with success
  res.status(201).json({ category, message: "Category created successfully" });
});

/**
 * @desc delete Category data
 * @route DELETE /category/:id
 * @access PUBLIC
 */

export const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find and delete the category from the database
  const category = await Category.findByIdAndDelete(id);

  if (!category) {
    return res.status(400).json({ message: "Category delete failed" });
  }

  try {
    if (category.photo) {
      // Step 1: Extract Public ID and Folder Path
      const publicId = findPublicId(category.photo);
      const folderPath = findFolderPath(publicId);
      console.log("Extracted Public ID for Deletion:", publicId);
      console.log("Extracted Folder Path:", folderPath);

      // Step 2: Delete the Image
      // const result = await cloudinary.v2.uploader.destroy(publicId);
      const result = await cloudDelete(publicId);
      // console.log("Cloudinary Deletion Result:", result);

      // Step 3: Attempt to Delete the Folder
      if (result && result.result === "ok") {
        try {
          const folderDeleteResult = await cloudinary.v2.api.delete_folder(
            folderPath
          );
          console.log("Cloudinary Folder Deletion Result:", folderDeleteResult);
        } catch (folderError) {
          console.warn(
            `Folder could not be deleted (likely not empty): ${folderPath}`,
            folderError.message
          );
        }
      }
    }
  } catch (error) {
    console.error("Error deleting category image from Cloudinary:", error);
    return res.status(500).json({
      message: "Failed to delete category image or folder from Cloudinary",
    });
  }

  // Success response
  res.json({ message: "Category deleted successfully", category });
});
