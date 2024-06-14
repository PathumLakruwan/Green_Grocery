const productModel = require("../../Models/productModel");

// Controller function to delete a receipt
const deleteProduct = async (req, res) => {
  const { _id } = req.body;

  try {
    const deletedProduct = await productModel.findOneAndDelete({ _id });

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = deleteProduct;
