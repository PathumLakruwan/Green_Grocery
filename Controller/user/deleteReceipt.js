const receiptModel = require("../../Models/receipt");

// Controller function to delete a receipt
const deleteReceipt = async (req, res) => {
  const { receiptId } = req.body;

  try {
    const deletedReceipt = await receiptModel.findOneAndDelete({ receiptId });

    if (!deletedReceipt) {
      return res
        .status(404)
        .json({ success: false, message: "Receipt not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Receipt deleted successfully" });
  } catch (error) {
    console.error("Error deleting receipt:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

module.exports = deleteReceipt;
