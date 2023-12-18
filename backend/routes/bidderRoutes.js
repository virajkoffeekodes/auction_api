const express = require("express");
const router = express.Router();

const {
  bidproduct,
  highestbidder,
  allbidder,
} = require("../controllar/bidder/bidder");

router.route("/productbid/:id").put(bidproduct);
router.route("/highestbidder/:id").get(highestbidder);
router.route("/allbidder").get(allbidder);
module.exports = router;
