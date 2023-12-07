const express = require("express");
const router = express.Router();

const { signup, login, logout, userlist, profile } = require("../user/sign");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/userList").get(userlist);
router.route("/profile/find/:id").get(profile);
module.exports = router;
