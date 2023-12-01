const express = require("express");

const {
  createProduct,
  getSingleProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/product");

const router = express.Router();

// GET /products --> get all products
router.get("/", getAllProducts);

//GET /products/:id -->return a list of products
router.get("/:id", getSingleProduct);

//GET /products/:id --> create a new product
router.post("/", createProduct);

//GET /products/:id --> update a single product
router.put("/:id", updateProduct);

//GET /products/:id --> delete a single product
router.delete("/:id", deleteProduct);

module.exports = router;
