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
 * @desc Admin Seller login
 * @route POST /api/v1/auth/userLogin
 * @access PRIVATE
 */

export const adminSellerLogin = asyncHandler(async (req, res) => {
  // get body data

  const { email, password } = req.body;

  // is empty

  if (!email || !password)
    return res.status(400).json({ message: "all fields are required" });

  // Find admin by email
  const user = await User.findOne({ email }).populate("role");

  // check if admin not found

  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  // Check role and respond appropriately
  if (
    !user.role ||
    (user.role.name !== "Admin" && user.role.name !== "Seller")
  ) {
    return res.status(400).json({ message: "Invalid role" });
  }

  // password check

  if (!user.password) {
    console.error("Admin password is undefined!");
    return res.status(500).json({ message: "Password is not set" });
  }

  const passwordCheck = await bcrypt.compare(password, user.password);

  // password matching

  if (!passwordCheck)
    return res.status(400).json({ message: " Wrong Password " });

  // Role-specific messages
  if (user.role.name === "Admin") {
    console.log("Admin is logging in...");
  } else if (user.role.name === "Seller") {
    console.log("Seller is logging in...");
  } else {
    return res.status(400).json({ message: "Unauthorized access" });
  }

  // create access token

  const accessToken = jwt.sign(
    { email: user.email, role: user.role.name },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    }
  );

  // set cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: APP_ENV == "Development" ? false : true,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  //response
  res.status(200).json({
    user: user,
    message: `Login Successful as ${user.role.name} 🥳`,
    accessToken,
  });
});

/**
 * @desc user loggedIn
 * @route GET /api/v1/auth/me
 * @access PUBLIC
 */
export const loggedInUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.me);
});

/**
 * @desc user logOut
 * @route POST /api/v1/auth/logOut
 * @access PUBLIC
 */

export const userLogOut = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logout successful 🥳" });
});

/**
 * @desc user registration
 * @route POST /api/v1/auth/register
 * @access PUBLIC
 */

export const userRegistration = asyncHandler(async (req, res) => {
  // get data
  const { firstName, lastName, email, password, role, gender } = req.body;

  // check validation
  if (!firstName || !lastName || !password || !email) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // email existence
  const emailCheck = await User.findOne({ email });

  if (emailCheck) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // hash password
  const hash = await bcrypt.hash(password, 10);

  //create new user
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    password: hash,
    role,
    gender,
    method: "manually",
    shopInfo: {},
  });

  // response
  res
    .status(201)
    .json({ user: newUser, message: "User Registration successfully" });
});
