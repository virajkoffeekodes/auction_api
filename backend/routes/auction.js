const express = require("express");
const router = express.Router();
const { auction, getAuction } = require("../controllar/auction/auction");

router.route("/auction").post(auction);
router.route("/getAuction").get(getAuction);

module.exports = router;
