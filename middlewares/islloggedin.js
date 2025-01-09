const jwt = require("jsonwebtoken");

module.exports.isloggedin= function(req,res,next){
    let token= req.cookies.token;
    if(!token){
        console.log('you need to login or register first');
        res.redirect('/user');
return;
    }
    let result=jwt.verify(token, process.env.JWT_KEY);
    
req.user=result;
next();
};
