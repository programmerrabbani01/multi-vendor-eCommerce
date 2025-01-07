export const findFolderPath = (publicId) => {
  const lastSlashIndex = publicId.lastIndexOf("/");
  return publicId.substring(0, lastSlashIndex); // Extract folder path (everything before the last "/")
};
