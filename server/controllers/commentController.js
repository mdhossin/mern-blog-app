const Comment = require("../models/commentModel");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const mongoose = require("mongoose");
const Pagination = (req) => {
  let page = Number(req.query.page) * 1 || 1;
  let limit = Number(req.query.limit) * 1 || 4;
  let skip = (page - 1) * limit;

  return { page, limit, skip };
};

const commentController = {
  async createComment(req, res, next) {
    if (!req.user)
      return next(CustomErrorHandler.badRequest("invalid Authentication."));

    try {
      const { content, blog_id, blog_user_id } = req.body;

      if (!content) {
        return next(CustomErrorHandler.badRequest("Please add content."));
      }

      const newComment = new Comment({
        user: req.user._id,
        content,
        blog_id,
        blog_user_id,
      });

      await newComment.save();

      return res.status(200).json(newComment);
    } catch (error) {
      return next(error);
    }
  },

  async getComments(req, res, next) {
    const { limit, skip } = Pagination(req);

    try {
      const data = await Comment.aggregate([
        {
          $facet: {
            totalData: [
              {
                $match: {
                  blog_id: mongoose.Types.ObjectId(req.params.id),
                },
              },
              {
                $lookup: {
                  from: "users",
                  localField: "user",
                  foreignField: "_id",
                  as: "user",
                },
              },
              { $unwind: "$user" },
              { $sort: { createdAt: -1 } },
              { $skip: skip },
              { $limit: limit },
            ],
            totalCount: [
              {
                $match: {
                  blog_id: mongoose.Types.ObjectId(req.params.id),
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

      const comments = data[0].totalData;
      const count = data[0].count;

      let total = 0;

      if (count % limit === 0) {
        total = count / limit;
      } else {
        total = Math.floor(count / limit) + 1;
      }

      return res.status(200).json({ comments, total });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = commentController;
