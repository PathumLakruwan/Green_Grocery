const addToCartModel = require("../../Models/cartProduct");

const deleteAddToCartProduct = async (req, res) => {
  try {
    const { productID } = req.body;
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

    // Filter out the product to delete
    const initialProductCount = userCart.products.length;
    userCart.products = userCart.products.filter(
      (p) => p.productID !== productID
    );

    // Check if any products were removed
    if (userCart.products.length === initialProductCount) {
      return res.status(404).json({
        message: "Product not found in cart",
        error: true,
        success: false,
      });
    }

    // Save the updated cart
    await userCart.save();

    res.json({
      message: "Product deleted from cart",
      success: true,
      error: false,
      data: userCart,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};

module.exports = deleteAddToCartProduct;

// const addToCartModel = require("../../Models/cartProduct")

// const deleteAddToCartProduct = async(req,res)=>{
//     try {

//         const currentUserID = req.userID
//         const addToCartProductID = req.body._id

//         const deleteProduct = await addToCartModel.deleteOne({
//             _id : addToCartProductID,
//             userID: currentUserID
//          })

//         if (!deleteProduct) {
//             return res.json({
//                 message: 'Product not found in cart or unauthorized access',
//                 error: true,
//                 success: false
//             });
//         }

//         res.json({
//             message : 'Product Deleted From Cart!',
//             error: false,
//             success:true,
//             data : deleteProduct
//         })

//     } catch (error) {
//         res.json({
//             message: error.message || error,
//             error:true,
//             success: false
//         })
//     }
// }

// module.exports = deleteAddToCartProduct
