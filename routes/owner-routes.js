const express= require('express');
const router= express.Router();
const {upload}= require('../middlewares/multer-logic');
const product = require('../models/product-model');
const {isloggedin}= require('../middlewares/islloggedin');

router.get('/', isloggedin,function(req, res){
    res.render('productCreation');
})

router.post('/product/create',upload.single('file'), async function(req, res){
    let{
        name,
       price,
       discount,
       bgcolor,
       panelcolor,
       textcolor}=req.body;

       let products = await product.create({image:req.file.buffer, name,price,discount,bgcolor,panelcolor,textcolor});
    
       let prod= await product.find();

res.render('shop',{prod});
});
module.exports = router;