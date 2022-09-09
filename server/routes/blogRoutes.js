const express = require("express");
const blogController = require("../controllers/blogController");
const auth = require("../middlewares/auth");

const router = express.Router();

router.post("/blog", auth, blogController.createBlog);

router.get("/home/blogs", blogController.getHomeBlogs);

router.get("/blogs/category/:id", blogController.getBlogsByCategory);

router.get("/blogs/user/:id", blogController.getBlogsByUser);

// router.route('/blog/:id')
//   .get(blogCtrl.getBlog)
//   .put(auth, blogCtrl.updateBlog)
//   .delete(auth, blogCtrl.deleteBlog)

// router.get('/search/blogs', blogCtrl.searchBlogs)

module.exports = router;
