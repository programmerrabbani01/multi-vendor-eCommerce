export const findFolderPath = (publicId) => {
  try {
    const lastSlashIndex = publicId.lastIndexOf("/");
    if (lastSlashIndex === -1) {
      console.warn("No folder path found in Public ID:", publicId);
      return null;
    }
    const folderPath = publicId.substring(0, lastSlashIndex); // Extract everything before the last "/"
    console.log("Extracted Folder Path:", folderPath);
    return folderPath;
  } catch (error) {
    console.error("Error extracting folder path from Public ID:", error);
    throw error;
  }
};
