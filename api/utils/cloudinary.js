import axios from "axios";
import cloudinary from "cloudinary";
import fs from "fs"; // For removing files from local storage after upload

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: "dairwhedy",
  api_key: "133861414556387",
  api_secret: "VXfHSyH06s7z1XjH7dBxhMEid2Q",
});

/**
 * Upload a single file to Cloudinary using the Node SDK.
 *
 * @param {string} filePath - The file path to upload.
 * @param {Object} [options] - Additional options for the upload.
 * @param {string} [options.folder] - The folder in Cloudinary where the file will be stored.
 * @param {Object} [options.params] - Additional parameters for Cloudinary (e.g., transformations).
 * @returns {Promise<Object>} - The Cloudinary response object.
 */
export const cloudUploads = async (filePath, options = {}) => {
  try {
    const uploadOptions = {
      folder: options.folder || undefined,
      ...options.params, // Additional Cloudinary parameters (e.g., public_id, tags)
    };

    const data = await cloudinary.v2.uploader.upload(filePath, uploadOptions);

    // Optional: Delete the file from local storage after upload
    fs.unlinkSync(filePath);

    return data;
  } catch (error) {
    console.error("Error during file upload:", error);
    throw new Error("Failed to upload file to Cloudinary.");
  }
};

/**
 * Upload multiple files to Cloudinary.
 *
 * @param {string[]} filePaths - Array of file paths to upload.
 * @param {Object} [options] - Additional options for the uploads.
 * @param {string} [options.folder] - The folder in Cloudinary where files will be stored.
 * @param {Object} [options.params] - Additional parameters for Cloudinary (e.g., transformations).
 * @returns {Promise<Object[]>} - Array of Cloudinary response objects.
 */
export const cloudUploadsMultiple = async (filePaths, options = {}) => {
  try {
    const uploadPromises = filePaths.map((filePath) =>
      cloudUploads(filePath, options)
    );
    return Promise.all(uploadPromises);
  } catch (error) {
    console.error("Error during multiple file uploads:", error);
    throw new Error("Failed to upload multiple files to Cloudinary.");
  }
};

/**
 * Delete a file from Cloudinary.
 *
 * @param {string} publicId - The public ID of the file to delete in Cloudinary.
 * @returns {Promise<void>} - Resolves when the file is successfully deleted.
 */

export const cloudDelete = async (publicId) => {
  try {
    console.log("Attempting to delete resource on Cloudinary:", publicId);
    const result = await cloudinary.v2.uploader.destroy(publicId);
    console.log("Cloudinary Deletion Result:", result);
    return result;
  } catch (error) {
    console.error("Cloudinary deletion error:", error);
    throw error;
  }
};

/**
 * Upload a single file to Cloudinary using Axios.
 *
 * @param {Object} params - The parameters for the upload.
 * @param {File} params.file - A single file to upload.
 * @param {string} params.preset - The upload preset for Cloudinary.
 * @param {string} params.cloudName - The Cloudinary cloud name.
 * @param {string} [params.folder] - The folder to upload the file to.
 * @returns {Promise<Object>} - The Cloudinary response object.
 */
export const cloudUploadAxios = async ({ file, preset, cloudName, folder }) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", preset);
    if (folder) formData.append("folder", folder);

    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    return res.data; // Returns secure_url and public_id
  } catch (error) {
    console.error("Error during Axios file upload:", error);
    throw new Error("Failed to upload file using Axios.");
  }
};

/**
 * Upload multiple files to Cloudinary using Axios.
 *
 * @param {Object} params - The parameters for the upload.
 * @param {File[]} params.files - Array of files to upload.
 * @param {string} params.preset - The upload preset for Cloudinary.
 * @param {string} params.cloudName - The Cloudinary cloud name.
 * @param {string} [params.folder] - The folder to upload files to.
 * @returns {Promise<Object[]>} - Array of Cloudinary response objects.
 */
export const cloudUploadMultipleAxios = async ({
  files,
  preset,
  cloudName,
  folder,
}) => {
  try {
    const uploadPromises = files.map((file) =>
      cloudUploadAxios({ file, preset, cloudName, folder })
    );
    return Promise.all(uploadPromises);
  } catch (error) {
    console.error("Error during Axios multiple file uploads:", error);
    throw new Error("Failed to upload multiple files using Axios.");
  }
};
