const CustomErrorHandler = require("../services/CustomErrorHandler");

// error handeling middleware
const errorHandler = (err, req, res, next) => {
  let statusCode = 500;

  let data = {
    ...err,
    message: "Internal server error",
    ...(process.env.DEBUG_MODE === "true" && { originalError: err.message }),
  };

  if (err.code === 11000) {
    statusCode = 400;
    data = {
      message: err.message,
    };
  }

  //  from custom err handeler
  if (err instanceof CustomErrorHandler) {
    statusCode = err.status;
    data = {
      message: err.message,
    };
  }

  return res.status(statusCode).json(data);
};

module.exports = errorHandler;
