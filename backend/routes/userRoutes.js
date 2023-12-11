const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  logout,
  userlist,
  profile,
  bidder,
} = require("../controllar/user/sign");

router.route("/signup").post(signup);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/bidder").get(bidder);
router.route("/userList").get(userlist);
router.route("/profile/find/:id").get(profile);
module.exports = router;
