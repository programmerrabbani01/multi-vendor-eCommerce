import asyncHandler from "express-async-handler";
import { createSlug } from "../helpers/slug.js";
import cloudinary from "cloudinary";
import {
  cloudDelete,
  cloudUploads,
  cloudUploadsMultiple,
} from "../utils/cloudinary.js";
import fs from "fs";
import { findFolderPath } from "../helpers/findFolderPath.js";
import { findPublicId } from "../helpers/findPublicId.js";
import Product from "../models/product.js";

/**
 * @desc get all Product data
 * @route GET /product
 * @access PRIVATE
 */

export const getAllProduct = asyncHandler(async (req, res) => {
  const products = await Product.find().populate("brand").populate("category");

  if (products.length > 0) {
    return res.status(200).json({ products });
  }

  return res.status(200).json({ products: [], message: "No Product found" });
});

/**
 * @desc create Product data
 * @route POST /product
 * @access PRIVATE
 */

export const createProduct = asyncHandler(async (req, res) => {
  try {
    // Get data from request body
    const { title, desc, price, stock, discount, brand, category } = req.body;

    // Validation
    if (!title || !price || !stock) {
      return res
        .status(400)
        .json({ message: "Title, price, and stock are required." });
    }

    // Sanitize price (remove commas and convert to number)
    const sanitizedPrice = parseFloat(price.replace(/,/g, ""));
    if (isNaN(sanitizedPrice)) {
      return res.status(400).json({ message: "Invalid price format." });
    }

    // Check if title already exists
    const titleCheck = await Product.findOne({ title });
    if (titleCheck) {
      return res.status(400).json({ message: "Product title already exists." });
    }

    // File upload handling
    let photos = [];
    if (req.files && req.files.length > 0) {
      const filePaths = req.files.map((file) => file.path);
      const uploadedFiles = await cloudUploadsMultiple(filePaths, {
        folder: `multi-vendor-ecommerce/products/${createSlug(title, {
          lower: true,
        })}`,
      });

      photos = uploadedFiles.map((file) => ({
        url: file.url,
        public_id: file.public_id,
      }));
    }

    // Parse category and brand
    const categoryArray = Array.isArray(category)
      ? category
      : JSON.parse(category.replace(/'/g, '"'));
    const brandArray = Array.isArray(brand)
      ? brand
      : JSON.parse(brand.replace(/'/g, '"'));

    // Create product
    const product = await Product.create({
      title,
      slug: createSlug(title, { lower: true }),
      desc,
      price: sanitizedPrice,
      brand: brandArray,
      stock,
      discount,
      category: categoryArray,
      photos: photos.length > 0 ? photos : null,
    });

    // Populate and return the created product
    const findProduct = await Product.findById(product.id)
      .populate("brand")
      .populate("category");
    return res
      .status(201)
      .json({ message: "Product created successfully", product: findProduct });
  } catch (error) {
    console.error("Error creating product:", error);
    return res
      .status(500)
      .json({ message: "An error occurred while creating the product." });
  }
});

/**
 * @desc get Single Brand data
 * @route GET /brand/:id
 * @access PUBLIC
 */

// export const getSingleBrand = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   const brand = await Brand.findById(id);

//   if (!brand) {
//     return res.status(400).json({ message: "No Brand found" });
//   }

//   res.json(brand);
// });

/**
 * @desc delete Brand data
 * @route DELETE /brand/:id
 * @access PRIVATE
 */

// export const deleteBrand = asyncHandler(async (req, res) => {
//   const { id } = req.params;

//   // Find and delete the brand from the database
//   const brand = await Brand.findByIdAndDelete(id);

//   if (!brand) {
//     return res.status(400).json({ message: "Brand delete failed" });
//   }

//   try {
//     if (brand.photo) {
//       // Extract Public ID and Folder Path
//       const publicId = findPublicId(brand.photo);
//       const folderPath = findFolderPath(publicId);

//       // Delete the image
//       const result = await cloudDelete(publicId);

//       // Check Cloudinary deletion result
//       if (result && result.result === "ok") {
//         try {
//           // Attempt to delete the folder
//           if (folderPath) {
//             const folderDeleteResult = await cloudinary.v2.api.delete_folder(
//               folderPath
//             );
//             console.log(
//               "Cloudinary Folder Deletion Result:",
//               folderDeleteResult
//             );
//           } else {
//             console.warn("No folder path to delete for Public ID:", publicId);
//           }
//         } catch (folderError) {
//           console.warn(
//             `Error deleting folder (likely not empty): ${folderPath}`,
//             folderError.message
//           );
//         }
//       } else if (result && result.result === "not found") {
//         console.warn("Cloudinary resource not found:", publicId);
//       }
//     }
//   } catch (error) {
//     console.error(
//       "Error deleting brand image or folder from Cloudinary:",
//       error
//     );
//     return res.status(500).json({
//       message: "Failed to delete brand image or folder from Cloudinary",
//     });
//   }

//   // Success response
//   res.json({ message: "Brand successfully deleted", brand });
// });

/**
 * @desc update Product data
 * @route PUT /product/:id
 * @access PRIVATE
 */

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, desc, price, stock, discount, brand, category } = req.body;

  // Validation
  if (!title || !price || !stock) {
    return res
      .status(400)
      .json({ message: "Title, price, and stock are required" });
  }

  // Convert price to a number (handle strings with commas)
  let parsedPrice;
  try {
    parsedPrice =
      typeof price === "string" ? parseFloat(price.replace(/,/g, "")) : price;
    if (isNaN(parsedPrice)) {
      throw new Error("Invalid price value");
    }
  } catch (error) {
    return res.status(400).json({ message: "Price must be a valid number" });
  }

  // Find the product to update
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Handle photo uploads and replacements
  let updatedPhotos = [...product.photos];
  if (req.files && req.files.length > 0) {
    try {
      // Upload new photos to Cloudinary
      const uploadedPhotos = [];
      for (const file of req.files) {
        const uploadedFile = await cloudUploads(file.path, {
          folder: `multi-vendor-ecommerce/products/${createSlug(title, {
            lower: true,
          })}`,
        });
        uploadedPhotos.push({
          url: uploadedFile.secure_url,
          public_id: uploadedFile.public_id,
        });
      }

      // Add new photos to the list
      updatedPhotos = [...updatedPhotos, ...uploadedPhotos];

      // Delete old photos from Cloudinary
      for (const oldPhoto of product.photos) {
        try {
          const result = await cloudDelete(oldPhoto.public_id);
          console.log("Deleted old photo from Cloudinary:", result);
        } catch (error) {
          console.warn(
            "Error deleting old photo:",
            oldPhoto.public_id,
            error.message
          );
        }
      }
    } catch (error) {
      console.error("Error updating product photos:", error);
      return res
        .status(500)
        .json({ message: "Failed to update product photos" });
    }
  }

  // Parse brand and category if provided as strings
  let parsedBrand = Array.isArray(brand) ? brand : [];
  let parsedCategory = Array.isArray(category) ? category : [];
  try {
    if (typeof brand === "string") {
      parsedBrand = JSON.parse(brand.replace(/'/g, '"'));
    }
    if (typeof category === "string") {
      parsedCategory = JSON.parse(category.replace(/'/g, '"'));
    }
  } catch (parseError) {
    console.error("Error parsing brand or category:", parseError);
    return res
      .status(400)
      .json({ message: "Invalid brand or category format" });
  }

  // Update product data
  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    {
      title,
      slug: createSlug(title, { lower: true }),
      desc,
      price: parsedPrice,
      stock,
      discount,
      brand: parsedBrand,
      category: parsedCategory,
      photos: updatedPhotos,
    },
    { new: true }
  )
    .populate("brand")
    .populate("category");

  // Respond with success
  res.json({
    message: "Product updated successfully",
    product: updatedProduct,
  });
});
