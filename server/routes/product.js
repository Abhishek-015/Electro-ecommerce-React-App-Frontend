const express = require("express");
const router = express.Router();

//importing middlewares
const {authCheck, adminCheck} = require('../middlewares/auth')

//importing controllers
const {create,listAll,remove} = require("../controllers/product");

//routes
router.post('/product',authCheck,adminCheck,create)
router.get('/products/:count',listAll)
router.delete('/product/:slug',authCheck,adminCheck,remove)

module.exports = router;


