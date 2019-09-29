var express = require('express');
var router = express.Router();
var ser = require('../server');
var login = require('./login');


router.get('/', function (req, res, next) {
    var query = "select * from nurse where nurse_id=" + login.loginID + " select * from patients where nurse_id=" + login.loginID + " select * from history where patient_id = any (select patient_id from patients where nurse_id=" + login.loginID + ") select * from rooms where patient_id = any (select patient_id from patients where nurse_id=" + login.loginID + " ";
    ser.connection(query, function (data) {
        res.render('nurse', {
            data: data,
            loginID: login.loginID

        })
    })
})


module.exports = router;