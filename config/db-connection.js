const mongoose = require('mongoose');
const debug = require('debug')("mongoose:development");
const config = require('config');
mongoose
.connect(`${config.get('MONGOOSE_URI')}/bagproject-db`)
.then(function (){
    debug("Connected to MongoDB");
})
.catch(function (err) {
    console.log("Could not connect to MongoDB",err);
});
 module.exports = mongoose.connection;

