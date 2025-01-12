import asyncHandler from "express-async-handler";
import Brand from "../models/brand.js";
import { createSlug } from "../helpers/slug.js";
import cloudinary from "cloudinary";
import { cloudDelete, cloudUploads } from "../utils/cloudinary.js";
import fs from "fs";
import { findFolderPath } from "../helpers/findFolderPath.js";
import { findPublicId } from "../helpers/findPublicId.js";

/**
 * @desc get all Brand data
 * @route GET /brand
 * @access PRIVATE
 */

export const getAllBrand = asyncHandler(async (req, res) => {
  const brands = await Brand.find();

  if (brands.length > 0) {
    return res.status(200).json({ brands });
  }

  return res.status(200).json({ brands: [], message: "No Brand found" });
});

/**
 * @desc create Brand data
 * @route POST /brand
 * @access PRIVATE
 */

export const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  // Validations
  if (!name) {
    return res.status(400).json({ message: "Brand name is required" });
  }

  // Check if the Brand name already exists
  const nameCheck = await Brand.findOne({ name });
  if (nameCheck) {
    return res.status(400).json({ message: "Brand already exists" });
  }

  // Photo upload
  let brandPhoto = null;
  if (req.file) {
    try {
      // Upload photo to Cloudinary in the "multi-vendor-ecommerce/brands" folder
      const uploadedPhoto = await cloudUploads(req.file.path, {
        folder: `multi-vendor-ecommerce/brands/${name.toLowerCase()}`, // Nested folder structure
      });

      brandPhoto = uploadedPhoto.secure_url; // Save the secure URL of the uploaded photo
    } catch (error) {
      console.error("Error uploading brand photo:", error);

      // Ensure the uploaded file is cleaned up
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(500).json({ message: "Failed to upload brand photo" });
    }
  }

  // Create new brand
  const brand = await Brand.create({
    name,
    slug: createSlug(name),
    photo: brandPhoto || null,
  });

  // Respond with success
  res.status(201).json({ brand, message: "Brand successfully created" });
});

/**
 * @desc get Single Brand data
 * @route GET /brand/:id
 * @access PUBLIC
 */

export const getSingleBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const brand = await Brand.findById(id);

  if (!brand) {
    return res.status(400).json({ message: "No Brand found" });
  }

  res.json(brand);
});

/**
 * @desc delete Brand data
 * @route DELETE /brand/:id
 * @access PRIVATE
 */

export const deleteBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find and delete the brand from the database
  const brand = await Brand.findByIdAndDelete(id);

  if (!brand) {
    return res.status(400).json({ message: "Brand delete failed" });
  }

  try {
    if (brand.photo) {
      // Extract Public ID and Folder Path
      const publicId = findPublicId(brand.photo);
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
      "Error deleting brand image or folder from Cloudinary:",
      error
    );
    return res.status(500).json({
      message: "Failed to delete brand image or folder from Cloudinary",
    });
  }

  // Success response
  res.json({ message: "Brand successfully deleted", brand });
});

/**
 * @desc update Brand data
 * @route PUT /brand/:id
 * @access PRIVATE
 */

export const updateBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // Validation
  if (!name) {
    return res.status(400).json({ message: "Brand name is required" });
  }

  // Find the brand to update
  const brand = await Brand.findById(id);

  if (!brand) {
    return res.status(400).json({ message: "Brand not found" });
  }

  // Handle photo upload and replacement
  let updatedPhoto = brand.photo;
  if (req.file) {
    try {
      // Upload the new photo to Cloudinary in the "multi-vendor-ecommerce/brands" folder
      const uploadedPhoto = await cloudUploads(req.file.path, {
        folder: `multi-vendor-ecommerce/brands/${name.toLowerCase()}`, // Nested folder structure
      });

      updatedPhoto = uploadedPhoto.secure_url; // Update photo URL

      // Delete the old photo from Cloudinary
      if (brand.photo) {
        const publicId = findPublicId(brand.photo);
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
      console.error("Error updating Brand photo:", error);

      // Ensure the uploaded file is cleaned up
      if (fs.existsSync(req.file.path)) {
        fs.unlinkSync(req.file.path);
      }

      return res.status(500).json({ message: "Failed to update Brand photo" });
    }
  }

  // Update the brand fields
  brand.name = name;
  brand.slug = createSlug(name);
  brand.photo = updatedPhoto;

  // Save the updated brand
  await brand.save();

  // Respond with success
  res.json({
    message: "Brand successfully updated",
    brand,
  });
});
