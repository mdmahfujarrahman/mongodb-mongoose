const express = require("express");
const productController = require("../Controllers/product.controller");
const router = express.Router();


router.route('/')
.get(productController.getProducts)
.post(productController.addProduct);


module.exports = router;