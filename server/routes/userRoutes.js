import express from "express";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import sendVerificatiomEmail from "../middleware/sendVerificatiomEmail.js";

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
const register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400).send("User already exists");
  }
  const user = await User.create({
    name,
    email,
    password,
  });
  const newToken = generateToken(user._id);
  sendVerificatiomEmail(newToken, email, name, user._id);
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      googleImage: user.googleImage,
      googleId: user.googleId,
      isAdmin: user.isAdmin,
      token: newToken,
      active: user.active,
      firstLogin: user.firstLogin,
      createdAt: user.createdAt,
    });
  } else {
    res.status(400).send("We Could not register your account");
    throw new Error("Invalid user data");
  }
});

// * verificationEmail

const verifyEmail = asyncHandler(async (req, res) => {
  const tokem = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(tokem, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user) {
      user.active = true;
      await user.save();
      res.json("Email Verified");
      res.status(200).send("Email Verified");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(401).send("Email not verified");
  }
});

// * passwordReset Request

// * password reset

userRoutes.route("/login").post(loginUser);
userRoutes.route("/register").post(register);
userRoutes.route("/email-verify").get(verifyEmail);

export default userRoutes;
