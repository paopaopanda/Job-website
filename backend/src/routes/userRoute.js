const { Router } = require("express");
const userModel = require("../models/user.model.js");
const {
  loginController,
  registerController,
  logoutController,
} = require("../controllers/user.controller.js");

const router = Router();

router.post("/login", loginController);

router.post("/register", registerController);

router.post("/logout", logoutController);

module.exports = router;
