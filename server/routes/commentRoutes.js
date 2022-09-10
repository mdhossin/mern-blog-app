const express = require("express");
const commentController = require("../controllers/commentController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/comment", auth, commentController.createComment);

router.get("/comments/blog/:id", commentController.getComments);

// router.post("/reply_comment", auth, commentCtrl.replyComment);

// router.patch("/comment/:id", auth, commentCtrl.updateComment);

// router.delete("/comment/:id", auth, commentCtrl.deleteComment);

module.exports = router;
