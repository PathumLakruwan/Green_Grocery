const addToCartModel = require("../../Models/cartProduct");

const updateAddToCartProduct = async (req, res) => {
  try {
    const { productID, quantity } = req.body;
    const currentUserID = req.userID;

    // Find the user's cart
    const userCart = await addToCartModel.findOne({ userID: currentUserID });

    if (!userCart) {
      return res.status(404).json({
        message: "Cart not found",
        error: true,
        success: false,
      });
    }

    // Find the product in the cart and update its quantity
    const productToUpdate = userCart.products.find(
      (p) => p.productID === productID
    );

    if (productToUpdate) {
      productToUpdate.quantity = quantity;
      await userCart.save();

      res.json({
        message: "Cart updated successfully",
        success: true,
        error: false,
        data: userCart,
      });
    } else {
      res.status(404).json({
        message: "Product not found in cart",
        error: true,
        success: false,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }

  // try {

  //     const currentUserID = req.userID
  //     const addToCartProductID = req.body._id

  //     const qty = req.body.quantity

  //     const updateProduct = await addToCartModel.updateOne({_id:addToCartProductID},{
  //         ...(qty && {quantity: qty})
  //     })

  //     console.log("updateProduct:", updateProduct)

  //     res.json({
  //         message: 'Cart Updated!',
  //         data: updateProduct,
  //         error: false,
  //         success: true
  //     })

  // } catch (error) {
  //     res.json({
  //         message: error.message || error,
  //         error: true,
  //         success: false
  //     })
  // }
};

module.exports = updateAddToCartProduct;
