import asyncHandler from "express-async-handler";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_SECRET,
  APP_ENV,
} from "../utils/secret.js";

/**
 * @desc Admin login
 * @route POST /api/v1/auth/adminLogin
 * @access PRIVATE
 */

export const adminLogin = asyncHandler(async (req, res) => {
  // get body data

  const { email, password } = req.body;

  // is empty

  if (!email || !password)
    return res.status(400).json({ message: "all fields are required" });

  // Find admin by email
  const admin = await User.findOne({ email }).populate("role");

  // check if admin not found

  if (!admin) return res.status(400).json({ message: "Admin not found" });

  // check if you are an admin or not

  if (!admin.role || admin.role.name !== "Admin") {
    return res.status(400).json({ message: "You Are Not An Admin!" });
  }

  // password check

  if (!admin.password) {
    console.error("Admin password is undefined!");
    return res.status(500).json({ message: "Admin password is not set" });
  }

  const passwordCheck = await bcrypt.compare(password, admin.password);

  // password matching

  if (!passwordCheck)
    return res.status(400).json({ message: " Wrong Password " });

  // create access token

  const accessToken = jwt.sign({ email: admin.email }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });

  // set cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: APP_ENV == "Development" ? false : true,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  //response
  res
    .status(200)
    .json({ user: admin, message: "Login Successful 🥳", accessToken });
});

/**
 * @desc user login
 * @route POST /api/v1/auth/login
 * @access PUBLIC
 */

// export const userLogin = asyncHandler(async (req, res) => {
//   // get data
//   const { email, password } = req.body;

//   //   validation

//   if (!email || !password)
//     return res.status(400).json({ message: "All Fields Are Required" });

//   // find login user by email

//   const loginUser = await User.findOne({ email });

//   //   user not found

//   if (!loginUser)
//     return res.status(400).json({ message: " Wrong Email Address " });

//   // password check

//   const passwordCheck = await bcrypt.compare(password, loginUser.password);

//   // password matching

//   if (!passwordCheck)
//     return res.status(400).json({ message: " Wrong Password " });

//   // create access token

//   const accessToken = jwt.sign(
//     { email: loginUser.email },
//     ACCESS_TOKEN_SECRET,
//     {
//       expiresIn: ACCESS_TOKEN_EXPIRES_IN,
//     }
//   );

//   res.cookie("accessToken", accessToken, {
//     httpOnly: true,
//     secure: process.env.APP_ENV == "Development" ? false : true,
//     sameSite: "strict",
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     path: "/",
//   });

//   res.status(200).json({
//     accessToken,
//     user: loginUser,
//     message: "User Login successful 🥳",
//   });
// });
