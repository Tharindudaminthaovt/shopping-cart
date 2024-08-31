const express = require("express");
const router = express.Router();
const products=require('../Data/products.json');

//created an entrypoint for a route at /api
router.get("/products", (req, res) => {
  res.json(products);
});

module.exports = router;
