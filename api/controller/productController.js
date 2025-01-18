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
import Brand from "../models/Brand.js";
import Color from "../models/Color.js";
import Size from "../models/Size.js";
import Category from "../models/Category.js";

import { isValidObjectId } from "mongoose";

/**
 * @desc get all Product data
 * @route GET /product
 * @access PRIVATE
 */

export const getAllProduct = asyncHandler(async (req, res) => {
  const products = await Product.find()
    .populate("brand")
    .populate("category")
    .populate("colors")
    .populate("sizes");

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

const parseAndValidateIds = (items) => {
  if (!items || items === "[]") {
    return [];
  }
  const parsedItems = JSON.parse(items || "[]");
  return parsedItems.filter((item) => isValidObjectId(item));
};

export const createProduct = asyncHandler(async (req, res) => {
  try {
    const {
      title,
      desc,
      price,
      stock,
      discount,
      brand,
      category,
      colors,
      sizes,
    } = req.body;

    console.log("Brand Field:", req.body.brand);
    console.log("Category Field:", req.body.category);

    console.log("Request Body:", req.body);

    if (!title || !price || !stock) {
      return res
        .status(400)
        .json({ message: "Title, price, and stock are required." });
    }

    const sanitizedPrice = parseFloat(price.replace(/,/g, ""));
    if (isNaN(sanitizedPrice)) {
      return res.status(400).json({ message: "Invalid price format." });
    }

    const titleCheck = await Product.findOne({ title });
    if (titleCheck) {
      return res.status(400).json({ message: "Product title already exists." });
    }

    // Validate ObjectIds for brand, category, colors, and sizes
    const brandIds = parseAndValidateIds(brand);
    const categoryIds = parseAndValidateIds(category);
    const colorIds = parseAndValidateIds(colors);
    const sizeIds = parseAndValidateIds(sizes);

    if (!brandIds.length || !categoryIds.length) {
      return res
        .status(400)
        .json({ message: "Invalid brand or category IDs." });
    }

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

    const newProduct = new Product({
      title,
      slug: createSlug(title),
      desc,
      price: sanitizedPrice,
      stock,
      discount,
      brand: brandIds,
      category: categoryIds,
      colors: colorIds,
      sizes: sizeIds,
      photos,
    });

    // Save the product
    await newProduct.save();

    // Populate references
    const populatedProduct = await Product.findById(newProduct._id)
      .populate("colors")
      .populate("brand")
      .populate("sizes")
      .populate("category");

    res.status(201).json({
      success: true,
      message: "Product created successfully.",
      newProduct: populatedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create product.",
      error: error.message,
    });
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
    colors,
    sizes,
  } = req.body;

  console.log("Photos to remove:", photosToRemove);

  // Validate required fields
  if (!title || !price || !stock) {
    return res
      .status(400)
      .json({ message: "Title, price, and stock are required" });
  }

  // Parse price correctly
  let parsedPrice;
  try {
    parsedPrice =
      typeof price === "string" ? parseFloat(price.replace(/,/g, "")) : price;
    if (isNaN(parsedPrice)) {
      throw new Error("Invalid price value");
    }
  } catch (error) {
    console.error("Price parsing error:", error.message);
    return res.status(400).json({ message: "Price must be a valid number" });
  }

  // Fetch the product from the database
  const product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  // Parse and handle photosToRemove
  let parsedPhotosToRemove = [];
  if (photosToRemove && Array.isArray(photosToRemove)) {
    parsedPhotosToRemove = photosToRemove;
  } else if (photosToRemove && typeof photosToRemove === "string") {
    try {
      parsedPhotosToRemove = JSON.parse(photosToRemove); // Parse as JSON if stringified
    } catch (error) {
      console.error("Error parsing photosToRemove:", error.message);
      return res.status(400).json({ message: "Invalid photosToRemove format" });
    }
  }

  // Remove photos from Cloudinary and filter out from the database
  let updatedPhotos = Array.isArray(product.photos) ? [...product.photos] : [];
  if (parsedPhotosToRemove.length > 0) {
    for (const publicId of parsedPhotosToRemove) {
      try {
        console.log(`Removing photo with public_id: ${publicId}`);
        await cloudDelete(publicId); // Delete photo from Cloudinary
        updatedPhotos = updatedPhotos.filter(
          (photo) => photo.public_id !== publicId
        ); // Remove from database photos
        console.log(`Photo removed successfully: ${publicId}`);
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
      updatedPhotos = [...updatedPhotos, ...uploadedPhotos]; // Add new photos to the product
    } catch (error) {
      console.error("Error uploading new photos:", error.message);
      return res.status(500).json({ message: "Failed to upload new photos" });
    }
  }

  // Safe Parsing for Brand, Category, Colors, and Sizes
  let parsedBrand = Array.isArray(brand) ? brand : [];
  let parsedCategory = Array.isArray(category) ? category : [];
  let parsedColors = Array.isArray(colors) ? colors : [];
  let parsedSizes = Array.isArray(sizes) ? sizes : [];

  try {
    parsedBrand =
      brand && typeof brand === "string"
        ? JSON.parse(brand.replace(/'/g, '"'))
        : parsedBrand;
    parsedCategory =
      category && typeof category === "string"
        ? JSON.parse(category.replace(/'/g, '"'))
        : parsedCategory;
    parsedColors =
      colors && typeof colors === "string"
        ? JSON.parse(colors.replace(/'/g, '"'))
        : parsedColors;
    parsedSizes =
      sizes && typeof sizes === "string"
        ? JSON.parse(sizes.replace(/'/g, '"'))
        : parsedSizes;
  } catch (parseError) {
    console.error(
      "Error parsing brand, category, colors, or sizes:",
      parseError
    );
    return res
      .status(400)
      .json({ message: "Invalid brand, category, colors, or sizes format" });
  }

  // Update the product in the database
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
      colors: parsedColors,
      sizes: parsedSizes,
      photos: updatedPhotos, // Update photos
    },
    { new: true }
  )
    .populate("brand")
    .populate("colors")
    .populate("sizes")
    .populate("category");

  res.json({
    message: "Product updated successfully",
    product: updatedProduct,
  });
});
