const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

router.post("/api/register", authController.register);
router.post("/api/login", authController.signIn);

module.exports = router;
