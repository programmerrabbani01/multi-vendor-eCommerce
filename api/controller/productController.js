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
 * @desc get Single product data
 * @route GET /product/:id
 * @access PUBLIC
 */

export const getSingleProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id)
    .populate("brand")
    .populate("category");

  if (!product) {
    return res.status(400).json({ message: "No product found" });
  }

  res.json(product);
});

/**
 * @desc delete Product data
 * @route DELETE /product/:id
 * @access PRIVATE
 */

/**
 * @desc delete Product data
 * @route DELETE /product/:id
 * @access PRIVATE
 */
/**
 * @desc delete Product data
 * @route DELETE /product/:id
 * @access PRIVATE
 */
export const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  // Find the product to delete
  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  try {
    // Delete product images from Cloudinary
    if (product.photos && product.photos.length > 0) {
      for (const photo of product.photos) {
        try {
          // Extract public_id from each photo and delete it
          const result = await cloudDelete(photo.public_id);

          // Log result for debugging
          if (result.result !== "ok") {
            console.warn(`Failed to delete photo ${photo.public_id}`);
          }
        } catch (error) {
          console.error(
            `Error deleting photo ${photo.public_id}:`,
            error.message
          );
        }
      }

      // Attempt to delete the folder if applicable
      if (product.photos.length > 0) {
        const folderPath = findFolderPath(product.photos[0].public_id);
        if (folderPath) {
          try {
            await cloudinary.v2.api.delete_folder(folderPath);
            console.log(`Folder ${folderPath} deleted successfully.`);
          } catch (error) {
            console.warn(`Error deleting folder ${folderPath}:`, error.message);
          }
        }
      }
    }

    // Delete the product from the database
    await Product.deleteOne({ _id: id });

    // Success response
    res.json({ message: "Product successfully deleted", product });
  } catch (error) {
    console.error("Error during product deletion:", error.message);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the product." });
  }
});

/**
 * @desc update Product data
 * @route PUT /product/:id
 * @access PRIVATE
 */

export const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    title,
    desc,
    price,
    stock,
    discount,
    brand,
    category,
    photosToRemove,
  } = req.body;

  // Validation
  if (!title || !price || !stock) {
    return res
      .status(400)
      .json({ message: "Title, price, and stock are required" });
  }

  // Convert price to a number
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

  // Remove specific photos from Cloudinary and the database
  let updatedPhotos = [...product.photos];
  if (photosToRemove && Array.isArray(photosToRemove)) {
    for (const publicId of photosToRemove) {
      try {
        // Remove photo from Cloudinary
        await cloudDelete(publicId);
        // Remove photo from the database array
        updatedPhotos = updatedPhotos.filter(
          (photo) => photo.public_id !== publicId
        );
      } catch (error) {
        console.warn(`Error removing photo ${publicId}:`, error.message);
      }
    }
  }

  // Handle new photo uploads
  if (req.files && req.files.length > 0) {
    try {
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
      updatedPhotos = [...updatedPhotos, ...uploadedPhotos];
    } catch (error) {
      console.error("Error uploading new photos:", error.message);
      return res.status(500).json({ message: "Failed to upload new photos" });
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
