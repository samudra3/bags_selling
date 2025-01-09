const express= require('express');
const app = express();
const db = require('./config/db-connection')
require('dotenv').config();
const cookieparser= require('cookie-parser');
const path= require('path');
const userroute = require('./routes/user-routes')
const productroute = require('./routes/product-routes')
const ownerroute = require('./routes/owner-routes')
const session = require('express-session');
const flash = require('connect-flash');
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
 // for development only, in production set secure to true  // secure: true, maxAge: 60000 * 60 * 24 * 30 // 30 days
}))
app.use(flash());

app.use(express.json());
app.use(cookieparser());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine','ejs');
app.use('/user', userroute);
app.use('/product', productroute);
app.use('/owner', ownerroute);



app.get('/', function(req, res){
    let message = req.flash('error');
    res.render('index',{message});
});
app.listen(3000, function(){
    console.log('Server is running on port 3000');
});