const userModel = require("../../Models/userModel")

async function allUsers(req,res){

    try {
        //console.log('User-id',req.userID)

        const allUsers = await userModel.find()

        res.json({
            message: 'All User Details',
            data: allUsers,
            success:true,
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

module.exports = allUsers
