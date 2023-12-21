const express = require("express");
const router = express.Router();

const {
  bidproduct,
  highestbidder,
  allbidder,
  productbidprice,
} = require("../controllar/bidder/bidder");
const { payment } = require("../controllar/payment/Payment");

router.route("/productbid/:id").put(bidproduct);
router.route("/highestbidder/:id").get(highestbidder);
router.route("/allbidder/:id").get(allbidder);
router.route("/productbidprice/:id").get(productbidprice);
router.route("/payment").post(payment);
module.exports = router;
