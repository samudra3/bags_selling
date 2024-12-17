const express= require('express');
const app = express();
const product=require('./models/product-model')
const user=require('./models/user-model')
const cookieparser= require('cookie-parser');
const bcrypt= require('bcrypt');
const jwt= require('jsonwebtoken');
const path= require('path');
const db = require('./config/db-connection');
const userroute = require('./routes/user-routes')
const productroute = require('./routes/product-routes')
const ownerroute = require('./routes/owner-routes')
app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/user', userroute);
app.use('/product', productroute);
app.use('/owner', ownerroute);
app.set('view engine','ejs');


app.get('/', function(req, res){
    res.send('welcome');
});
app.listen(3000, function(){
    console.log('Server is running on port 3000');
});