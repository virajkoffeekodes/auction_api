const { PrismaClient } = require("@prisma/client");
var express = require("express");

var app = express();
const fs = require("fs");
const path = require("path");
const { stringify } = require("querystring");
const prisma = new PrismaClient();

exports.addProduct = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("No files were uploaded.");
  }
  const image = req.file.filename;

  try {
    const { id, name, price, description } = req.body;

    console.log(name, image, price, description, typeof id);

    const addProduct = await prisma.product.create({
      data: {
        name,
        image,
        price,
        description,
        userId: parseInt(id),
      },
    });

    if (addProduct) {
      res.json({ data: addProduct, msg: "File uploaded successfully" });
    } else {
      res.json({ data: {}, msg: "File uploaded unsuccessfully" });
    }
  } catch (error) {
    res.json({ data: {}, msg: error });
  }
};

exports.productList = async (req, resp, next) => {
  try {
    const products = await prisma.product.findMany();
    // console.log(products, "dfsfdsf"); // Assuming your model is 'Product'
    resp.json(products);
  } catch (error) {
    console.log(error);
  }
};

exports.findProduct = async (req, resp, next) => {
  try {
    const { id } = req.params;

    let result = await prisma.product.findFirst({
      where: {
        id: parseInt(id), // Provide the ID of the product you want to find
      },
    });

    resp.send(result);
  } catch (error) {
    console.error("Error updating product:", error);
  }
};

exports.updateProduct = async (req, resp, next) => {
  const { name, price, description, id } = req.body;

  try {
    const image = req?.file?.filename;

    var updatedProduct;

    if (image) {
      const product = await prisma.product.findFirst({
        where: {
          id: parseInt(id),
        },
      });
      const currentFileDir = __dirname;
      const rootDir = path.resolve(currentFileDir, "../../");
      const uploadFolder = `${rootDir}/uploads`;

      fs.readdir(uploadFolder, (err, files) => {
        if (err) {
          console.error("Error reading directory:", err);
          return;
        }
        const imageFiles = files.filter((file) => {
          const extension = path.extname(file).toLowerCase();
          return (
            extension === ".jpg" ||
            extension === ".jpeg" ||
            extension === ".png" ||
            extension === ".gif"
          );
        });

        const foundImage = imageFiles.find((file) => file === product.image);

        if (foundImage) {
          const filePath = path.join(uploadFolder, foundImage);

          // Check if the file exists
          fs.access(filePath, fs.constants.F_OK, (err) => {
            if (err) {
              console.error("File does not exist:", err);
              return;
            }

            // File exists, proceed with deletion
            fs.unlink(filePath, async (err) => {
              if (err) {
                console.error("Error deleting file:", err);
                return;
              }
              updatedProduct = await prisma.product.updateMany({
                where: {
                  id: parseInt(id),
                },
                data: { name, price, description, image }, // Update the fields based on the request body
              });
              if (updatedProduct) {
                resp.json({
                  data: updatedProduct,
                  msg: "Product Updated successfully",
                });
              } else {
                resp.json({ data: {}, msg: "Product Updated unsuccessfully" });
              }
            });
          });
        }
      });
    } else {
      updatedProduct = await prisma.product.updateMany({
        where: {
          id: parseInt(id),
        },
        data: { name, price, description }, // Update the fields based on the request body
      });

      if (updatedProduct) {
        resp.json({
          data: updatedProduct,
          msg: "Product Updated successfully",
        });
      } else {
        resp.json({ data: {}, msg: "Product Updated unsuccessfully" });
      }
    }
  } catch (error) {
    console.error("Error updating product:", error);
    resp.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await prisma.product.findFirst({
      where: {
        id: parseInt(req.params.id),
      },
    });
    const currentFileDir = __dirname;
    // Find the root directory by navigating upwards
    const rootDir = path.resolve(currentFileDir, "../");
    const uploadFolder = `${rootDir}/uploads`;

    fs.readdir(uploadFolder, (err, files) => {
      if (err) {
        console.error("Error reading directory:", err);
        return;
      }
      const imageFiles = files.filter((file) => {
        const extension = path.extname(file).toLowerCase();
        return (
          extension === ".jpg" ||
          extension === ".jpeg" ||
          extension === ".png" ||
          extension === ".gif"
        );
      });

      const foundImage = imageFiles.find((file) => file === product.image);
      console.log(
        "🚀 ~ file: poducts.js:113 ~ fs.readdir ~ foundImage:",
        foundImage
      );

      if (foundImage) {
        const filePath = path.join(uploadFolder, foundImage);

        // Check if the file exists
        fs.access(filePath, fs.constants.F_OK, (err) => {
          if (err) {
            console.error("File does not exist:", err);
            return;
          }

          // File exists, proceed with deletion
          fs.unlink(filePath, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
              return;
            }
            console.log(`File '${foundImage}' deleted successfully.`);
          });
        });
      }
    });

    const deletedProduct = await prisma.product.delete({
      where: {
        id: parseInt(req.params.id),
      },
    });
    if (deletedProduct) {
      res.status(200).json({
        message: "Product deleted successfully",
        deletedProduct,
      });
    } else {
      res.status(404).json({
        message: "Product not found",
      });
    }
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

exports.updatebid = async (req, resp, next) => {
  // const { id } = req.params;
  try {
    const { bidprice } = req.body;
    console.log("🚀 ~ ", bidprice);
    const { id } = req.params;
    const updatebid = await prisma.product.update({
      where: {
        id: parseInt(id),
      },
      data: {
        bidprice: bidprice.toString(), // Update the fields based on the request body
      },
    });
    resp.json(updatebid);
  } catch (error) {
    console.log("errror::::::::::::::::::::::::::::::::::::::::::", error);
  }
};

exports.search = async (req, resp, next) => {
  console.log("mvsrv");
  let result = await prisma.product.findMany({
    where: {
      OR: [
        {
          name: {
            contains: req.params.key,
          },
        },
        {
          price: {
            contains: req.params.key,
          },
        },
        {
          description: {
            contains: req.params.key,
          },
        },
      ],
    },
  });
  resp.send(result);
};
