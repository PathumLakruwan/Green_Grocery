const express = require("express");
const router = express.Router();

const userRegister = require("../Controller/user/userRegister");
const userLogin = require("../Controller/user/userLogin");
const userDetails = require("../Controller/user/userDetails");
const authToken = require("../middleware/authToken");
const userLogout = require("../Controller/user/userLogout");
const allUsers = require("../Controller/user/allUsers");
const updateUser = require("../Controller/user/updateUser");
const uploadProductController = require("../Controller/product/uploadProduct");
const getProduct = require("../Controller/product/getProduct");
const updateProduct = require("../Controller/product/updateProduct");
const getCategoryProduct = require("../Controller/product/getOneProductCategory");
const getCategoryWiseProduct = require("../Controller/product/getCategoryWiseProduct");
const getProductDetails = require("../Controller/product/getProductDetails");
const addToCartConroller = require("../Controller/user/addToCart");
const countAddToCartProduct = require("../Controller/user/countAddToCartProducts");
const addToCartViewProduct = require("../Controller/user/addToCartViewProduct");
const updateAddToCartProduct = require("../Controller/user/updateAddToCartProduct");
const deleteAddToCartProduct = require("../Controller/user/deleteAddToCartProduct");
const searchProduct = require("../Controller/product/searchProduct");
const filterProductController = require("../Controller/product/filterProduct");
const checkoutController = require("../Controller/user/checkout");
const getReceiptsByOrderID = require("../Controller/user/getReceiptDetails");
const deleteReceipt = require("../Controller/user/deleteReceipt");
const getReceiptsByUserID = require("../Controller/user/viewReceipt");
const getReportData = require("../Controller/user/genarateReports");
const deleteProduct = require("../Controller/product/deleteProduct");

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/user-details", authToken, userDetails);
router.get("/userLogout", userLogout);

//Admin Panel
router.get("/allUsers", authToken, allUsers);
router.post("/updateUser", authToken, updateUser);

//Product
router.post("/uploadProducts", authToken, uploadProductController);
router.get("/getProduct", getProduct);
router.post("/updateProduct", authToken, updateProduct);
router.get("/getProductCategory", getCategoryProduct);
router.post("/categeryWiseProduct", getCategoryWiseProduct);
router.post("/productDetails", getProductDetails);
router.get("/search", searchProduct);
router.post("/filterProduct", filterProductController);
router.delete('/deleteProduct',authToken,deleteProduct)

//User Add To Cart
router.post("/addTocart", authToken, addToCartConroller);
router.get("/countAddToCartProduct", authToken, countAddToCartProduct);
router.get("/viewCartProduct", authToken, addToCartViewProduct);
router.post("/updateCartQty", authToken, updateAddToCartProduct);
router.delete("/deleteCartProduct", authToken, deleteAddToCartProduct);

//checkout-receipts
router.post("/checkout", authToken, checkoutController);
router.get("/receipts", authToken, getReceiptsByOrderID);
router.get("/userReceipt", authToken, getReceiptsByUserID);
router.post("/deleteReceipt", authToken, deleteReceipt);


//ReportGenarate
router.get("/generateReport", authToken,getReportData);

module.exports = router;
