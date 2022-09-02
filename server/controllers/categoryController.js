const Categories = require("../models/categoryModel");
const CustomErrorHandler = require("../services/CustomErrorHandler");

const categoryController = {
  async createCategory(req, res, next) {
    try {
      if (!req.user) {
        return next(CustomErrorHandler.badRequest("Invalid authentication."));
      }

      if (req.user.role !== "admin") {
        return next(CustomErrorHandler.badRequest("Invalid authentication."));
      }

      if (!req.body.name) {
        return next(CustomErrorHandler.badRequest("Please add category name."));
      }

      const categoryname = await Categories.findOne({ name: req.body.name });
      if (categoryname) {
        return next(
          CustomErrorHandler.alreadyExist("This category already exists.")
        );
      }

      const name = req.body.name.toLowerCase();

      const newCategory = new Categories({
        name,
      });

      await newCategory.save();

      return res.status(200).json({ message: "Category created!" });
    } catch (error) {
      return next(error);
    }
  },

  async getCategories(req, res, next) {
    try {
      const categories = await Categories.find().sort("-createdAt");

      res.json({ categories });
    } catch (error) {
      return next(error);
    }
  },

  async updateCategory(req, res, next) {
    try {
      if (!req.user) {
        return next(CustomErrorHandler.badRequest("Invalid authentiacation."));
      }

      if (req.user.role !== "admin") {
        return next(CustomErrorHandler.badRequest("Invalid authentication."));
      }

      await Categories.findOneAndUpdate(
        {
          _id: req.params.id,
        },
        {
          name: req.body.name.toLowerCase(),
        }
      );

      res.status(200).json({ message: "Update success!" });
    } catch (error) {
      return next(error);
    }
  },

  async deleteCategory(req, res, next) {
    try {
      if (!req.user) {
        return next(CustomErrorHandler.badRequest("Invalid authentiacation."));
      }

      if (req.user.role !== "admin") {
        return next(CustomErrorHandler.badRequest("Invalid authentication."));
      }

      const category = await Categories.findByIdAndDelete(req.params.id);

      if (!category) {
        return next(CustomErrorHandler.badRequest("Category does not exists."));
      }

      res.status(200).json({
        message: "Delete success!",
      });
    } catch (error) {
      return next(error);
    }
  },
};

module.exports = categoryController;
