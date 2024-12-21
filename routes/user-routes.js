const express= require('express');
const router= express.Router();
const user = require('../models/user-model')




router.get('/', function(req, res){
    res.send('welcome to the user route');
})
if(process.env.NODE_ENV==='development'){
    console.log(process.env.NODE_ENV);
    router.get('/create', async function(req,res){
        let {fullname, email, password,contact}= req.body;
        const users= await user.find();
        if(users.length>0){
            res.send('user already exist');

        }
        const usercreated =  await user.create(
            {
fullname:'harshit singh',
email:'harshit@gmail.com',
password:'123456789',
contact:9999999999,
isadmin:false,
            } );

   console.log(usercreated)     });}
module.exports = router;