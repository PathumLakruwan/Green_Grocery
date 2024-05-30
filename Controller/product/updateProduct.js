const productModel = require("../../Models/productModel")
const uploadProductPermission = require('../../helpers/permission')

async function updateProduct (req,res){

    try {

        if(!uploadProductPermission(req.userID)){
            throw new error('Permision Denied')
        }

        const {_id, ...resBody} = req.body

        const updateProduct = await productModel.findByIdAndUpdate(_id,resBody)

        res.json({
            message: 'Product Update Successfully!',
            data: updateProduct,
            success: true,
            error: false
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

module.exports = updateProduct