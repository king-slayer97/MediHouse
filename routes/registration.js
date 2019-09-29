var express = require('express');
var router = express.Router();
var ser = require('../server');
var login = require('./login');
router.get('/',function(req,res,next){
    res.render ('registration',{
        title: 'Es',
        loginID: login.loginID
    });
    console.log(ser.connection(query="select * from nurse"));
    
});


// var values = [req.firstName, req.lastName,req.password,req.Mail];
//     ser.connection(query="INSERT INTO users (f_name,l_name,password,e_mail) values('"+req.body.firstName+"','"+ req.body.lastName+"','"+req.body.password+"','"+req.body.Mail+"')"); 

module.exports = router;