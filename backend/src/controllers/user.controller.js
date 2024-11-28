const userModel = require("../models/user.model.js");
const { Router } = require("express");
const bcrypt = require("bcrypt");

const router = new Router();

const loginController = async (req, res) => {
  const user = {
    account: req.body.account,
    password: req.body.password,
  };

  const existUser = await userModel.findAll({
    where: {
      account: user.account,
    },
  });

  // console.log("search user:", existUser[0].dataValues);

  // 檢查是否註冊過帳號;
  if (existUser.length == 0) {
    res.status(404).send(JSON.stringify("please register first"));
    return;
  }

  // 檢查密碼是否正確
  if (!bcrypt.compareSync(user.password, existUser[0].dataValues.password)) {
    res.status(401).send(JSON.stringify("password incorrect"));
    return;
  }
  console.log("user.type: ", existUser[0].is_company);
  // 建立session
  req.session.User = existUser[0].dataValues;
  req.session.isLogin = true;
  req.session.isCompany = existUser[0].is_company;

  // console.log(req.session.User);
  res.send(JSON.stringify(existUser[0].is_company));
  // res.send(req.session);
};

const logoutController = async (req, res) => {
  console.log("log out");
  if (!req.session.isLogin) {
    return res.send("login first");
  }
  // 刪除cookie
  res.clearCookie("session");
  //detroy session
  req.session.destroy((err) => {
    if (err) {
      console.error("Session destruction error:", err);
      return res.status(500).send(JSON.stringify("Failed to log out"));
    }
  });

  // console.log(req.session.User);
  res.send("log out successfully");
  // res.send(req.session);
};

const registerController = async (req, res) => {
  const registerUser = {
    displayName: req.body.displayName,
    account: req.body.account,
    password: bcrypt.hashSync(req.body.password, 10),
    is_company: req.body.is_company,
  };

  const existUser = await userModel.findAll({
    where: {
      account: registerUser.account,
    },
  });

  // 檢查account是否存在

  if (existUser.length > 0) {
    res.status(403).send(JSON.stringify("user exist"));
    return;
  }

  // 帳號存進資料庫
  try {
    await userModel.create(registerUser);
    res.send(JSON.stringify("save seccessfully"));
  } catch (error) {
    console.log("register error: ", error);
    res.send("db wrong");
    return;
  }
};

module.exports = {
  loginController: loginController,
  registerController: registerController,
  logoutController: logoutController,
};
