const User = require("../models/user.js");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const generateAccesToken = (id) => {
  const payload = {
    id,
  };
  return jwt.sign(payload, process.env.SECRET, { expiresIn: "7d" });
};

class userController {
  async registration(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Не корректный email или пароль", errors });
      }
      const { email, phone, fullName, password } = req.body;
      const findCandidate = await User.findOne({ email });
      if (findCandidate) {
        return res.status(400).json({ message: "Этот email уже занят" });
      }
      const hashPassword = bcrypt.hashSync(password, 7);
      const user = new User({
        email,
        phone,
        fullName,
        password: hashPassword,
      });
      await user.save();
      return res.json({ message: "Пользоветль успешно зарегистрирован" });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Registration error" });
    }
  }

  async authorization(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res
          .status(400)
          .json({ message: "Неправильний логин или пароль", errors });
      }
      const { email } = req.body;
      const user = await User.findOne({ email });
      if (user === null) {
        return res
          .status(404)
          .json({ message: "Такого пользователя не существует" });
      }
      const validPassword = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!validPassword) {
        res.status(400).json({ message: "Неверный пароль" });
      }
      const token = generateAccesToken(user._id);
      return res.json({ token, user });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: "Authorization error" });
    }
  }

  async isUserAuth(req, res) {
    try {
      const user = await User.findOne({ _id: req.userId });
      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }
      const { password, ...userData } = user._doc;
      return res.json(user);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: " Пользователь не найден" });
    }
  }
}

module.exports = new userController();
