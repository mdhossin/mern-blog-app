const CustomErrorHandler = require("../services/CustomErrorHandler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const {
  generateActiveToken,
  generateAccessToken,
  generateRefreshToken,
} = require("../config/generateToken");
const { OAuth2Client } = require("google-auth-library");

const sendEmail = require("../config/sendMail");
const jwt = require("jsonwebtoken");

const { validateEmail } = require("../utils/validation");

const client = new OAuth2Client(`${process.env.MAIL_CLIENT_ID}`);
// const CLIENT_URL = `${process.env.BASE_URL}`;
const CLIENT_URL = `http://localhost:3000`;
// const CLIENT_URL = `https://mern-quickshop-app-ecommerce.herokuapp.com`;

const authController = {
  async register(req, res, next) {
    try {
      const { name, email, password } = req.body;

      if (!name) {
        return next(CustomErrorHandler.badRequest("Please add your name"));
      }
      if (name.length > 20) {
        return next(
          CustomErrorHandler.badRequest("Your name is up to 20 chars long.")
        );
      }
      if (!email) {
        return next(CustomErrorHandler.badRequest("Please add your email."));
      }
      if (!password) {
        return next(CustomErrorHandler.badRequest("Please add your password."));
      }

      if (password?.length < 6) {
        return next(
          CustomErrorHandler.badRequest(
            "Password must be at least 6 charactor."
          )
        );
      }

      // here useing the user model
      const user = await User.findOne({ email });
      if (user) {
        return next(
          CustomErrorHandler.alreadyExist("This Email already exists.")
        );
      }

      // hash password
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = { name, email, password: passwordHash };

      const active_token = generateActiveToken({ newUser });

      const url = `${CLIENT_URL}/active/${active_token}`;

      if (!validateEmail(email)) {
        return next(CustomErrorHandler.badRequest("Please enter valid email."));
      }

      if (validateEmail(email)) {
        sendEmail(email, url, "Verify your email address");
        return res.json({ message: "Success! Please check your email." });
      }
    } catch (error) {
      return next(error);
    }
  },

  async activeAccount(req, res, next) {
    try {
      const { active_token } = req.body;
      const decoded = jwt.verify(
        active_token,
        `${process.env.ACTIVE_TOKEN_SECRET}`
      );
      const { newUser } = decoded;

      if (!newUser)
        return next(CustomErrorHandler.badRequest("Invalid authentication."));

      const user = await User.findOne({ email: newUser.email });
      if (user)
        return next(CustomErrorHandler.alreadyExist("Account already exists."));

      const new_user = new User(newUser);

      await new_user.save();

      res.json({ message: "Account has been activated!" });
    } catch (err) {
      return next(err);
    }
  },

  async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return next(
          CustomErrorHandler.badRequest("Please enter your email or password.")
        );
      }

      const user = await User.findOne({ email });
      if (!user)
        return next(
          CustomErrorHandler.badRequest("This account does not exits.")
        );

      // if user exists
      loginUser(user, password, res, next);
    } catch (err) {
      return next(err);
    }
  },

  async logout(req, res, next) {
    if (!req.user)
      return next(CustomErrorHandler.badRequest("Invalid Authentication."));

    try {
      res.clearCookie("refreshtoken", { path: `/api/refresh_token` });

      await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          rf_token: "",
        }
      );

      return res.json({ message: "Logged out!" });
    } catch (err) {
      return next(err);
    }
  },

  async refreshToken(req, res, next) {
    try {
      const rf_token = req.cookies.refreshtoken;

      if (!rf_token)
        return next(CustomErrorHandler.badRequest("Please login now!"));

      const decoded = jwt.verify(
        rf_token,
        `${process.env.REFRESH_TOKEN_SECRET}`
      );
      if (!decoded.id)
        return next(CustomErrorHandler.badRequest("Please login now!"));

      const user = await User.findById(decoded.id).select(
        "-password +rf_token"
      );
      if (!user)
        return next(
          CustomErrorHandler.badRequest("This email does not exist.")
        );

      if (rf_token !== user.rf_token)
        return next(CustomErrorHandler.badRequest("Please login now!"));

      const access_token = generateAccessToken({ id: user._id });
      const refresh_token = generateRefreshToken({ id: user._id }, res);

      await User.findOneAndUpdate(
        { _id: user._id },
        {
          rf_token: refresh_token,
        }
      );

      res.json({ access_token, user });
    } catch (err) {
      return next(err);
    }
  },

  // google login
  async googleLogin(req, res, next) {
    try {
      const { Authorization } = req.body.headers;
      const verify = await client.verifyIdToken({
        idToken: Authorization,
        audience: `${process.env.MAIL_CLIENT_ID}`,
      });

      const { email, email_verified, name, picture } = verify.getPayload();

      if (!email_verified)
        return res.status(500).json({ message: "Email verification failed." });

      const password = email + process.env.GOOGLE_SECRET;
      const passwordHash = await bcrypt.hash(password, 12);

      const user = await User.findOne({ email });

      console.log(user, "user");

      if (user) {
        loginUser(user, password, res, next);
      } else {
        const user = {
          name,
          email,
          password: passwordHash,
          avatar: picture,
          type: "google",
        };
        registerUser(user, res);
      }
    } catch (err) {
      return next(err);
    }
  },
};

const loginUser = async (user, password, res, next) => {
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    let errorMessage =
      user.type === "register"
        ? "Password is incorrect."
        : `Password is incorrect. This account login with ${user.type}`;

    return next(CustomErrorHandler.badRequest(errorMessage));
  }

  const access_token = generateAccessToken({ id: user._id });
  const refresh_token = generateRefreshToken({ id: user._id }, res);

  await User.findOneAndUpdate(
    { _id: user._id },
    {
      rf_token: refresh_token,
    }
  );

  res.json({
    message: "Login Success!",
    access_token,
    user: { ...user._doc, password: "" },
  });
};

const registerUser = async (user, res) => {
  const newUser = new User(user);

  const access_token = generateAccessToken({ id: newUser._id });
  const refresh_token = generateRefreshToken({ id: newUser._id }, res);

  newUser.rf_token = refresh_token;
  await newUser.save();

  res.json({
    message: "Login Success!",
    access_token,
    user: { ...newUser._doc, password: "" },
  });
};

module.exports = authController;
