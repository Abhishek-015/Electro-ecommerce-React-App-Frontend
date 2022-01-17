const express = require("express");
const router = express.Router();

//importing middlewares
const {authCheck, adminCheck} = require('../middlewares/auth')

//importing controllers
const {create,read} = require("../controllers/product");

//routes
router.post('/product',authCheck,adminCheck,create)
router.get('/products',read)

module.exports = router;


