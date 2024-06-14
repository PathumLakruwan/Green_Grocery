const addToCartModel = require("../../Models/cartProduct");

const addToCartViewProduct = async (req, res) => {
  try {
    const currentUser = req?.userID;

    const userCart = await addToCartModel
      .findOne({ userID: currentUser })
      .populate("products.productID");

    if (!userCart) {
      return res.json({
        message: "Cart is empty",
        success: true,
        error: false,
      });
    }

    res.json({
      data: userCart.products,
      success: true,
      error: false,
    });

  } catch (error) {
    res.json({
      message: error.message || error,
      true: false,
      error: true,
    });
  }
};

module.exports = addToCartViewProduct;





















    // const allProduct = await addToCartModel.find({
    //     userID:currentUser
    // }).populate('productID')

    // res.json({
    //     data: allProduct,
    //     success:true,
    //     error: false
    // })
