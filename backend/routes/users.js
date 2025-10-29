const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");
const {
  validateUserUpdateProfile,
  validateAvatarUpdate,
} = require("../middleware/validation");

const {
  getUsers,
  getUser,
  updateProfile,
  updateAvatar,
  userInfo,
} = require("../controllers/users");

router.get("/", getUsers);
router.get("/me", userInfo);

router.get("/:userId", getUser);
router.patch("/:userId", validateUserUpdateProfile, updateProfile);
router.patch("/:userId/avatar", validateAvatarUpdate, updateAvatar);

module.exports = router;
