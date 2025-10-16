const express = require("express");
const ingestsProduct = express.Router();

const { IngestsController } = require("../Controllers/IngestsController");

ingestsProduct.get("/product", IngestsController);

module.exports = { ingestsProduct };