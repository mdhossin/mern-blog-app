const Blog = require("../models/blogModel");
const CustomErrorHandler = require("../services/CustomErrorHandler");

const blogController = {
  async createBlog(req, res, next) {
    const { title, content, description, thumbnail, category } = req.body;
    try {
      if (!req.user) {
        return next(CustomErrorHandler.badRequest("Invalid authentication."));
      }

      if (title?.trim().length < 10) {
        return next(
          CustomErrorHandler.badRequest("Title has at least 10 characters.")
        );
      } else if (title?.trim().length > 50) {
        return next(
          CustomErrorHandler.badRequest("Title is up to 50 characters long.")
        );
      }

      if (content?.trim().length < 2000) {
        return next(
          CustomErrorHandler.badRequest("Content has at least 2000 characters.")
        );
      }

      if (description?.trim().length < 50) {
        return next(
          CustomErrorHandler.badRequest(
            "Description has at least 50 characters."
          )
        );
      } else if (description?.trim().length > 200) {
        return next(
          CustomErrorHandler.badRequest(
            "Description is up to 200 characters long."
          )
        );
      }

      if (!thumbnail) {
        return next(
          CustomErrorHandler.badRequest("Thumbnail cannot be left blank.")
        );
      }

      if (!category) {
        return next(
          CustomErrorHandler.badRequest("Category cannot be left blank.")
        );
      }

      try {
        const newBlog = new Blog({
          user: req.user._id,
          title: title.toLowerCase(),
          content,
          description,
          thumbnail,
          category,
        });

        await newBlog.save();

        res.status(200).json({
          ...newBlog._doc,
          user: req.user,
        });
      } catch (error) {
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = blogController;
