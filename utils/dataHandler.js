const fs = require("fs");
const path = require("path");

const dataFilePath = path.join(__dirname, "../dummyData/products.json");

// Reads the data from the JSON file and returns the parsed object
const readData = () => {
  try {
    const data = fs.readFileSync(dataFilePath, "utf-8");
    return JSON.parse(data);
  } catch (err) {
    console.error("Error reading data:", err);
    throw new Error("Unable to read data");
  }
};

// Writes the data back to the JSON file
const writeData = (data) => {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error writing data:", err);
    throw new Error("Unable to write data");
  }
};

module.exports = { readData, writeData };
