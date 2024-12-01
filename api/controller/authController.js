import expressAsyncHandler from "express-async-handler";

/**
 * @desc Admin login
 * @route POST /api/v1/auth/adminLogin
 * @access PRIVATE
 */
export const adminLogin = expressAsyncHandler(async (req, res) => {
  // get data
  //   const { email, password } = req.body;
  //   validation
  //   if (!email || !password)
  //     return res.status(400).json({ message: "All Fields Are Required" });
  // find login user by email
  //   const loginUser = await User.findOne({ email }).populate("role");
  //   user not found
  //   if (!loginUser)
  //     return res.status(400).json({ message: " Wrong Email Address " });
  // password check
  //   const passwordCheck = await bcrypt.compare(password, loginUser.password);
  // password matching
  //   if (!passwordCheck)
  //     return res.status(400).json({ message: " Wrong Password " });
  // create access token
  //   const accessToken = jwt.sign(
  //     { email: loginUser.email },
  //     process.env.ACCESS_TOKEN_SECRET,
  //     {
  //       expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN,
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
  //     // accessToken,
  //     // refreshToken,
  //     user: loginUser,
  //     message: "User Login successful 🥳",
  //   });

  console.log("admin login");
  console.log(req.body);
});
