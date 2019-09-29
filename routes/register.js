var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser')
var urlenco = bodyParser.urlencoded({extended:false});
var ser = require('../server');

router.get('/',function(req,res,next){
    res.render ('register',{
        title: 'Es'
    });
   
})

router.post('/reg',urlenco,(req,res,next)=>{
   // console.log(req.body);    
   var values = [req.firstName, req.lastName,req.password,req.Mail];
   ser.connection(query="INSERT INTO users (f_name,l_name,password,e_mail) values('"+req.body.firstName+"','"+ req.body.lastName+"','"+req.body.password+"','"+req.body.Mail+"')");
   //ser.connection(query="select * from users ");
   /*console.log("we are here"); 
    var request = new sql.Request();
    console.log("we are here hhhh"); 
    //var s = "INSERT INTO users (f_name,l_name,password,e_mail) VALUES ?";
    
    
    //request.query(s,[values], function (err, recordset) {
        
        request.query("select * from users", function (err, recordset) {
        if (err) console.log(err);

        // send records as a response
        console.log(recordset);
        console.log("we are here 2 "  );


    });*/

});
module.exports = router;