const mongoose = require("mongoose");

const addToCart = mongoose.Schema(
  {
    products: [
      {
        productID: {
          ref: "product",
          type: String,
          required: true,
        },
        quantity:{
          type:Number,
          required:[true, "Quantity is required"],
          min: [1, "Quantity should be at least 1"],
        } 
      },
    ],
    userID:{
      ref:"user",
      type:String,
      required:true
    }
  },
  {
    timestamps: true,
  }
);

const addToCartModel = mongoose.model("addToCart", addToCart);

module.exports = addToCartModel;
