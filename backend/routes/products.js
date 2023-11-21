const express = require("express");
const Product = require("../models/product");


const router = express.Router();
// GET /products --> get all products

const productsData = [
  {
    id: 1,
    name: "Product 1",
  },
  {
    id: 2,
    name: "Product 2",
  },
]
router.get("/", (req, res) => {
  res.status(200).json(productsData);
});

router.get("/:id", (req, res) => {
  res.status(200).json({
    message: "kdsj",
  });
});
router.post("/", async (req, res) => {
  const { name, price, description, category } = req.body;

  try {
    if (!name || !price || !description || !category) {
      return res.status(400).json({
        message: "All fields are required",
      });
    } else {
      const product = await Product.create({
        name,
        price,
        description,
        category,
      });

      res.status(201).json({ product });
    }
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
});


router.put("/:id", (req, res) => {
  res.status(200).json({
    message: "kdsj",
  });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({
    message: "hbjbhjhb",
  });
});

module.exports = router;
