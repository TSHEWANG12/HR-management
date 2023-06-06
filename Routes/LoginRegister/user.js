const express = require("express");
const {
  postRegister,
  getRegister,
  postLogin,
  getLogin,
  getVerifyToken,
  postForgotPassword,
  getForgotPassword,
  postResetToken,
  getResetToken,
} = require("../../Controllers/LoginRegister/user-auth");
const { isNotLoggedIn} = require("../../Middlewares/user-auth");
const router = express.Router();

router.post("/register", postRegister);

router.post("/register", isNotLoggedIn, postRegister);
router.get("/register", isNotLoggedIn, getRegister);
router.post("/", isNotLoggedIn, postLogin);
router.get("/", isNotLoggedIn, getLogin);
router.get("/verify-email/:token", getVerifyToken);
router.post("/forgot-password", isNotLoggedIn, postForgotPassword);
router.get("/forgot-password", isNotLoggedIn, getForgotPassword);
router.post("/reset-password/:token", isNotLoggedIn, postResetToken);
router.get("/reset-password/:token", isNotLoggedIn, getResetToken);

module.exports = router;
