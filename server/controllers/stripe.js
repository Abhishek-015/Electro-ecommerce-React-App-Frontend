const User = require('../models/user')
const Cart = require('../models/cart')
const Product = require('../models/product')
const Coupon = require('../models/coupon')
const stripe = require('stripe')(process.env.STRIPE_SECRET)

exports.createPaymentIntent = async (req,res) => {
    //later apply coupon
    //later calculate price as well
    const paymentIntent = await stripe.paymentIntents.create({
        amount:100,
        currency:"INR"
    });


    console.log("payementIntent----------->",paymentIntent)

    res.send({
        clientSecret : paymentIntent.client_secret,
    })
}