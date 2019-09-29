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
            query = "select * from nurse where nurse_id=" + login.loginID + " select * from nurse where nurse_id=" + login.loginID + " select * from patients where nurse_id=" + login.loginID + " select * from history where patient_id = any (select patient_id from patients where nurse_id=" + login.loginID + ") select * from rooms where patient_id = any (select patient_id from patients where nurse_id=" + login.loginID + " ";

        if (login.page == 'admin')
            query = "select * from admin where admin_id = " + login.loginID + "";

        if (login.page == 'patient')
            query = "select * from patients where patient_id=" + login.loginID + " select * from history where patient_id=" + login.loginID + " ";

        ser.connection(query, function (data) {
            res.render(login.page, {
                data: data,
                id: login.loginID,
                page: login.page
            })
        })
    }
    else {
        res.render('login', {
            validation: 0,
            id: loginID
        });
    }
})

router.get('/myPatients', function (req, res, next) {
    if (login.page == 'doc') {

        if (req.query.s != undefined) {
            if (req.query.s === '')
                req.query.s = '?';
            var query = "select * from patients where doctor_id=" + login.loginID + " and concat(concat(first_name, ' '),  last_name) like '" + req.query.s + "%'";
            ser.connection(query, function (data) {
                res.send({ data: data });
            })
        }

        else if (req.query.p != undefined) {
            var datatNeeded = " FORMAT(history.date_enter, 'yyyy-MM-dd HH:mm:ss') as date_enter,FORMAT(history.date_leave, 'yyyy-MM-dd HH:mm:ss') as date_leave, history.disease, history.treatment, history.chronic, history.bill"
            var query = "select * from doctors where doctor_id=" + login.loginID + " select * from patients where first_name='" + req.query.p + "' and doctor_id=" + login.loginID + " select " + datatNeeded + " from patients join history on patients.patient_id = history.patient_id where first_name='" + req.query.p + "' and doctor_id=" + login.loginID + "";
            ser.connection(query, function (data) {
                res.render('doctorPatients', {
                    p: 1,
                    data: data,
                    id: login.loginID,
                    page: login.page
                })
            })
        }

        else {
            var query = "select * from doctors where doctor_id=" + login.loginID + " select * from patients where doctor_id=" + login.loginID + " select * from history where patient_id = any (select patient_id from patients where doctor_id=" + login.loginID + ")";
            ser.connection(query, function (data) {
                res.render('doctorPatients', {
                    p: 0,
                    data: data,
                    id: login.loginID,
                    page: login.page
                })
            })
        }

    }
    else {
        res.render('error', {
            id: login.loginID,
            page: login.page,
            not: "Doctor"
        });
    }
})

router.get('/myHistory', function (req, res, next) {
    if (login.page == 'patient') {
        var query = "select * from patients where patient_id=" + login.loginID + " select * from history where patient_id=" + login.loginID + " ";
        ser.connection(query, function (data) {
            res.render('patientHistory', {
                data: data,
                id: login.loginID,
                page: login.page
            })
        })
    }
    else {
        res.render('error', {
            id: login.loginID,
            page: login.page,
            not: "Patient"
        });
    }
})


router.get('/doctors', function (req, res, next) {
    if (login.page == 'admin') {
        var query = "select * from doctors select * from admin where admin_id = " + login.loginID + "";
        ser.connection(query, function (data) {
            res.render('adminDoctor', {
                data: data,
                id: login.loginID,
                page: login.page
            });
        });
    }
    else {
        res.render('error', {
            id: login.loginID,
            page: login.page,
            not: "Admin"
        });
    }
});

router.post('/add_doctor', function (req, res) {
    if (login.page == 'admin') {

        var insertDoc = "insert into doctors (first_name,last_name,spc,phone,address) values ('" + req.body.firstName + "','" + req.body.lastName + "','" + req.body.docSpec + "','" + req.body.phoneNumber + "','" + req.body.address + "') select doctor_id from doctors where first_name ='" + req.body.firstName + "'";
        ser.connection(insertDoc, function (tmpData) {
            console.log(tmpData);
            var insertUser = "insert into users (name,password,e_mail,doctor_id) values ('" + req.body.firstName + "','" + req.body.Pass + "','" + req.body.Mail + "'," + tmpData.recordset[0].doctor_id + ")";
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
    }
    else {
        res.render('error', {
            id: login.loginID,
            page: login.page,
            not: "Admin"
        });
    }
});


router.post('/rmv_doctor', function (req, res) {
    if (login.page == 'admin') {

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
    }
    else {
        res.render('error', {
            id: login.loginID,
            page: login.page,
            not: "Admin"
        });
    }
});

router.post('/edit_history', function (req, res) {
    if (login.page == 'doc') {
        if (req.query.dn != undefined) {

            var update = "update history set treatment = '" + req.body.Treatment + "', bill = " + req.body.Bill + " where patient_id=" + req.query.dn + " and FORMAT(history.date_enter, 'yyyy-MM-dd HH:mm:ss')='" + req.query.d + "'";
            ser.connection(update, function (noData) {

                var datatNeeded = " FORMAT(history.date_enter, 'yyyy-MM-dd HH:mm:ss') as date_enter,FORMAT(history.date_leave, 'yyyy-MM-dd HH:mm:ss') as date_leave, history.disease, history.treatment, history.chronic, history.bill"
                var query = "select * from doctors where doctor_id=" + login.loginID + " select * from patients where first_name='" + req.query.p + "' and doctor_id=" + login.loginID + " select " + datatNeeded + " from patients join history on patients.patient_id = history.patient_id where first_name='" + req.query.p + "' and doctor_id=" + login.loginID + "";
                
                ser.connection(query, function (data) {
                    res.render('doctorPatients', {
                        p: 1,
                        data: data,
                        id: login.loginID,
                        page: login.page
                    })
                })
            })
        }
        else {
            var datatNeeded = " FORMAT(history.date_enter, 'yyyy-MM-dd HH:mm:ss') as date_enter,FORMAT(history.date_leave, 'yyyy-MM-dd HH:mm:ss') as date_leave, history.disease, history.treatment, history.chronic, history.bill"
            var query = "select * from doctors where doctor_id=" + login.loginID + " select * from patients where first_name='" + req.query.p + "' and doctor_id=" + login.loginID + " select " + datatNeeded + " from patients join history on patients.patient_id = history.patient_id where patients.first_name='" + req.query.p + "' and FORMAT(history.date_enter, 'yyyy-MM-dd HH:mm:ss')='" + req.query.d + "'";
            ser.connection(query, function (data) {
                res.render('doctorPatients', {
                    p: 2,
                    data: data,
                    id: login.loginID,
                    page: login.page
                })
            })
        }
    }
    else {
        res.render('error', {
            id: login.loginID,
            page: login.page,
            not: "Doctor"
        });
    }
});


router.post('/edt_doctor', function (req, res) {
    
    let toBeEdited, value;

    if(req.body.firstName){
        toBeEdited = 'first_name';
        value = req.body.firstName;
    }
    else if(req.body.lastName){
        toBeEdited = 'last_name';
        value = req.body.lastName;
    }
    else if(req.body.docSpec){
        toBeEdited = 'spc';
        value = req.body.docSpec;
    }
    else if(req.body.phoneNumber){
        toBeEdited = 'phone';
        value = req.body.phoneNumber;
    }
    else if(req.body.address){
        toBeEdited = 'address';
        value = req.body.address;
    }
    else{
        res.render('EditingError', {
            id: login.loginID,
            page: login.page,
        });
        return;
    }

    if (login.page == 'admin') {

        var editDoc = "UPDATE doctors SET " + toBeEdited + " = '" + value + "' where doctor_id = " + req.body.edit;
        ser.connection(editDoc, function (noData) {

            var query = "select * from doctors select * from admin where admin_id = " + login.loginID + "";
            ser.connection(query, function (data) {

                res.render('adminDoctor', {
                    data: data,
                    id: login.loginID,
                    page: login.page
                });
            });
        });
    }
    else {
    res.render('error', {
        id: login.loginID,
        page: login.page,
        not: "Admin"
    });
}
});

///////////// handl nurse /////////////////////////
router.get('/Nurses', function (req, res, next) {
    if (login.page == 'admin') {
        var query = "select * from nurse select * from admin where admin_id = " + login.loginID + "";
        ser.connection(query, function (data) {
            res.render('adminNurse', {
                data: data,
                id: login.loginID,
                page: login.page
            });
        });
    }
    else {
        res.render('error', {
            id: login.loginID,
            page: login.page,
            not: "Admin"
        });
    }
});


router.post('/rmv_nurse', function (req, res) {
    if (login.page == 'admin') {

        var deleteDoc = "delete from nurse where nurse_id = " + req.body.dell;
        ser.connection(deleteDoc, function (noData) {

            var query = "select * from nurse select * from admin where admin_id = " + login.loginID + "";
            ser.connection(query, function (data) {

                res.render('adminNurse', {
                    data: data,
                    id: login.loginID,
                    page: login.page
                });
            });
        });
    }
    else {
        res.render('error', {
            id: login.loginID,
            page: login.page,
            not: "Admin"
        });
    }
});

router.post('/add_nurse', function (req, res) {
    if (login.page == 'admin') {

        var insertNurse = "insert into nurse (first_name,last_name,phone,address) values ('" + req.body.firstName + "','" + req.body.lastName + "','"  + req.body.phoneNumber + "','" + req.body.address + "') select nurse_id from nurse where first_name ='" + req.body.firstName + "'";
        ser.connection(insertNurse, function (tmpData) {
            var insertUser = "insert into users (name,password,e_mail,nurse_id) values ('" + req.body.firstName + "','" + req.body.Pass + "','" + req.body.Mail + "'," + tmpData.recordset[0].nurse_id + ")";
            // insert nurse into users don't work !! 
            ser.connection(insertUser, function (noData) {

                var query = "select * from nurse select * from admin where admin_id = " + login.loginID + "";
                ser.connection(query, function (data) {

                    res.render('adminNurse', {
                        data: data,
                        id: login.loginID,
                        page: login.page
                    });
                });
            });
        });
    }
    else {
        res.render('error', {
            id: login.loginID,
            page: login.page,
            not: "Admin"
        });
    }
});



router.post('/edt_nurse', function (req, res) {
    
    let toBeEdited, value;

    if(req.body.firstName){
        toBeEdited = 'first_name';
        value = req.body.firstName;
    }
    else if(req.body.lastName){
        toBeEdited = 'last_name';
        value = req.body.lastName;
    }
    
    else if(req.body.phoneNumber){
        toBeEdited = 'phone';
        value = req.body.phoneNumber;
    }
    else if(req.body.address){
        toBeEdited = 'address';
        value = req.body.address;
    }
    else{
        res.render('EditingError', {
            id: login.loginID,
            page: login.page,
        });
        return;
    }

    if (login.page == 'admin') {

        var editNurse = "UPDATE nurse SET " + toBeEdited + " = '" + value + "' where nurse_id = " + req.body.edit;
        ser.connection(editNurse, function (noData) {

            var query = "select * from nurse select * from admin where admin_id = " + login.loginID + "";
            ser.connection(query, function (data) {

                res.render('adminNurse', {
                    data: data,
                    id: login.loginID,
                    page: login.page
                });
            });
        });
    }
    else {
    res.render('error', {
        id: login.loginID,
        page: login.page,
        not: "Admin"
    });
}
});

//////////////////// handl rooms //////////////////////
router.get('/rooms', function (req, res, next) {
    if (login.page == 'admin') {
        var query = "select * from rooms select * from admin where admin_id = " + login.loginID + "";
        ser.connection(query, function (data) {
            res.render('adminRoom', {
                data: data,
                id: login.loginID,
                page: login.page
            });
        });
    }
    else {
        res.render('error', {
            id: login.loginID,
            page: login.page,
            not: "Admin"
        });
    }
});


router.post('/add_room', function (req, res) {
    if (login.page == 'admin') {

        var insertRoom = "insert into rooms (type,patient_id) values ('" + req.body.roomType + "','"  + req.body.pid + "')";
        
        ser.connection(insertRoom   , function (noData) {

            var query = "select * from rooms select * from admin where admin_id = " + login.loginID + "";
            ser.connection(query, function (data) {

                res.render('adminRoom', {
                    data: data,
                    id: login.loginID,
                    page: login.page
                });
            });
        });
        
    }
    else {
        res.render('error', {
            id: login.loginID,
            page: login.page,
            not: "Admin"
        });
    }
});


router.post('/rmv_room', function (req, res) {
    if (login.page == 'admin') {

        var deleteDoc = "delete from rooms where room_id = " + req.body.dell;
        ser.connection(deleteDoc, function (noData) {

            var query = "select * from rooms select * from admin where admin_id = " + login.loginID + "";
            ser.connection(query, function (data) {

                res.render('adminRoom', {
                    data: data,
                    id: login.loginID,
                    page: login.page
                });
            });
        });
    }
    else {
        res.render('error', {
            id: login.loginID,
            page: login.page,
            not: "Admin"
        });
    }
});
/*
router.post('/add_nurse', function (req, res) {
    if (login.page == 'admin') {

        var insertNurse = "insert into nurse (first_name,last_name,phone,address) values ('" + req.body.firstName + "','" + req.body.lastName + "','"  + req.body.phoneNumber + "','" + req.body.address + "') select nurse_id from nurse where first_name ='" + req.body.firstName + "'";
        ser.connection(insertNurse, function (tmpData) {
            var insertUser = "insert into users (name,password,e_mail,nurse_id) values ('" + req.body.firstName + "','" + req.body.Pass + "','" + req.body.Mail + "'," + tmpData.recordset[0].nurse_id + ")";
            // insert nurse into users don't work !! 
            ser.connection(insertUser, function (noData) {

                var query = "select * from nurse select * from admin where admin_id = " + login.loginID + "";
                ser.connection(query, function (data) {

                    res.render('adminNurse', {
                        data: data,
                        id: login.loginID,
                        page: login.page
                    });
                });
            });
        });
    }
    else {
        res.render('error', {
            id: login.loginID,
            page: login.page,
            not: "Admin"
        });
    }
});



router.post('/edt_nurse', function (req, res) {
    
    let toBeEdited, value;

    if(req.body.firstName){
        toBeEdited = 'first_name';
        value = req.body.firstName;
    }
    else if(req.body.lastName){
        toBeEdited = 'last_name';
        value = req.body.lastName;
    }
    
    else if(req.body.phoneNumber){
        toBeEdited = 'phone';
        value = req.body.phoneNumber;
    }
    else if(req.body.address){
        toBeEdited = 'address';
        value = req.body.address;
    }
    else{
        res.render('EditingError', {
            id: login.loginID,
            page: login.page,
        });
        return;
    }

    if (login.page == 'admin') {

        var editNurse = "UPDATE nurse SET " + toBeEdited + " = '" + value + "' where nurse_id = " + req.body.edit;
        ser.connection(editNurse, function (noData) {

            var query = "select * from nurse select * from admin where admin_id = " + login.loginID + "";
            ser.connection(query, function (data) {

                res.render('adminNurse', {
                    data: data,
                    id: login.loginID,
                    page: login.page
                });
            });
        });
    }
    else {
    res.render('error', {
        id: login.loginID,
        page: login.page,
        not: "Admin"
    });
}
});

*/
module.exports = router;