const user = require("../models/User.model");

const register = async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new user({
      name: name,
      email: email,
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

module.exports = {
  register,
};
