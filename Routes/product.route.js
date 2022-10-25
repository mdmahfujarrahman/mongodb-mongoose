const express = require("express");
const productController = require("../Controllers/product.controller");
const router = express.Router();


router.route('/')
.get(productController.getProducts)
.post(productController.addProduct);

router.route("/bulk-update").patch(productController.bulkUpdateProduct);
router.route('/:id').patch(productController.updateProduct);
module.exports = router;