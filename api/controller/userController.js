import User from "../models/User.js";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
// import { sendMail } from "../utils/sendMail.js";
import SellerCustomerChat from "../models/SellerCustomerChat.js";

/**
 * @desc get all users data
 * @route GET /users
 * @access PUBLIC
 */

const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password").populate("role");

  if (users.length > 0) {
    res.status(200).json(users);
  }
});

/**
 * @desc get Single users data
 * @route GET /users/:id
 * @access PUBLIC
 */
const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password").lean();

  if (!user) {
    return res.status(400).json({ message: "No user found" });
  }

  res.json(user);
});

/**
 * @desc create new user
 * @route POST /users
 * @access PUBLIC
 */

const createUser = asyncHandler(async (req, res) => {
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

  // create new user data
  const user = await User.create({
    firstName,
    lastName,
    email,
    password: hash,
    role,
    gender,
    method: "manually",
    shopInfo: {},
  });

  // confirm create user

  const successUser = await User.findById(user.id).populate("role");

  // chatting option
  const chattingOption = await SellerCustomerChat.create({
    myId: seller._id,
    chatType: "seller",
  });

  // send user access to email

  // sendMail({
  //   name,
  //   to: email,
  //   sub: "Account Access Info",
  //   msg: ` Your Account Login Access Is email: ${email} & password: ${password}`,
  // });

  // check
  if (user) {
    return res.status(201).json({
      message: `User ${firstName} ${lastName} successfully created`,
      user: successUser,
    });
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

/**
 * @desc delete user data
 * @route DELETE /users/:id
 * @access PUBLIC
 */
const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(400).json({ message: "User delete failed" });
  }

  res.status(200).json({ message: "User Delete Successful", user });
});

/**
 * @desc update user data
 * @route PATCH /users/:id
 * @access PUBLIC
 */

const updateUser = asyncHandler(async (req, res) => {
  // const { id } = req.params;

  // const { name, email, password, role } = req.body;

  // // validation
  // if (!name || !email || !password || !role) {
  //   return res.status(400).json({ message: "All fields are required" });
  // }

  // const user = await User.findById(id).exec();

  // if (!user) {
  //   return res.status(400).json({ message: "User not found" });
  // }

  // user.name = name;
  // user.email = email;
  // user.password = await bcrypt.hash(password, 10);
  // user.role = role;

  // const updateUserData = await user.save();

  const { id } = req.params;

  const { firstName, lastName, email, mobile, password, gender } = req.body;

  if (!firstName || !lastName || !email || !mobile || !password || !gender) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const user = await User.findByIdAndUpdate(
    id,
    {
      firstName,
      stName,
      email,
      mobile,
      password,
      gender,
    },
    { new: true }
  );

  // res.json({ message: `User updated successful`, user: updateUserData });
  res.json({ message: `User updated successful`, user: user });
});

/**
 * @desc update User Status
 * @route PATCH /user/status/:id
 * @access PUBLIC
 */

const updateUserStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const updateUserStatus = await User.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    {
      new: true,
    }
  );

  res.json({
    message: `User Status Updated Successful`,
    user: updateUserStatus,
  });
});

// export methods
export {
  getAllUser,
  createUser,
  getSingleUser,
  deleteUser,
  updateUser,
  updateUserStatus,
};
