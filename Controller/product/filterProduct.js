const productModel = require("../../Models/productModel");

const filterProductController = async (req, res) => {
  try {
    const categoryList = req?.body?.category || [];

    const product = await productModel.find({
      category: {
        $in: categoryList,
      },
    });

    res.json({
      data: product,
      message: "Product",
      error: false,
      success: true,
    });
  } catch (error) {
    res.json({
      message: error.message || error,
      data: {},
      error: true,
      success: false,
    });
  }
};

module.exports = filterProductController;
