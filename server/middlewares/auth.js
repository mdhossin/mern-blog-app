const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const CustomErrorHandler = require("../services/CustomErrorHandler");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");

    if (!token) {
      return next(CustomErrorHandler.unAuthorized());
    }

    const decoded = jwt.verify(token, `${process.env.ACCESS_TOKEN_SECRET}`);
    if (!decoded) {
      return next(CustomErrorHandler.unAuthorized());
    }

    const user = await User.findOne({ _id: decoded.id }).select("-password");

    if (!user) {
      return next(CustomErrorHandler.badRequest("User does not exist."));
    }

    req.user = user;

    next();
  } catch (err) {
    return next(err);
  }
};

module.exports = auth;
