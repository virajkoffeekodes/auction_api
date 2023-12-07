var express = require("express");

const cors = require("cors");
var app = express();

require("dotenv").config();

app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.set("view engine", "ejs");

const usersignup = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const auction = require("./routes/auction");

app.use(usersignup);
app.use(productRoutes);
app.use(auction);

app.listen(8000, () => {
  console.log("server is live at port 8000");
});
