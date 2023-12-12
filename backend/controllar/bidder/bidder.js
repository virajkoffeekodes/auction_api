const { PrismaClient } = require("@prisma/client");
// const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
var express = require("express");

var app = express();
const fs = require("fs");
const path = require("path");
const { stringify } = require("querystring");

exports.bidproduct = async (req, resp, next) => {
  try {
    const { bidprice, bidderId } = req.body;

    const bidder = await prisma.bidder.create({
      data: {
        userId: parseInt(bidderId),
        biddingPrice: parseInt(bidprice),
        productId: parseInt(req.params.id),
      },
    });

    resp.json(bidder);
    console.log(bidder);
  } catch (error) {
    console.error("Error updating product:", error);
    resp.status(500).json({ error: "Internal server error" });
  }
};
