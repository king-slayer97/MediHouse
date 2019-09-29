var express = require('express');
var router = express.Router();
var login = require('./login');
var ser = require('../server');


router.get('/', function (req, res, next) {
    var query = "select * from doctors where spc='Heart disease' select * from doctors where spc='Hepatology' select * from doctors where spc='Huntington' select * from doctors where spc='Dental' select * from doctors where spc='Ophthalmology' select * from doctors where spc='Otology' ";
    if (login.loginID != 0) {
        if (login.page == 'doc')
            query += "select * from doctors where doctor_id=" + login.loginID + " ";

        if (login.page == 'nurse')
            query += "select * from nurse where nurse_id=" + login.loginID + " ";

        if (login.page == 'admin')
            query += "select * from admin where admin_id = " + login.loginID + "";

        if (login.page == 'patient')
            query += "select * from patients where patient_id=" + login.loginID + " ";
    }
    ser.connection(query, function (data) {
        res.render('index', {
            data: data,
            id: login.loginID,
            page: login.page
        })
    })
})


module.exports = router;