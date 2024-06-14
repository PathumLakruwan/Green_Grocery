const receiptModel = require("../../Models/receipt");

const getReceiptsByOrderID = async (req, res) => {
  try {
    const allReceipts = await receiptModel.find().sort({ createdAt: -1 });

    await receiptModel.populate(allReceipts, {
      path: "products.productID",
      select: "productName sellingPrice",
    });

    res.json({
      message: "All User Details",
      data: allReceipts,
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      data: {},
      error: true,
      success: false,
    });
  }
};

module.exports = getReceiptsByOrderID;
