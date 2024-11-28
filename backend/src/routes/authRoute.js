const { Router } = require("express");
const loginAuth = require("../utilities/loginAuth");

const router = Router();

// read
router.get("/loginAuth", loginAuth);

module.exports = router;
