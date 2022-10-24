const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");


app.use(express.json());
app.use(cors());




//schema Design

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        unique: [true, "Name must be unique"],
        minLength: [3, "Name must be at least 3 characters"],
        maxLength: [100, "Name is too long"],
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        min: [0, "price can not be negative"],
    },
    unit: {
        type: String,
        required: true,
        enum: {
            values: ["kg", "liter", "pcs"],
            message: "unit can't be {VALUE}, must be kg/liter/pcs",
        },
    },
    quantity: {
        type: Number,
        required: true,
        min: [0, "Quantity can not be negative"],
        validate: {
            validator: (value) => {
                const isInteger = Number.isInteger(value);
                if (isInteger) {
                    return true;
                } else {
                    return false;
                }
            },
        },
        message: "Quantity must be an integer",
    },
    status: {
        type: String,
        required: true,
        enum: {
            values: ["in-stock", "out-of-stock", "discontinued"],
            message:
                "status can't be {VALUE}, must be in-stock or out-of-stock or discontinued",
        },
    },
    // supplier: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Supplier",
    // },
    // categories: [
    //   {
    //     name: {
    //       type: String,
    //       required: true,
    //     },
    //     _id: mongoose.Schema.Types.ObjectId
    //   }
    // ]
    
},{timestamps: true});


const Product = mongoose.model("Product", ProductSchema);






app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});

app.post("/api/v1/product", async (req, res, next) => {
  

  try {
    // const result = await Product.create(req.body);

    const product = await Product(req.body);

    if (product.quantity === 0) {
        product.status = "out-of-stock";
    }

    const result = await product.save();


    res.status(200).json({
        status: "success",
        message: "Product saved successfully",
        result: result,
    });

  } catch (error) {
    res.status(400).json({status: "fail", message: "Product not saved", error: error.message});

  }
  

  
})


module.exports = app;
