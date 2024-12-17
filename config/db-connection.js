const mongoose = require('mongoose');
mongoose
.connect("mongodb://localhost:27017/E-userdata")
.then(function (){
    console.log("Connected to MongoDB");
})
.catch(function (err) {
    console.log("Could not connect to MongoDB",err);
});
 module.exports = mongoose.connection;

