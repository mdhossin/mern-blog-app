const express = require("express");
const authController = require("../controllers/authController");
const router = express.Router();

router.post("/register", authController.register);

// verify and active account route
router.post("/active", authController.activeAccount);

// login route
router.post("/login", authController.login);

module.exports = router;
