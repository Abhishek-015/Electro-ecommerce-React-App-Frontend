const express = require("express");
const router = express.Router();

//importing middlewares
const {authCheck} = require('../middlewares/auth')

//importing controllers
const {createOrUpdateUser} = require("../controllers/auth");

router.post("/create-or-update-user",authCheck, createOrUpdateUser);

module.exports = router;
