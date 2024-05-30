const productModel = require("../../Models/productModel")
const uploadProductPermission = require("../../helpers/permission")

async function uploadProductController(req,res){
    try {

        const sessionUserId = req.userID
        if(!uploadProductPermission(sessionUserId)){
            throw new error('Permision Denied')
        }

        const uploadProduct = new productModel(req.body)
        const saveProduct = await uploadProduct.save()

        res.status(201).json({
            success: true,
            error: false,
            message: "Product Uploaded Successfully",
            data: saveProduct
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

module.exports = uploadProductController