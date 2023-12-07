const { PrismaClient } = require("@prisma/client");
var express = require("express");

const prisma = new PrismaClient();

function startTimer(start_time, end_time, date) {
  const currentDate = new Date();
  const startDate = new Date(`${date}T${start_time}`);
  const endDate = new Date(`${date}T${end_time}`);

  // if (endDate < startDate) {
  //   endDate.setDate(endDate.getDate() + 1);
  // }
  let timeDifference = startDate - currentDate;

  // if (timeDifference < 0) {
  //   const tomorrowStartTime = new Date(startDate);
  //   tomorrowStartTime.setDate(startDate.getDate() + 1);
  //   timeDifference = tomorrowStartTime - currentDate;
  // }

  const timer = setTimeout(async () => {
    const duration = endDate - startDate;

    setTimeout(async () => {
      clearTimeout(timer);
      const result = await prisma.auoctionTime.update({
        where: {
          id: 1,
          userId: 1,
        },
        data: { isAuctionStarted: false },
      });
      console.log("Timer ended!", result);
    }, duration);

    const result = await prisma.auoctionTime.update({
      where: {
        id: 1,
        userId: 1,
      },
      data: { isAuctionStarted: true },
    });
    console.log("started!", result);
  }, timeDifference);
}

exports.auction = async (req, res, next) => {
  try {
    const { start_time, end_time, date } = req.body;
    console.log(
      "🚀 ~ file: auction.js:52 ~ exports.router= ~ req.body:",
      req.body
    );

    const result = await prisma.auoctionTime.create({
      data: {
        userId: 1,
        start_time,
        end_time,
        date,
      },
    });

    if (result) {
      startTimer(start_time, end_time, date);
      res.json({ st: true, msg: "auction time set success!!!", data: result });
    } else {
      res.json({ st: false, msg: "auction time set unsuccess!!!", data: null });
    }
  } catch (error) {
    console.log(error);
    res.json({ st: false, msg: "error", data: error });
  }
};

exports.getAuction = async (req, res, next) => {
  try {
    // const { id } = req.params;

    const result = await prisma.auoctionTime.findFirst({
      orderBy: {
        id: "desc",
      },
    });
    if (result) {
      console.log(
        "🚀 ~ file: auction.js:87 ~ exports.getAuction= ~ result:",
        result
      );
      res.json({ st: true, msg: "auction time set success!!!", data: result });
    } else {
      res.json({ st: false, msg: "auction time set unsuccess!!!", data: null });
    }
  } catch (error) {
    console.log(error);
    res.json({ st: false, msg: "error", data: error });
  }
};
