const express = require("express");
const router = express.Router();
const { login, register } = require("../controllers/users");
const {
  validateUserRegistration,
  validateUserLogin,
} = require("../middleware/validation");

router.post("/signin", validateUserLogin, login);
router.post("/signup", validateUserRegistration, register);

module.exports = router;
