const express = require("express");
const router = express.Router();

//MIDDLEWARE
const { authCheck } = require("../middlewares/auth");

//CONTROLERS
const { userCart,getUserCart } = require("../controllers/user");

//route
router.post("/user/cart", authCheck, userCart);
router.get("/user/cart", authCheck, getUserCart);

module.exports = router;
