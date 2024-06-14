const mongoose = require("mongoose");

const receiptSchema = mongoose.Schema(
  {
    userID: {
      type: String,
      required: true,
    },
    receiptId: {
      type: String,
      default: () => new mongoose.Types.ObjectId().toString(),
    },
    products: [
      {
        productID: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "product",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    totalAmount: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

const receiptModel = mongoose.model("receipt", receiptSchema);

module.exports = receiptModel;
