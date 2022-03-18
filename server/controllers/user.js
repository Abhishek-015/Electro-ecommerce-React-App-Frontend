const User = require("../models/user");
const Product = require("../models/product");
const Cart = require("../models/cart");
const Coupon = require("../models/coupon");
const cart = require("../models/cart");
const Order = require("../models/order");

exports.userCart = async (req, res) => {
  console.log(req.body); //{cart:[]}
  const { cart } = req.body;

  let products = [];
  const user = await User.findOne({ email: req.user.email }).exec();

  //check if cart with logged in user id is already exist
  let cartExistByThisUser = await Cart.findOne({ orderdBy: user._id }).exec();

  if (cartExistByThisUser) {
    cartExistByThisUser.remove();
    // console.log("removed old cart");
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};
    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;
    //get price for creatinf total
    let { price } = await Product.findById(cart[i]._id).select("price").exec();
    object.price = price;

    products.push(object);
  }
  //   console.log("products", products);

  let cartTotal = 0;
  for (let i = 0; i < products.length; i++) {
    cartTotal += products[i].price * products[i].count;
  }

  // console.log("cartTotal------>", cartTotal);

  let newCart = await new Cart({
    products,
    cartTotal,
    orderedBy: user._id,
  }).save();

  //   console.log("new cart", JSON.stringify(newCart,null,4));
  res.json({ ok: true });
};

exports.getUserCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  let cart = await Cart.findOne({ orderdBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

  const { products, cartTotal, totalAfterDiscount } = cart;

  res.json({ products, cartTotal, totalAfterDiscount });
};

exports.emptyCart = async (req, res) => {
  const user = await User.findOne({ email: req.user.email }).exec();
  const cart = await Cart.findOneAndRemove({ orderdBy: user._id }).exec();
  res.json(cart);
};

exports.saveAddress = async (req, res) => {
  const userAddress = await User.findOneAndUpdate(
    { emai: req.user.email },
    { address: req.body.address }
  ).exec();
  res.json({ ok: true });
};

exports.applyCouponToUserCart = async (req, res) => {
  const { coupon } = req.body;

  const validCoupon = await Coupon.findOne({ name: coupon }).exec();
  if (validCoupon === null) {
    return res.json({
      err: "Invalid Coupon",
    });
  }
  // console.log("Valid coupon,",validCoupon)

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products, cartTotal } = await Cart.findOne({
    orderedBy: user._id,
  })
    .populate("products.product", "_id title price")
    .exec();

  // console.log("cartTotal", cartTotal, "discount", validCoupon.discount);

  // calculate the total after discount
  let totalAfterDiscount = (
    cartTotal -
    (cartTotal * validCoupon.discount) / 100
  ).toFixed(2);

  // console.log("totalAfterDiscount", totalAfterDiscount);
  cart
    .findOneAndUpdate(
      { orderedBy: user._id },
      { totalAfterDiscount },
      { new: true }
    )
    .exec();

  res.json(totalAfterDiscount);
};

exports.createOrder = async (req, res) => {
  const paymentIntent = req.body.stripeResponse;
  const user = await User.findOne({ email: req.user.email }).exec();
  let { products } = await Cart.findOne({ orderedBy: user._id }).exec();

  let newOrder = await new Order({
    products,
    paymentIntent,
    orderdBy: user._id,
  }).save();

 //decrement the quantity on sold from the total stock we have
 let bulkOption = products.map(el=>{
   return {
     updateOne:{
       filter:{_id:el.product._id},
       update:{$inc:{quantity:-el.count,sold:+el.count}},
     }
   }
 })

 let updated = await Product.bulkWrite(bulkOption,{})
 console.log("updated------------>",updated)

console.log("NEW ORDER SACVED",newOrder)

  res.json({ ok: true });
};
