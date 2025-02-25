import express from "express";

import {
  forgotPassword,
  login,
  logoutUser,
  resetpassword,
  signup,
  verifyEmail,
} from "../controllers/AuthController.js";
import {
  forgotPasswordValidation,
  loginValidation,
  restPasswordValidation,
  signupValidation,
  verifyToken,
} from "../validations/AuthValidation.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("auth route working");
});

router.post("/signup", signupValidation(), signup);
router.post("/login", loginValidation(), login);
router.post("/verifyEmail/:token", verifyEmail);
router.post("/forgotPassword", forgotPasswordValidation(), forgotPassword);
router.post("/resetPassword", restPasswordValidation(), resetpassword);
router.post("/verifyToken", verifyToken);
router.post("/logoutUser", logoutUser);

export const authRouter = router;
