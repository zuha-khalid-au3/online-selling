const User= require('../models/user');
const Cart= require('../models/cart');
const Product= require('../models/product');
const Coupon= require('../models/coupon');
const Paytm=require('paytm-pg-node-sdk')(process.env.MERCHANT_KEY);



exports.createPaymentIntent= async (req, res) => {

    const paymentIntent= await User.findOne({email:req.user.email}).exec();

    const {cartTotal}= await Cart.findOne({orderdBy:user._id}).exec();

}