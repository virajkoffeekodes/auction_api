const { PrismaClient } = require("@prisma/client");
var express = require("express");

var app = express();
const options = {
  expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
  httpOnly: true,
};
