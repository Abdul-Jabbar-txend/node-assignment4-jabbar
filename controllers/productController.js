const { readData, writeData } = require("../utils/dataHandler");

exports.getAllProducts = (req, res) => {
  try {
    const products = readData();
    res.render("index", { products });
  } catch (err) {
    res.status(500).send({ message: "Error retrieving products" });
  }
};

exports.getAddProductForm = (req, res) => {
  res.render("add");
};

exports.addProduct = (req, res) => {
  try {
    const { name, price } = req.body;
    // Validate input data
    if (!name || !price || isNaN(price)) {
      return res.status(400).send({ message: "Invalid product data" });
    }

    const products = readData();
    const newProduct = {
      id: products.length + 1,
      name,
      price: parseFloat(price),
      image: req.file ? req.file.filename : null,
    };

    products.push(newProduct);
    writeData(products);

    res.redirect("/");
  } catch (err) {
    res.status(500).send({ message: "Error adding product" });
  }
};

exports.getEditProductForm = (req, res) => {
  try {
    const products = readData();
    const product = products.find((p) => p.id === parseInt(req.params.id));

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.render("edit", { product });
  } catch (err) {
    res.status(500).send({ message: "Error retrieving product" });
  }
};

exports.editProduct = (req, res) => {
  try {
    const { name, price } = req.body;
    const products = readData();
    const productIndex = products.findIndex(
      (p) => p.id === parseInt(req.params.id)
    );

    if (productIndex === -1) {
      return res.status(404).send({ message: "Product not found" });
    }

    // Validate input data
    if (!name || !price || isNaN(price)) {
      return res.status(400).send({ message: "Invalid product data" });
    }

    const updatedProduct = {
      id: parseInt(req.params.id),
      name,
      price: parseFloat(price),
      image: req.file ? req.file.filename : products[productIndex].image,
    };

    products[productIndex] = updatedProduct;
    writeData(products);

    res.redirect("/");
  } catch (err) {
    res.status(500).send({ message: "Error editing product" });
  }
};

exports.deleteProduct = (req, res) => {
  try {
    let products = readData();
    const productId = parseInt(req.params.id);

    // Check if product exists before trying to delete
    if (!products.find((p) => p.id === productId)) {
      return res.status(404).send({ message: "Product not found" });
    }

    products = products.filter((p) => p.id !== productId);
    writeData(products);

    res.redirect("/");
  } catch (err) {
    res.status(500).send({ message: "Error deleting product" });
  }
};
