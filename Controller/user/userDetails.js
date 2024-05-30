const userModel = require("../../Models/userModel")

async function userDetails(req,res) {
    try {
        const token = req.cookies?.token
        console.log('user-id',req.userID)
        const user = await userModel.findById(req.userID)

      res.status(200).json({
        data:user,
        message:"user details",
        error:false,
        success:true
      })

        console.log('user', user)
    
      } catch (error) {
        res.status(400).json({
            message: error.message || error,
            data: {},
            error: true,
            success: false
        })
      }
}

module.exports = userDetails
