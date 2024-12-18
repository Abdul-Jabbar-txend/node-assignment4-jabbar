const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const productRoutes = require("./routes/productRoutes");
const { errorHandler } = require("./middlewares");
const notFound = require("./controllers/notFound");

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use("/", productRoutes);
app.use("*", notFound);
// errorHandler middleware
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
