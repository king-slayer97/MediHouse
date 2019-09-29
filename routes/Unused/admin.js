var express = require('express');
var router = express.Router();
var ser = require('../../server');
var login = require('../login');


router.get('/', function (req, res, next) {
    var query = "select * from admin where admin_id = " + login.loginID + "";
    ser.connection(query, function (data) {
        res.render('admin', {
            data: data,
            id: login.loginID,
            page: login.page
        });
    })
});

router.get('/doctors', function (req, res, next) {
    var query = "select * from doctors select * from admin where admin_id = " + login.loginID + "";
    ser.connection(query, function (data) {
        res.render('adminDoctor', {
            data: data,
            id: login.loginID,
            page: login.page
        });
    });
});

router.post('/add_doctor', function (req, res, next) {
    var docData = "select * from doctors";
    ser.connection(docData, function (oldDoc) {

        var docId = oldDoc.recordset.length + 1;
        var insertDoc = "insert into doctors (doctor_id,first_name,last_name,spc,phone,address) values (" + docId + ",'" + req.body.firstName + "','" + req.body.lastName + "','" + req.body.docSpec + "','" + req.body.phoneNumber + "','" + req.body.address + "')";
        ser.connection(insertDoc, function (noData) {

            var insertUser = "insert into users (name,password,e_mail,doctor_id) values ('" + req.body.firstName + "','" + req.body.Pass + "','" + req.body.Mail + "'," + docId + ")";
            ser.connection(insertUser, function (noData) {

                var query = "select * from doctors select * from admin where admin_id = " + login.loginID + "";
                ser.connection(query, function (data) {

                    res.render('adminDoctor', {
                        data: data,
                        id: login.loginID,
                        page: login.page
                    });
                });
            });
        });
    });

});


router.post('/rmv_doctor', function (req, res) {

    var deleteUser = "delete from users where doctor_id = " + req.body.dell;
    ser.connection(deleteUser, function (noData) {

        var deleteDoc = "delete from doctors where doctor_id = " + req.body.dell;
        ser.connection(deleteDoc, function (noData) {

            var query = "select * from doctors select * from admin where admin_id = " + login.loginID + "";
            ser.connection(query, function (data) {

                res.render('adminDoctor', {
                    data: data,
                    id: login.loginID,
                    page: login.page
                });
            });
        });
    });

});


module.exports = router;