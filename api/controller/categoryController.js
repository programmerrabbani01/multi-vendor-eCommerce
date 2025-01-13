import asyncHandler from "express-async-handler";
import Category from "../models/Category.js";
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

  return res.status(200).json({ categories: [], message: "No Category found" });
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
  res.status(201).json({ category, message: "Category successfully created" });
});

/**
 * @desc get Single Category data
 * @route GET /category/:id
 * @access PUBLIC
 */

export const getSingleCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const category = await Category.findById(id);

  if (!category) {
    return res.status(400).json({ message: "No Category found" });
  }

  res.json(category);
});

/**
 * @desc delete Category data
 * @route DELETE /category/:id
 * @access PRIVATE
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
      // Extract Public ID and Folder Path
      const publicId = findPublicId(category.photo);
      const folderPath = findFolderPath(publicId);

      // Delete the image
      const result = await cloudDelete(publicId);

      // Check Cloudinary deletion result
      if (result && result.result === "ok") {
        try {
          // Attempt to delete the folder
          if (folderPath) {
            const folderDeleteResult = await cloudinary.v2.api.delete_folder(
              folderPath
            );
            console.log(
              "Cloudinary Folder Deletion Result:",
              folderDeleteResult
            );
          } else {
            console.warn("No folder path to delete for Public ID:", publicId);
          }
        } catch (folderError) {
          console.warn(
            `Error deleting folder (likely not empty): ${folderPath}`,
            folderError.message
          );
        }
      } else if (result && result.result === "not found") {
        console.warn("Cloudinary resource not found:", publicId);
      }
    }
  } catch (error) {
    console.error(
      "Error deleting category image or folder from Cloudinary:",
      error
    );
    return res.status(500).json({
      message: "Failed to delete category image or folder from Cloudinary",
    });
  }

  // Success response
  res.json({ message: "Category successfully deleted", category });
});

/**
 * @desc update Category data
 * @route PUT /category/:id
 * @access PRIVATE
 */

export const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, parentCategory } = req.body;

  // Validation
  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  // Find the category to update
  const category = await Category.findById(id);

  if (!category) {
    return res.status(400).json({ message: "Category not found" });
  }

  // Handle photo upload and replacement
  let updatedPhoto = category.photo;
  if (req.file) {
    try {
      // Upload the new photo to Cloudinary in the "multi-vendor-ecommerce/categories" folder
      const uploadedPhoto = await cloudUploads(req.file.path, {
        folder: `multi-vendor-ecommerce/categories/${name.toLowerCase()}`, // Nested folder structure
      });

      updatedPhoto = uploadedPhoto.secure_url; // Update photo URL

      // Delete the old photo from Cloudinary
      if (category.photo) {
        const publicId = findPublicId(category.photo);
        const folderPath = findFolderPath(publicId);
        const result = await cloudDelete(publicId);
        console.log("Cloudinary Deletion Result:", result);

        if (result && result.result === "ok") {
          try {
            const folderDeleteResult = await cloudinary.v2.api.delete_folder(
              folderPath
            );
            console.log(
              "Cloudinary Folder Deletion Result:",
              folderDeleteResult
            );
          } catch (folderError) {
            console.warn(
              `Folder could not be deleted (likely not empty): ${folderPath}`,
              folderError.message
            );
          }
        } else if (result && result.result === "not found") {
          console.warn(
            `Image not found in Cloudinary: ${publicId}. Skipping folder deletion.`
          );
        }
      }
    } catch (error) {
      console.error("Error updating category photo:", error);

      // Ensure the uploaded file is cleaned up
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res
        .status(500)
        .json({ message: "Failed to update category photo" });
    }
  }

  // Update the category fields
  category.name = name;
  category.slug = createSlug(name);
  category.parentCategory = parentCategory || null;
  category.photo = updatedPhoto;

  // Save the updated category
  await category.save();

  // Update parent category with the new subcategory (if applicable)
  if (
    parentCategory &&
    parentCategory !== category.parentCategory?.toString()
  ) {
    // Remove the category from the previous parent's subcategories
    if (category.parentCategory) {
      await Category.findByIdAndUpdate(category.parentCategory, {
        $pull: { subCategory: category._id },
      });
    }

    // Add the category to the new parent's subcategories
    await Category.findByIdAndUpdate(parentCategory, {
      $push: { subCategory: category._id },
    });
  }

  // Respond with success
  res.json({
    message: "Category successfully updated",
    category,
  });
});
