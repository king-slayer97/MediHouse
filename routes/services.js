var express = require('express');
var router = express.Router();
var ser = require('../server');
var login = require('./login');


router.get('/', function (req, res, next) {
    if (login.loginID != 0) {
        var query;
        if (login.page == 'doc')
            query = "select * from doctors where doctor_id=" + login.loginID + " ";

        if (login.page == 'nurse')
            query = "select * from nurse where nurse_id=" + login.loginID + " ";

        if (login.page == 'admin')
            query = "select * from admin where admin_id = " + login.loginID + "";

        if (login.page == 'patient')
            query = "select * from patients where patient_id=" + login.loginID + " ";

        ser.connection(query, function (data) {
            res.render('services', {
                data: data,
                id: login.loginID,
                page: login.page
            })
        })
    }
    else {
        res.render('services', {
            id: login.loginID,
            page: login.page
        });
    }
})
module.exports = router;