import express from "express";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";

const userRoutes = express.Router();

// TODO: redifine expiresIn
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "60d",
  });
};

// * login

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await user.matchPassword(password))) {
    user.firstLogin;
    await user.save();
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      googleImage: user.googleImage,
      googleId: user.googleId,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      active: user.active,
      firstLogin: user.firstLogin,
      createdAt: user.createdAt,
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// * register

// * verificationEmail

// * passwordReset Request

// * password reset

userRoutes.route("/login").post(loginUser);

export default userRoutes;
