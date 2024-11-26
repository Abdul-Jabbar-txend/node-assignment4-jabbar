const fs = require("fs");
const path = require("path");
const dataFilePath = path.join(__dirname, "../dummyData/products.json");

const readData = () => {
  const data = fs.readFileSync(dataFilePath);
  return JSON.parse(data);
};

const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

exports.getAllProducts = (req, res) => {
  const products = readData();
  res.render("index", { products });
};

exports.getAddProductForm = (req, res) => {
  res.render("add");
};

exports.addProduct = (req, res) => {
  const products = readData();
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    image: req.file ? req.file.filename : null,
  };

  products.push(newProduct);
  writeData(products);
  res.redirect("/");
};

exports.getEditProductForm = (req, res) => {
  const products = readData();
  const product = products.find((p) => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).send("Product not found");
  }
  res.render("edit", { product });
};

exports.editProduct = (req, res) => {
  let products = readData();
  const productIndex = products.findIndex(
    (p) => p.id === parseInt(req.params.id)
  );
  if (productIndex === -1) {
    return res.status(404).send("Product not found");
  }

  const updatedProduct = {
    id: parseInt(req.params.id),
    name: req.body.name,
    price: req.body.price,
    image: req.file ? req.file.filename : products[productIndex].image,
  };

  products[productIndex] = updatedProduct;
  writeData(products);
  res.redirect("/");
};

exports.deleteProduct = (req, res) => {
  let products = readData();
  products = products.filter((p) => p.id !== parseInt(req.params.id));
  writeData(products);
  res.redirect("/");
};
