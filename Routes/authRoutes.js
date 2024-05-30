const express = require('express')
const router = express.Router()

const userRegister = require('../Controller/user/userRegister')
const userLogin = require('../Controller/user/userLogin')
const userDetails  = require('../Controller/user/userDetails')
const authToken = require('../middleware/authToken')
const userLogout  = require('../Controller/user/userLogout')
const allUsers = require('../Controller/user/allUsers')
const updateUser = require('../Controller/user/updateUser')
const uploadProductController = require('../Controller/product/uploadProduct')
const getProduct = require('../Controller/product/getProduct')
const updateProduct = require('../Controller/product/updateProduct')
const getCategoryProduct = require('../Controller/product/getOneProductCategory')
const getCategoryWiseProduct = require('../Controller/product/getCategoryWiseProduct')
const getProductDetails = require('../Controller/product/getProductDetails')


router.post("/register",userRegister)
router.post("/login",userLogin)
router.get("/user-details",authToken,userDetails)
router.get('/userLogout',userLogout)

//Admin Panel
router.get('/allUsers',allUsers)
router.post('/updateUser',authToken,updateUser)

//Product
router.post('/uploadProducts',authToken,uploadProductController)
router.get('/getProduct',getProduct)
router.post('/updateProduct',authToken,updateProduct)
router.get('/getProductCategory',getCategoryProduct)
router.post('/categeryWiseProduct',getCategoryWiseProduct)
router.post('/productDetails',getProductDetails)

module.exports = router