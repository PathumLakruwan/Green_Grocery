const userModel = require("../Models/userModel")

const uploadProductPermission = async(userID) =>{
    const user = await userModel.findById(userID)
    if(user.role !== "ADMIN"){
        return false
    }
    return true
}

module.exports = uploadProductPermission