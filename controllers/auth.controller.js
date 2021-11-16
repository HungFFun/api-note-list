const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const config = require("../config/auth.config.js");
const User = require("../models/User.model");

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const newUser = new user({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 8),
    });
    newUser
      .save()
      .then((value) => {
        res.status(200).send(value);
      })
      .catch((error) => {
        res.status(500).send(error);
      });
  } catch (error) {
    res.status(400).send(error);
  }
};

const signIn = (req, res) => {
  try {
    User.findOne({
      email: req.body.email,
    }).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        accessToken: token,
      });
    });
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = {
  signIn,
  register,
};
