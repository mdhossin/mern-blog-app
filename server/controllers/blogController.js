const Blog = require("../models/blogModel");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const mongoose = require("mongoose");
const Pagination = (req) => {
  let page = Number(req.query.page) * 1 || 1;
  let limit = Number(req.query.limit) * 1 || 4;
  let skip = (page - 1) * limit;

  return { page, limit, skip };
};

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

  async getBlogsByCategory(req, res, next) {
    console.log(req.params.id);
    const { limit, skip } = Pagination(req);

    try {
      const Data = await Blog.aggregate([
        {
          $facet: {
            totalData: [
              {
                $match: {
                  category: mongoose.Types.ObjectId(req.params.id),
                },
              },
              // User
              {
                $lookup: {
                  from: "users",
                  let: { user_id: "$user" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                    { $project: { password: 0 } },
                  ],
                  as: "user",
                },
              },
              // array -> object
              { $unwind: "$user" },
              // Sorting
              { $sort: { createdAt: -1 } },
              { $skip: skip },
              { $limit: limit },
            ],

            totalCount: [
              {
                $match: {
                  category: mongoose.Types.ObjectId(req.params.id),
                },
              },
              { $count: "count" },
            ],
          },
        },
        {
          $project: {
            count: { $arrayElemAt: ["$totalCount.count", 0] },
            totalData: 1,
          },
        },
      ]);

      const blogs = Data[0].totalData;
      const count = Data[0].count;

      // Pagination
      let total = 0;

      if (count % limit === 0) {
        total = count / limit;
      } else {
        total = Math.floor(count / limit) + 1;
      }

      res.json({ blogs, total });
    } catch (error) {
      return next(error);
    }
  },

  async getBlogsByUser(req, res, next) {
    const { limit, skip } = Pagination(req);

    try {
      const Data = await Blog.aggregate([
        {
          $facet: {
            totalData: [
              {
                $match: {
                  user: mongoose.Types.ObjectId(req.params.id),
                },
              },
              // User
              {
                $lookup: {
                  from: "users",
                  let: { user_id: "$user" },
                  pipeline: [
                    { $match: { $expr: { $eq: ["$_id", "$$user_id"] } } },
                    { $project: { password: 0 } },
                  ],
                  as: "user",
                },
              },
              // array -> object
              { $unwind: "$user" },
              // Sorting
              { $sort: { createdAt: -1 } },
              { $skip: skip },
              { $limit: limit },
            ],
            totalCount: [
              {
                $match: {
                  user: mongoose.Types.ObjectId(req.params.id),
                },
              },
              { $count: "count" },
            ],
          },
        },
        {
          $project: {
            count: { $arrayElemAt: ["$totalCount.count", 0] },
            totalData: 1,
          },
        },
      ]);

      const blogs = Data[0].totalData;
      const count = Data[0].count;

      // Pagination
      let total = 0;

      if (count % limit === 0) {
        total = count / limit;
      } else {
        total = Math.floor(count / limit) + 1;
      }

      res.json({ blogs, total });
    } catch (error) {
      return mext(error);
    }
  },
  async getBlog(req, res, next) {
    try {
      const blog = await Blog.findOne({ _id: req.params.id }).populate(
        "user",
        "-password"
      );

      if (!blog) {
        return next(CustomErrorHandler.badRequest("Blog does not exist."));
      }

      return res.status(200).json(blog);
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = blogController;
