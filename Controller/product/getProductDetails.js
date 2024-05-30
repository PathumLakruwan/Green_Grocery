const productModel = require("../../Models/productModel")

const getProductDetails = async (req,res) =>{
    try {
        
        const {productId} = req.body
        const product = await productModel.findById(productId)

        res.json({
            data: product,
            message: "Product Details",
            error: false,
            success: true,
        })


    } catch (error) {

        res.json({
            message: error?.message || error,
            error:true,
            success: false
        })
    }
}

module.exports = getProductDetails