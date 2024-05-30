const mongoose = require ('mongoose')

async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Connected to the DataBase")
    }catch{
        console.log('error')
    }
}

module.exports = connectDB