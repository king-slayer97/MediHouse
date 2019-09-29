var express = require('express');
var router = express.Router();
var ser = require('../../server');
var login = require('../login');
const sql = require('../../server');

require('mssql')


router.get('/', function (req, res, next) {
    if (login.loginID != 0) {
        var query = "select * from doctors where doctor_id=" + login.loginID + " select * from patients where doctor_id=" + login.loginID + " select * from history where patient_id = any (select patient_id from patients where doctor_id=" + login.loginID + ")";
        ser.connection(query, function (data) {
            res.render('doctorPatients', {
                data: data,
                id: login.loginID,
                page: login.page
            })
        })
    }
})




module.exports = router;