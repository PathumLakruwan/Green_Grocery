const productModel = require("../../Models/productModel");
const addToCartModel = require("../../Models/cartProduct");
const receiptModel = require("../../Models/receipt"); // Make sure to create a Receipt model
const { default: mongoose } = require("mongoose");

const checkoutController = async (req, res) => {
  try {
    const currentUser = req.userID;

    // Find the user's cart
    let userCart = await addToCartModel
      .findOne({ userID: currentUser })
      .populate("products.productID");

    if (!userCart) {
      return res.status(400).json({
        message: "Cart not found",
        success: false,
        error: true,
      });
    }

    if (!userCart || userCart.products.length === 0) {
      return res.status(400).json({
        message: "Cart is empty",
        success: false,
        error: true,
      });
    }

    // Validate quantities
    for (let cartProduct of userCart.products) {
      let product = cartProduct.productID;
      if (cartProduct.quantity > product.productQuantity) {
        return res.status(400).json({
          message: `Insufficient stock for ${product.productName}`,
          success: false,
          error: true,
        });
      }
    }

    // Deduct quantities from the product stock
    for (let cartProduct of userCart.products) {
      let product = cartProduct.productID;
      product.productQuantity -= cartProduct.quantity;
      await product.save();
    }

    // Calculate total amount
    const totalAmount = userCart.products.reduce(
      (sum, p) => sum + p.quantity * p.productID.sellingPrice,
      0
    );

    // Save receipt
    const receipt = new receiptModel({
      userID: currentUser,
      products: userCart.products.map((p) => ({
        productID: p.productID._id,
        quantity: p.quantity,
      })),
      totalAmount,
      receiptId: new mongoose.Types.ObjectId().toString(), // Generating unique receiptId
    });
    await receipt.save();

    // Clear the user's cart
    userCart.products = [];
    await userCart.save();

    res.json({
      message: "Checkout successful",
      success: true,
      error: false,
      receipt: receipt._id,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = checkoutController;
