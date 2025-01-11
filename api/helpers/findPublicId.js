export const findPublicId = (url) => {
  try {
    // Find the part after "/upload/" and remove the version number
    const startIndex = url.indexOf("/upload/") + 8;
    const pathWithVersion = url.substring(startIndex);
    const parts = pathWithVersion.split("/");

    // Remove version number if present
    const publicIdParts = parts.filter(
      (part) => !part.startsWith("v") || isNaN(Number(part.substring(1)))
    );
    let publicId = publicIdParts.join("/").split(".")[0]; // Remove the file extension

    // Decode URL-encoded characters (e.g., %20 -> space)
    publicId = decodeURIComponent(publicId);

    console.log("Extracted Public ID:", publicId);
    return publicId;
  } catch (error) {
    console.error("Error extracting public ID from URL:", error);
    throw error;
  }
};
