const express = require("express");
const router = express.Router();

//importing middlewares
const {authCheck, adminCheck} = require('../middlewares/auth')

//importing controllers
const {create} = require("../controllers/product");

//routes
router.post('/product',authCheck,adminCheck,create)

module.exports = router;


