const { ConnectionStates } = require("mongoose")
const userModel = require("../../Models/userModel")

async function updateUser(req,res){
    try {

        const sessionUser = req.userID

        const {userID,email,name,role,userName} =req.body

        const payload = {
            ...(email && {email : email}),
            ...(userName && {userName : userName}),
            ...(name && {name : name}),
            ...(role && {role : role}),
        }

        const user= await userModel.findById(sessionUser)
        console.log('userRole', user.role)

        const updateUser = await userModel.findByIdAndUpdate(userID,payload)
            
        res.json({
            data:updateUser,
            message: 'User Updated',
            success:true,
            error: false,
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

module.exports = updateUser