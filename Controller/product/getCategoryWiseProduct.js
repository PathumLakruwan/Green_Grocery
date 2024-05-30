const productModel = require("../../Models/productModel")

const getCategoryWiseProduct = async (req,res)=> {
    try {
        const{category} =req?.body || req?.query
        const product = await productModel.find({category}) 

        res.json({
            data: product,
            message: 'Product',
            error: false,
            success: true
        })
    } catch (error) {
        res.status(400).json({
            message: error.message || error,
            data: {},
            error: true,
            success: false
        })
    }
}

module.exports = getCategoryWiseProduct