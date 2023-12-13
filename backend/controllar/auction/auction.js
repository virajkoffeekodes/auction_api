const { PrismaClient } = require("@prisma/client");
var express = require("express");

const prisma = new PrismaClient();

function startTimer(start_time, end_time, date) {
  const currentDate = new Date();
  const startDate = new Date(`${date}T${start_time}`);
  const endDate = new Date(`${date}T${end_time}`);

  let timeDifference = startDate - currentDate; //minisec

  const timer = setTimeout(async () => {
    const duration = endDate - currentDate;

    const findId = await prisma.auoctionTime.findFirst({
      orderBy: {
        id: "desc",
      },
    });

    setTimeout(async () => {
      clearTimeout(timer);
      const result = await prisma.auoctionTime.update({
        where: {
          id: findId.id,
          userId: 1,
        },
        data: { isAuctionStarted: false, isCompleted: true },
      });
    }, duration);

    const result = await prisma.auoctionTime.update({
      where: {
        id: findId.id,
        userId: 1,
      },

      data: { isAuctionStarted: true },
    });
  }, timeDifference);
}

exports.auction = async (req, res, next) => {
  try {
    const { start_time, end_time, date } = req.body;
    console.log(
      "🚀 ~ file: auction.js:47 ~ exports.auction= ~ req.bod:",
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
    // console.log("🚀82~exports.getAuction=result:",result);
    if (result) {
      res.json({ st: true, msg: "auction time set success!!!", data: result });
    } else {
      res.json({ st: false, msg: "auction time set unsuccess!!!", data: null });
    }
  } catch (error) {
    console.log(error);
    res.json({ st: false, msg: "error", data: error });
  }
};
