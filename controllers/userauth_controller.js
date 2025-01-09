const bcrypt = require('bcrypt');
const user = require('../models/user-model')

const {generateToken} = require('../utils/tokenGenerator');
module.exports.register=  async function(req,res)
{let {fullname, email, password}= req.body;
let userfind= await user.findOne({email});
console.log(userfind);
if(userfind){
    res.status(400).send('User already exists');
return;
}
bcrypt.genSalt(10, password, function(err, salt){
bcrypt.hash(password, salt,async function(err,hash){
let createdUser= await user.create({
fullname,
email,
password
})
res.cookie('token',generateToken(createdUser))

res.render('shop');
});
});}