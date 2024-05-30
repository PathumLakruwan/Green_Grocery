const productModel = require("../../Models/productModel")

const getCategoryProduct = async(req,res)=>{
    try {
        
        const productCategory = await productModel.distinct('category')
        console.log('category',productCategory)

        //Array to StoreOne product from each category
        const productByCategory = []

        for(const category of productCategory){
            const product = await productModel.findOne({category:category})

            if(product){
                productByCategory.push(product)
            }
        }

        res.json({
            message: 'Product By Category',
            data:productByCategory,
            success:true,
            error:false
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

module.exports = getCategoryProduct