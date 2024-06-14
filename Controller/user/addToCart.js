const addToCartModel = require("../../Models/cartProduct");

const addToCartController = async (req, res) => {
  try {
    const { productID } = req.body;
    const currentUser = req.userID;

    // Find the user's cart or create a new one if none exists
    let userCart = await addToCartModel.findOne({ userID: currentUser });

    if (!userCart) {
      userCart = new addToCartModel({
        userID: currentUser,
        products: [],
        //quantity:quantity
      });
    }

    // Check if the product already exists in the cart
    const productIndex = userCart.products.findIndex(
      (p) => p.productID.toString() === productID
    );

    if (productIndex > -1) {
      // Product exists, update the quantity
      //userCart.products[productIndex].quantity += 1;
      return res.json({
        message: "Alredy in Cart",
        success: false,
        error: true,
      });
    } else {
      // Product does not exist, add new product
      userCart.products.push({ productID, quantity: 1 });
    }

    await userCart.save();

    res.json({
      message: "Product Added to Cart",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = addToCartController;
