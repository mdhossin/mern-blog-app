const User = require("../models/userModel");
const CustomErrorHandler = require("../services/CustomErrorHandler");
const bcrypt = require("bcrypt");

const userController = {
  // reset password
  async resetPassword(req, res, next) {
    if (!req.user)
      return res.status(400).json({ message: "Invalid Authentication." });

    if (req.user.type !== "register")
      return res.status(400).json({
        message: `Quick login account with ${req.user.type} can't use this function.`,
      });
    try {
      console.log(req.body);
      const { password, confirmPassword } = req.body;

      if (password < 6) {
        return next(
          CustomErrorHandler.badRequest(
            "Password must be at least 6 charactors long."
          )
        );
      } else if (password !== confirmPassword) {
        return next(
          CustomErrorHandler.badRequest("Confirm password did not match.")
        );
      }

      const passwordHash = await bcrypt.hash(password, 12);
      await User.findOneAndUpdate(
        {
          _id: req.user.id,
        },
        {
          password: passwordHash,
        }
      );
      res.json({ message: "Password successfully changed!" });
    } catch (err) {
      return next(err);
    }
  },
  async updateUser(req, res, next) {
    try {
      const { name, avatar } = req.body;
      await User.findOneAndUpdate(
        { _id: req.user.id },
        {
          name,
          avatar,
        },
        {
          new: true,
        }
      );
      res.json({ message: "Update Success!" });
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = userController;
