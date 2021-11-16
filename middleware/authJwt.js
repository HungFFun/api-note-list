const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const User = require("../models/User.model");

verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];
  console.log(req.headers["x-access-token"]);
  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};
isModerator = (req, res, next) => {
  User.findById(req.userId).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    if (user.roles === "USER") {
      next();
      return;
    } else {
      res.status(403).send({ message: "Require Moderator Role!" });
      return;
    }
  });
};
const authJwt = {
  verifyToken,
  isModerator,
};
module.exports = authJwt;
