const express = require("express");
const authController = require("../controllers/authController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/register", authController.register);

// verify and active account route
router.post("/active", authController.activeAccount);

// login route
router.post("/login", authController.login);

// logout
router.get("/logout", auth, authController.logout);

// refresh token
router.get("/refresh_token", authController.refreshToken);

// google login route
router.post("/google_login", authController.googleLogin);

router.post("/facebook_login", authController.facebookLogin);

// forgot password route

router.post("/user/forgot_password", authController.forgotPassword);

module.exports = router;
