const Blog = require("../models/blogModel");
const CustomErrorHandler = require("../services/CustomErrorHandler");

const blogController = {
  async createBlog(req, res, next) {
    const { title, content, description, thumbnail, category } = req.body;

    console.log(req.user, "req.user");
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
      if (!category) {
        return next(
          CustomErrorHandler.badRequest("Category cannot be left blank.")
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
          CustomErrorHandler.badRequest("Image cannot be left blank.")
        );
      }
      if (content?.trim().length < 2000) {
        return next(
          CustomErrorHandler.badRequest("Content has at least 2000 characters.")
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
          message: "Blog created!",
        });
      } catch (error) {
        return next(error);
      }
    } catch (error) {
      return next(error);
    }
  },

  async getHomeBlogs(req, res, next) {
    try {
      const blogs = await Blog.aggregate([
        // User
        // The $lookup stage adds a new array field to each input document. The new array field contains the matching documents from the "joined" collection.
        {
          $lookup: {
            // mongodb thake users collection
            from: "users",
            // $user hocce blog model thake user mane hocce mongodb er blogs collection er every blog user modddhe je user ache set user ke nicchi
            let: { user_id: "$user" },
            pipeline: [
              { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
              { $project: { password: 0 } },
            ],
            // model name
            as: "user",
          },
        },
        // array -> object mane hocche  eta first e arry dicchilo sekhane thake object e covert korsi
        { $unwind: "$user" },
        // Category
        {
          $lookup: {
            // mongodb thake categories collection
            from: "categories",
            // blog er moddhe je category feild ache seta
            localField: "category",
            foreignField: "_id",
            // model name
            as: "category",
          },
        },
        // array -> object
        { $unwind: "$category" },
        // Sorting
        { $sort: { createdAt: -1 } },
        // Group by category
        {
          $group: {
            // category id
            _id: "$category._id",
            //category name
            name: { $first: "$category.name" },
            // all blogs by category
            blogs: { $push: "$$ROOT" },
            // category count how many post have one category
            count: { $sum: 1 },
          },
        },
        // Pagination for blogs
        {
          $project: {
            // top up the $group get the all blogs and slice it for pagination
            blogs: {
              $slice: ["$blogs", 0, 4],
            },
            count: 1,
            name: 1,
          },
        },
      ]);

      res.status(200).json(blogs);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = blogController;
