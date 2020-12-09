const User= require('../models/user');
const Product= require('../models/product');
const Cart= require('../models/cart');



exports.userCart=async(req,res)=>{
    const {cart} = req.body;

    let products=[];

    const user = await User.findOne({email:req.user.email}).exec();

    let cartExistByThisUser = await Cart.findOne({orderdBy:user._id}).exec();

    if(cartExistByThisUser){
        cartExistByThisUser.remove();
    }
    for(let i=0;i<cart.length;i++){
        let obj={}
        obj.product=cart[i]._id;
        obj.count=cart[i].count;
        obj.color=cart[i].color;

        let productFromDb =await  Product.findById(cart[i]._id).select('price').exec();

        obj.price=productFromDb.price;
        products.push(obj);
    }
    let cartTotal=0;
    for(let i=0;i<products.length;i++){
        cartTotal= cartTotal + products[i].price * products[i].count;
    }

    let newCart= await Cart({
        products,
        cartTotal,
        orderdBy:user._id,
    }).save();

    res.json({ok:true});
}

exports.getUserCart = async(req,res)=>{
    const user= await User.findOne({email:req.user.email}).exec();

    let cart=await Cart.findOne({orderdBy:user._id}).populate('products.product','_id title price totalAfterDiscount')
    .exec();

    const {products,cartTotal,totalAfterDiscount} = cart;
    res.json({products,cartTotal,totalAfterDiscount});
}


exports.emptyCart =async(req, res)=>{
    const user=await User.findOne({email:req.user.email}).exec();
    const cart= await Cart.findOneAndRemove({orderdBy:user._id}).exec();
    res.json(cart);;
}


exports.saveAddress=async (req, res) => {
    const userAddress= await UserAddress.findOneAndUpdate({
        email:req.user.email
    },{
        address:req.body.address
    }).exec();
    res.json({ok:true});
}