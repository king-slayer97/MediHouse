var express = require('express');
var router = express.Router();
var ser = require('../../server');
var login = require('../login');


router.get('/', function (req, res, next) {
    var query = "select * from patients where patient_id=" + login.loginID + " select * from history where patient_id=" + login.loginID + " ";
    ser.connection(query, function (data) {
        res.render('patient', {
            data: data,
            id: login.loginID,
            page: login.page
        })
    })
})


module.exports = router;