const express = require("express");
const app = express();
const cors = require("cors");



app.use(express.json());
app.use(cors());


// route
const productRoute = require('./Routes/product.route.js')




app.use("/api/v1/product", productRoute);




app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});




module.exports = app;
