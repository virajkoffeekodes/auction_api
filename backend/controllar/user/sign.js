// const prisma = require("../prisma/index");
const { PrismaClient } = require("@prisma/client");
const JSONparse = require("jsonparse");

const prisma = new PrismaClient();
// const cookieToken = require("../cookieToken/cookieToken");
const cookieToken = require("../../cookieToken/cookieToken");
// user signup
exports.signup = async (req, resp, next) => {
  try {
    const { firstname, lastname, mobile, password, confirm_password, email } =
      req.body.data;

    const user = await prisma.user.create({
      data: {
        firstname,
        lastname,
        mobile,
        password,
        email,
        isAdmin: false,
      },
    });
    // console.log("🚀 ~ file: sign.js:24 ~ exports.signup= ~ user:", user);
    if (user) {
      resp.json({ user, st: true, msg: "user registaration successfully" });
    } else {
      resp.json({ st: true, msg: "user registaration unsuccesss" });
    }
  } catch (error) {
    console.log(error);
  }
};

//userlogin
exports.login = async (req, resp, next) => {
  const { email, password } = req.body.data;
  // console.log(
  //   "🚀 ~ file: sign.js:39 ~ exports.login= ~ mobile:",
  //   mobile.toString()
  // );

  try {
    const isUser = await prisma.user.findFirst({
      where: {
        email,
        password,
      },
    });
    if (isUser) {
      cookieToken(isUser, resp);
    } else {
      resp.send({ st: false, msg: "user is not found" });
    }
  } catch (error) {
    console.log(error);
  }
};

//user logout
exports.logout = async (req, resp, next) => {
  console.log("🚀 ~ file: sign.js:58 ~ exports.logout= ~ req:", req);
  try {
    resp.clearCookie("token").status(200).json({
      st: true,
      msg: "User logged out successfully",
    });
  } catch (error) {
    console.log(error);
  }
};

//user List
exports.userlist = async (req, resp, next) => {
  try {
    const user = await prisma.user.findMany();

    const data = await Promise.all(
      user.map(async (user) => {
        const productlist = await prisma.product.findMany({
          where: {
            userId: user.id,
          },
          // select: {
          //   name: true,
          //   price: true,
          // },
        });

        return {
          ...user,
          productlist,
        };
      })
    );

    if (data) {
      resp.json({ st: true, data, msg: "data fetch successs" });
    } else {
      resp.json({ st: false, data, msg: "data fetch unsucess" });
    }
  } catch (error) {
    console.log(error);
    resp.json({ st: false, data: [], msg: error });
  }
};

//profile
exports.profile = async (req, resp, next) => {
  try {
    const { id } = req.params;

    let result = await prisma.user.findFirst({
      where: {
        id: parseInt(id),
      },
    });

    let productlist = await prisma.product.findMany({
      where: {
        userId: parseInt(id),
      },
    });

    if (!result.productlist) {
      result.productlist = [];
    }

    for (let x in productlist) {
      result.productlist.push(productlist[x]);
    }

    resp.json({ st: true, result });
  } catch (error) {
    console.error("Error retrieving user and product data:", error);
    resp.status(500).json({ error: "An error occurred" });
  }
};

exports.bidder = async (req, resp, next) => {
  const { id } = req.body;
  var result = await prisma.user.findFirst({
    where: {
      id,
    },
  });
  resp.json(result);
};
