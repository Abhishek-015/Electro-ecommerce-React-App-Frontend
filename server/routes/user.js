const express = require("express");
const router = express.Router();

//MIDDLEWARE
const { authCheck } = require("../middlewares/auth");

//CONTROLERS
const { userCart } = require("../controllers/user");

//route
router.post("/user/cart", authCheck, userCart);

module.exports = router;
