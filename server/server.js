require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Database connection
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// routes
app.use("/api", authRoutes);

// error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
