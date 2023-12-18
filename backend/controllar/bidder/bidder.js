const { PrismaClient } = require("@prisma/client");
// const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
var express = require("express");

var app = express();
const fs = require("fs");
const path = require("path");
const { stringify } = require("querystring");

//detail of product after bid
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
  } catch (error) {
    resp.json(error);
  }
};

// finding the highest bidder
exports.highestbidder = async (req, resp, next) => {
  const { productId } = req.params.id;

  try {
    let result = await prisma.bidder.findMany({
      where: {
        productId,
      },
    });
    // resp.json(results);

    if (result && result.length > 0) {
      // Extract an array of bidding prices
      const biddingPrices = result.map((item) => item.biddingPrice);

      // Find the highest bidding price using reduce
      const highestBid = biddingPrices.reduce(
        (max, price) => (price > max ? price : max),
        biddingPrices[0]
      );

      // resp.json({ highestBid: highestBid });
      let userid = await prisma.bidder.findFirst({
        where: {
          biddingPrice: highestBid,
        },
      });
      // resp.json({ userid });
      if (userid) {
        const userId = userid.userId;
        let info = await prisma.user.findFirst({
          where: {
            id: userId,
          },
        });
        resp.json(info);
      }
    } else {
      resp.json({ message: "No results found" });
    }
  } catch (error) {
    console.log(error);
    resp.json(error);
  }
};

//get all user for a product
exports.allbidder = async (req, resp, next) => {
  try {
    let results = await prisma.bidder.findMany({
      where: {
        productId: 50,
      },
    });

    if (results.length > 0) {
      const uniqueUserIds = [...new Set(results.map((item) => item.userId))];

      console.log(uniqueUserIds);

      let users = [];

      for (const userId of uniqueUserIds) {
        const user = await prisma.user.findUnique({
          where: {
            id: userId,
          },
        });

        if (user) {
          users.push(user);
        }
      }

      console.log(users);
      resp.json(users);
    } else {
      resp.json({ message: "No results found" });
    }
  } catch (error) {
    console.log(error);
    resp.json(error);
  }
};
