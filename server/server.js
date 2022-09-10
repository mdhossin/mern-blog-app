require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const path = require("path");
const errorHandler = require("./middlewares/errorHandler");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const blogRoutes = require("./routes/blogRoutes");
const commentRoutes = require("./routes/commentRoutes");
const app = express();

// Database connection
connectDB();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(
  fileUpload({
    useTempFiles: true,
  })
);

// routes
app.use("/api", authRoutes);
// routes
app.use("/api", userRoutes);

// upload routes
app.use("/api", uploadRoutes);

// category routes
app.use("/api", categoryRoutes);
// blog routes
app.use("/api", blogRoutes);

// comment routes
app.use("/api", commentRoutes);

// error handler middleware
app.use(errorHandler);

// delpoy code

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
