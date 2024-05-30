const express = require('express')
const cors = require ('cors')
const cookieParser = require('cookie-parser')
const { connect } = require('mongoose')
require('dotenv').config()
const connectDB = require('./Config/db')
const router = require ('./Routes/authRoutes')

const app = express()
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use('/api',router)

const port = 8000 || process.env.port

connectDB().then(()=>{
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
        console.log('')
    })
})