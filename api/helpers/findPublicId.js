export const findPublicId = (url) => {
  const startIndex = url.indexOf("upload/") + 7; // Start after "upload/"
  const path = url.substring(startIndex).split(".")[0]; // Remove extension
  const pathWithoutVersion = path.replace(/^v\d+\//, ""); // Remove version number
  return decodeURIComponent(pathWithoutVersion); // Decode spaces or special characters
};
