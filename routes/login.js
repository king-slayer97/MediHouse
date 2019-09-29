var express = require('express');
var router = express.Router();
var ser = require('../server');


var loginID = 0;
var page;

router.get('/', function (req, res, next) {
    if (loginID === 0) {
        res.render('login', {
            validation: 0,
            id: loginID
        });
    }
    else {
        loginID = 0;
        module.exports.loginID = loginID;
        res.render('login', {
            validation: 0,
            id: loginID
        });
    }

});

router.post('/', function (req, res) {
    var requestedData = req.body;
    var query = "select * from users where e_mail = '" + requestedData.userID + "'";
    ser.connection(query, function (data) {
        if (data.rowsAffected[0] === 0) {
            res.render('login', {
                validation: 1,
                loginID: loginID
            });
        }
        else {
            var user = data.recordset[0];
            if (user.password != requestedData.pass) {
                res.render('login', {
                    validation: 2,
                    loginID: loginID
                });
            }
            else {
                if (user.doctor_id != null) {
                    page = 'doc';
                    loginID = user.doctor_id;
                    query = "select * from doctors where doctor_id=" + loginID + " ";
                }
                if (user.nurse_id != null) {
                    page = 'nurse';
                    loginID = user.nurse_id;
                    query = "select * from nurse where nurse_id=" + loginID + " select * from patients where nurse_id=" + loginID + " select * from history where patient_id = any (select patient_id from patients where nurse_id=" + loginID + ") select * from rooms where patient_id = any (select patient_id from patients where nurse_id=" + loginID + " ";
                }
                if (user.admin_id != null) {
                    page = 'admin';
                    loginID = user.admin_id;
                    query = "select * from admin where admin_id = " + loginID + "";
                }
                if (user.patient_id != null) {
                    page = 'patient';
                    loginID = user.patient_id;
                    query = "select * from patients where patient_id=" + loginID + " select * from history where patient_id=" + loginID + " ";
                }

                module.exports.loginID = loginID;
                module.exports.page = page;

                ser.connection(query, function (data) {
                    res.render(page, {
                        data: data,
                        id: loginID,
                        page: page
                    })
                })
            }
        }
    });
});
module.exports.router = router;
module.exports.loginID = loginID;
module.exports.page = page;

