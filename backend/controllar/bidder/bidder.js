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

//find the product bid price
exports.productbidprice = async (req, resp, next) => {
  const id = parseInt(req.params.id);

  let result = await prisma.bidder.findFirst({
    where: {
      productId: id,
    },
    orderBy: {
      biddingPrice: "desc",
    },
    select: {
      biddingPrice: true,
    },
  });
  console.log(
    "🚀 ~ file: bidder.js:43 ~ exports.productbidprice= ~ result:",
    result
  );
  // if (result && result.length > 0) {
  //   // Extract an array of bidding prices
  //   // const biddingPrices = result.map((item) => item.biddingPrice);

  //   // // Find the highest bidding price using reduce
  //   // const highestBid = biddingPrices.reduce(
  //   //   (max, price) => (price > max ? price : max),
  //   //   biddingPrices[0]
  //   // );
  //   // if (highestBid) {
  //   //   resp.json({ st: "true", msg: "highest bid ", highestBid });
  //   // } else {
  //   //   resp.json({ st: "false", msg: " no highest bid found", highestBid: {} });
  //   // }
  // }
};

//get all user for a product
exports.allbidder = async (req, resp, next) => {
  const id = parseInt(req.params.id);
  // console.log("hello", id);
  try {
    let product = await prisma.product.findFirst({
      where: {
        id,
      },
    });

    let results = await prisma.bidder.findMany({
      where: {
        productId: product.id,
      },
      // select: {
      //   userId: true,
      //   biddingPrice: true,
      // },
    });
    console.log(
      "🚀 ~ file: bidder.js:127 ~ exports.allbidder= ~ results:",
      results
    );
    results.sort((a, b) => a.biddingPrice - b.biddingPrice);
    const reversed = [...results].reverse();
    const data = await Promise.all(
      results.map(async (bidder) => {
        let all = await prisma.user.findFirst({
          where: {
            id: bidder.userId,
          },
        });
        return {
          ...bidder,
          all,
        };
      })
    );
    const reversedResults = [...data].reverse();

    // console.log(" all:", data);
    resp.json(reversedResults);
    // if (results.length > 0) {
    //   // const uniqueUserIds = [...new Set(results.map((item) => item.userId))];
    //   // console.log(
    //   //   "🚀 ~ file: bidder.js:97 ~ exports.allbidder= ~ uniqueUserIds:",
    //   //   uniqueUserIds
    //   // );

    //   // let users = [];

    //   // for (const userId of uniqueUserIds) {
    //   //   const user = await prisma.user.findUnique({
    //   //     where: {
    //   //       id: userId,
    //   //     },
    //   //     select: {
    //   //       firstname: true,
    //   //       lastname: true,
    //   //     },
    //   //   });

    //   //   if (user) {
    //   //     users.push(user);
    //   //   }
    //   // }

    //   // console.log(
    //   //   "🚀 ~ file: bidder.js:121 ~ exports.allbidder= ~ reversedUsers:",
    //   //   reversedUsers
    //   // );
    //   // const reversedResults = [...results].reverse();

    //   // // Combine reversed arrays into a single array with reversed mapping
    //   // const combinedArrayReversed = reversedUsers.map((user, index) => ({
    //   //   user,
    //   //   biddingPrice: reversedResults[index].biddingPrice,
    //   // }));

    // } else {
    //   resp.json({ message: "No results found" });
    // }
  } catch (error) {
    console.log(error);
    resp.json(error);
  }
};

//finding the highest bidder
exports.highestbidder = async (req, resp, next) => {
  const product = parseInt(req.params.id);

  try {
    let result = await prisma.bidder.findMany({
      where: {
        productId: product,
      },
    });
    // console.log(" result:", result);
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
      // console.log(
      //   "🚀 ~ file: bidder.js:58 ~ exports.highestbidder= ~ userid:",
      //   userid
      // );
      // resp.json({ userid });
      if (userid) {
        const userId = userid.userId;
        let info = await prisma.user.findFirst({
          where: {
            id: userId,
          },
        });
        resp.json(info);
        // console.log(
        //   "🚀 ~ file: bidder.js:67 ~ exports.highestbidder= ~ info:",
        //   info
        // );
      }
    } else {
      resp.json({ message: "No results found" });
    }
  } catch (error) {
    console.log(error);
    resp.json(error);
  }
};

//sending the mail to highest bidder
exports.email = async (req, resp, next) => {
  let productid = await prisma.product.findMany();

  if (productid && productid.length > 0) {
    const completed = productid.filter((item) => item.isCompleted);

    if (true) {
      const completedid = completed.map((item) => item.id);
      let result = await prisma.bidder.findMany({
        where: {
          productId: {
            in: completedid, // Assuming completedid is an array of IDs
          },
        },
      });
      const productbids = result.map((item) => item.productId);

      for (let id in productbids) {
        console.log(productbids[id]);
      }
    } else {
      console.log("error");
    }
  } else {
    resp.json({ message: "No results found" });
  }
};

// finding the highest bidder

// exports.highestbidder = async (req, resp, next) => {
//   try {
//     const { name } = req.body;
//     let findname = await prisma.product.findFirst({
//       where: {
//         name,
//       },
//     });

//     let result = await prisma.bidder.findMany({
//       where: {
//         productId: findname.id,
//       },
//     });
//     console.log(" result:", result);
//     // resp.json(results);

//     if (result && result.length > 0) {
//       const biddingPrices = result.map((item) => item.biddingPrice);

//       const highestBid = biddingPrices.reduce(
//         (max, price) => (price > max ? price : max),
//         biddingPrices[0]
//       );

//       // resp.json({ highestBid: highestBid });
//       let userid = await prisma.bidder.findFirst({
//         where: {
//           biddingPrice: highestBid,
//         },
//       });
//       // console.log(
//       //   "🚀 ~ file: bidder.js:58 ~ exports.highestbidder= ~ userid:",
//       //   userid
//       // );
//       // resp.json({ userid });
//       if (userid) {
//         const userId = userid.userId;
//         let info = await prisma.user.findFirst({
//           where: {
//             id: userId,
//           },
//         });
//         resp.json(info);
//         // console.log(
//         //   "🚀 ~ file: bidder.js:67 ~ exports.highestbidder= ~ info:",
//         //   info
//         // );
//       }
//     } else {
//       resp.json({ message: "No results found" });
//     }
//   } catch (error) {
//     console.log(error);
//     resp.json(error);
//   }
// };
