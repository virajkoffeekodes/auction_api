const express = require("express");

const router = express.Router();
const multer = require("multer");
// const upload = multer({ dest: "uploads/" });
const {
  addProduct,
  productList,
  updateProduct,
  findProduct,
  deleteProduct,
  updatebid,
  search,
} = require("../controllar/product/poducts");
const { bidproduct, highestbidder } = require("../controllar/bidder/bidder");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    const timestamp = Date.now();

    const ext = file.originalname;
    cb(null, `${timestamp}${ext}`);
  },
});

const upload = multer({ storage: storage });
router.route("/addProduct").post(upload.single("image"), addProduct); // Moved upload middleware inside the route handler
router.route("/productList").get(productList);
router.route("/updateProduct/find/:id").get(findProduct);
router
  .route("/updateProduct/update")
  .put(upload.single("image"), updateProduct);

router.route("/delete/:id").delete(deleteProduct);

router.route("/updatebid/:id").put(updatebid);
router.route("/search/:key").get(search);

module.exports = router;
