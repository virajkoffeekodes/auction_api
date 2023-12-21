const { PrismaClient } = require("@prisma/client");
// const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
var express = require("express");
var app = express();
const stripe = require("stripe")(
  "sk_test_51OPIR7SF73gnO9aHtXod4uEmPuGgdsz86sk3b5SzIKrub2qpdIrnh8DBRSC1Ey5NtMdWddaZEyN1IJI61gSchv1z00K367Z3qa"
);
const { v4: uuid } = require("uuid");

exports.payment = async (req, resp, next) => {
  const { highBidPrice, token } = req.body;
  // console.log("token:", token);
  console.log("highBidPrice:", highBidPrice);
  console.log(stripe, "stripe");
  const idempontencyKey = uuid();

  return stripe.customers
    .create({
      email: token.email,
      source: token.id,
    })
    .then((customer) => {
      stripe.charges.create(
        {
          amount: highBidPrice,
          currency: "INR",
          customer: customer.id,
          receipt_email: token.email,
          description: "Purchase description",
          shipping: {
            name: token.card.name,
            address: {
              country: token.card.address_country,
            },
          },
        },
        idempontencyKey
      );
    })
    .then((result) => resp.status(200).json(result))
    .catch((err) => console.log(err));
};
