const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    productImg: [],
    description: String,
    productQuantity: {
      type: Number,
      required: [true, "Product quantity is required"],
      min: [0, "Product quantity cannot be negative"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },
    sellingPrice: {
      type: Number,
      required: [true, "Selling price is required"],
      min: [0, "Selling price cannot be negative"],
      validate: {
        validator: function (value) {
          return value <= this.price;
        },
        message: "Selling price cannot be higher than the original price",
      },
    },
  },
  {
    timestamps: true,
  }
);

const productModel = mongoose.model("product", productSchema);
module.exports = productModel;
