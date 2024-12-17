const express= require('express');
const router= express.Router();

router.get('/', function(req, res){
    res.send('welcome to the user route');
})
module.exports = router;