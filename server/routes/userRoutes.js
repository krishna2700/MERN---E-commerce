import express from "express";
import User from "../models/user.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import sendVerificatiomEmail from "../middleware/sendVerificatiomEmail.js";
import sendPasswardResetEmail from "../middleware/sendPasswardResetEmail.js";

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
  sendVerificatiomEmail(newToken, email, name);
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

const passwordResetRequest = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const newToken = generateToken(user._id);
      sendPasswardResetEmail(newToken, user.email, user.name);
      res.status(200).send(`We have sent a recovery email to ${email}`);
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res
      .status(400)
      .send(` There is no account with such email address ${err.message}`);
  }
});

// * password reset

const passwordReset = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const tokem = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(tokem, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (user) {
      user.password = password;
      await user.save();
      res.status(200).send("Password reset success");
    } else {
      res.status(404).send("User not found");
    }
  } catch (err) {
    res.status(401).send("Password reset failed");
  }
});

// * Google Login

const googleLogin = asyncHandler(async (req, res) => {
  const { googleId, email, name, googleImage } = req.body;
  console.log(googleId, email, name, googleImage);

  try {
    const user = await User.findOne({ googleId: googleId });
    if (user) {
      user.firstLogin = false;
      await user.save();
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        googleImage: user.googleImage,
        googleId: user.googleId,
        firstLogin: user.firstLogin,
        isAdmin: user.isAdmin,
        token: genToken(user._id),
        active: user.active,
        createdAt: user.createdAt,
      });
    } else {
      const newUser = await User.create({
        name,
        email,
        googleImage,
        googleId,
      });

      const newToken = genToken(newUser._id);

      sendVerificatiomEmail(newToken, newUser.email, newUser.name, newUser._id);
      res.json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        googleImage: newUser.googleImage,
        googleId: newUser.googleId,
        firstLogin: newUser.firstLogin,
        isAdmin: newUser.isAdmin,
        token: genToken(newUser._id),
        active: newUser.active,
        createdAt: newUser.createdAt,
      });
    }
  } catch (error) {
    res.status(404).send("Something went wrong, please try again later.");
  }
});

userRoutes.route("/login").post(loginUser);
userRoutes.route("/register").post(register);
userRoutes.route("/email-verify").get(verifyEmail);
userRoutes.route("/password-reset-request").post(passwordResetRequest);
userRoutes.route("/password-reset").put(passwordReset);
userRoutes.route("/google-login").post(googleLogin);

export default userRoutes;
