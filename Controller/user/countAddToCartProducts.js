const addToCartModel = require("../../Models/cartProduct");

const countAddToCartProduct = async (req, res) => {
  try {
    const userId = req.userID;

    const userCart = await addToCartModel.findOne({ userID: userId });

    const count = userCart ? userCart.products.length : 0;

    // const count = await addToCartModel.countDocuments({
    //     userID : userId
    // })

    res.json({
      data: {
        count: count,
      },
      message: "Count of cart product",
      success: true,
      error: false,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = countAddToCartProduct;
