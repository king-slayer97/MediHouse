var express = require('express');
var router = express.Router();
var ser = require('../server');
var login = require('./login');


router.get('/', function (req, res, next) {
    if (login.loginID != 0) {
        var query = "select * from doctors where doctor_id=" + login.loginID + " ";
        ser.connection(query, function (data) {
            res.render('doc', {
                data: data,
                id: login.loginID,
                page: login.page
            })
        })
    }
})



module.exports = router;