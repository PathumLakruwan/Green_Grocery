const receiptModel = require("../../Models/receipt");

const getReceiptsByUserID = async (req, res) => {
  try {
    const currentUser = req.userID;

    // Find all receipts for the current user
    const userReceipts = await receiptModel
      .find({ userID: currentUser })
      .populate(
        "products.productID",
        "productName sellingPrice productQuantity productImg category"
      )
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: userReceipts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || "Failed to fetch user receipts",
      error: true,
      success: false,
    });
  }
};

module.exports = getReceiptsByUserID;
