const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middlewares/auth");
const router = express.Router();

// reset password
router.post("/user/reset", auth, userController.resetPassword);

// update user
router.put("/user/update", auth, userController.updateUser);

// get single user
router.get("/user/:id", userController.getUser);

module.exports = router;
