const express = require("express");
const router = express.Router();

//importing middlewares
const {authCheck, adminCheck} = require('../middlewares/auth')

//importing controllers
const {create,listAll} = require("../controllers/product");

//routes
router.post('/product',authCheck,adminCheck,create)
router.get('/products/:count',listAll)

module.exports = router;


