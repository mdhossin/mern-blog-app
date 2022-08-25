const CustomErrorHandler = require("../services/CustomErrorHandler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { generateActiveToken } = require("../config/generateToken");
const { OAuth2Client } = require("google-auth-library");
const { validateEmail, validPhone } = require("../utils/validation");
const sendEmail = require("../config/sendMail");
const jwt = require("jsonwebtoken");

// const client = new OAuth2Client(`${process.env.MAIL_CLIENT_ID}`);
// const CLIENT_URL = `${process.env.BASE_URL}`;
const CLIENT_URL = `http://localhost:3000`;
// const CLIENT_URL = `https://mern-quickshop-app-ecommerce.herokuapp.com`;

const authController = {
  async register(req, res, next) {
    try {
      const { name, account, password } = req.body;

      if (!name) {
        return next(CustomErrorHandler.badRequest("Please add your name"));
      }
      if (!account) {
        return next(
          CustomErrorHandler.badRequest("Please add your email or phone")
        );
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
      const user = await User.findOne({ account });
      if (user) {
        return next(
          CustomErrorHandler.alreadyExist(
            "Email or Phone number already exists."
          )
        );
      }

      // hash password
      const passwordHash = await bcrypt.hash(password, 12);

      const newUser = { name, account, password: passwordHash };

      const active_token = generateActiveToken({ newUser });

      const url = `${CLIENT_URL}/active/${active_token}`;

      if (!validateEmail(account)) {
        return next(CustomErrorHandler.badRequest("Please enter valid email"));
      }

      if (validateEmail(account)) {
        sendEmail(account, url, "Verify your email address");
        return res.json({ message: "Success! Please check your email." });
      }
      // else if (validPhone(account)) {
      //   sendSms(account, url, "Verify your phone number");
      //   return res.json({ message: "Success! Please check phone." });
      // }
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

      const user = await User.findOne({ account: newUser.account });
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
      const { account, password } = req.body;

      const user = await User.findOne({ account });
      if (!user)
        return res.status(400).json({ msg: "This account does not exits." });

      // if user exists
      loginUser(user, password, res);
    } catch (err) {
      return next(err);
    }
  },
};

module.exports = authController;
