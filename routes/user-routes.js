const express= require('express');
const router= express.Router();
const user = require('../models/user-model')
const product = require('../models/product-model');
let {register}= require('../controllers/userauth_controller');
const bcrypt = require('bcrypt');
const { isloggedin } = require('../middlewares/islloggedin');
const {generateToken} = require('../utils/tokenGenerator');


router.get('/', function(req, res){
    let message = req.flash('error');
    console.log(message);
    res.render('index',{message});
})


try{
    router.post('/register', register)}
catch(err){
   console.error(err.message);
}
try{
    router.post('/login', async function(req, res){
let {email, password} = req.body;

let userfind = await user.findOne({email:email});
if(!userfind) {
    req.flash('error', 'Incorrect UserId')
    res.redirect('/user');
return;}
    let decoded =  bcrypt.compare(password,userfind.password);

    if(!decoded) {
         req.flash('error', 'Incorrect UserId')
        res.redirect('/user');
        return;
    }
    let prod= await product.find();
res.cookie('token',generateToken(userfind));
let message= req.flash('success');
    res.render('shop',{prod,message});

    })}
catch(err){
   console.error(err.message);
}
try{
    router.get('/cart/:productId', isloggedin, async function(req,res){

let {email}= req.user;

let userfind = await user.findOne({ email: email});

userfind.cart.push(req.params.productId);
 await userfind.save();
 req.flash('success','added to cart');
 res.redirect('/user/shop');
    })
}

catch(err){
   console.error(err.message);
}
router.get('/shop', async function(req, res) {
    let prod= await product.find();
    let message= req.flash('success');

    res.render('shop',{message,prod});
});
try{
    router.get('/logout', isloggedin, function(req, res){
    res.cookie('token',);
    res.redirect('/');
    })
}
catch(err){
   console.error(err.message);
}
try{
    router.get('/cart', isloggedin, async function(req,res){

let {email}= req.user;

let userfind = await user.findOne({ email: email}).populate('cart');


 res.render('cart', {userfind});
    })
}
catch(err){
   console.error(err.message);
}

module.exports = router;