const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const uploadMiddleware = require("../middlewares/uploadMiddleware");
const errorHandler = require("../middlewares/errorHandler");

router.get("/", productController.getAllProducts);

router.get("/add", productController.getAddProductForm);

router.post(
  "/add",
  uploadMiddleware.single("image"),
  productController.addProduct
);

router.get("/edit/:id", productController.getEditProductForm);

router.post(
  "/edit/:id",
  uploadMiddleware.single("image"),
  productController.editProduct
);

router.get("/delete/:id", productController.deleteProduct);

module.exports = router;
