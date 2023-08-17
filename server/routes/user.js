const express = require('express')
const router = express.Router()
const { userSignup, userLogin, getUserProfile } = require('../controllers/authentication')
const { addProduct, getProducts } = require('../controllers/products')
const upload  = require('../config/multer')
const { userAuth } = require('../middlewares/userAuth')

router.post('/register', userSignup)

router.post('/login', userLogin)

router.post('/product', upload.single('productImage'),addProduct)

router.get('/product',getProducts)

router.get('/profile',userAuth,getUserProfile)

module.exports = router