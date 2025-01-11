// import multer from "multer";

// const storage = multer.diskStorage({
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       Date.now() +
//         " _ " +
//         Math.round(Math.random() * 1000000) +
//         " _ " +
//         file.fieldname
//     );
//   },
// });

// // console.log(storage);

// // multer for brand logo

// export const brandMulter = multer({ storage }).single("brandLogo");
// export const categoryMulter = multer({ storage }).single("categoryLogo");
// export const productMulter = multer({ storage }).array("productLogo");

import multer from "multer";
import path from "path";

// File storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Specify the uploads directory
  },
  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() +
        "_" +
        Math.round(Math.random() * 1000000) +
        "_" +
        file.fieldname +
        path.extname(file.originalname) // Preserve the file extension
    );
  },
});

// File filter to allow only specific file types
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Only .jpeg, .jpg, webp, and .png file types are allowed"),
      false
    );
  }
};

// Multer middleware for different upload types
export const brandMulter = multer({ storage, fileFilter }).single("brandPhoto");
export const categoryMulter = multer({ storage, fileFilter }).single(
  "categoryPhoto"
);
export const productMulter = multer({ storage, fileFilter }).array(
  "productPhoto",
  10
); // Limit to 10 files

// Exporting a generic multer for custom usage
export const customMulter = multer({ storage, fileFilter });
