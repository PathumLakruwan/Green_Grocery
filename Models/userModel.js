const mongoose = require ('mongoose')

const userSchema = new mongoose.Schema({
    name: String,
    userName:String,
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:String,
    confirmPassword: String,
    profilePic: String,
    role: String,
},{
    timestamps:true
})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel