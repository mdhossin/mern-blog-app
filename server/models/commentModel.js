const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "user" },
    // id create korsi eta dara
    blog_id: mongoose.Types.ObjectId,
    blog_user_id: mongoose.Types.ObjectId,
    content: { type: String, required: true },
    replyCM: [{ type: mongoose.Types.ObjectId, ref: "comment" }],
    reply_user: { type: mongoose.Types.ObjectId, ref: "user" },
    comment_root: { type: mongoose.Types.ObjectId, ref: "comment" },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("comment", commentSchema);

module.exports = Comment;
