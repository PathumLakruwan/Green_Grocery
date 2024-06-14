const receiptModel = require("../../Models/receipt");

const getReportData = async (req, res) => {
  const calculateMetrics = (receipts) => {
    const totalSales = receipts.reduce((acc, receipt) => acc + receipt.totalAmount, 0);
    const numberOfOrders = receipts.length;
    const averageOrderValue = totalSales / numberOfOrders;

    const salesByCategory = receipts.reduce((acc, receipt) => {
      receipt.products.forEach(item => {
        const categoryName = item.productID.category; 
        if (!acc[categoryName]) acc[categoryName] = 0;
        acc[categoryName] += item.quantity;
      });
      return acc;
    }, {});

    const salesByProduct = receipts.reduce((acc, receipt) => {
      receipt.products.forEach(item => {
        const productName = item.productID.productName;
        if (!acc[productName]) acc[productName] = 0;
        acc[productName] += item.quantity;
      });
      return acc;
    }, {});

    return {
      totalSales,
      numberOfOrders,
      averageOrderValue,
      salesByCategory,
      salesByProduct,
    };
  };

  try {
    const receipts = await receiptModel.find().populate('products.productID', 'productName sellingPrice category');
    console.log("Receipts:", receipts);
    const metrics = calculateMetrics(receipts);
    console.log("Metrics:", metrics);

    res.json({
      message: "Report Data",
      data: metrics,
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

module.exports = getReportData;
