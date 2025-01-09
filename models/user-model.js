const mongoose = require('mongoose');

const userschema= new mongoose.Schema({
fullname:{
    type:String,
    minLength:3,
    trim:true,
},
email:String,
password:String,
cart:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'product',
    default:[],
}],
isadmin:Boolean,
orders:{type:Array,
    default:[],
},
contact:Number,
picture:String

});
module.exports=mongoose.model('User', userschema);