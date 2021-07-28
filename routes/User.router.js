const express = require("express");
const router = express.Router();
const userController = require("../controllers/User.controller");

router.post("/api/register", userController.register);

module.exports = router;
