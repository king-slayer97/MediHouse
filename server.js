var express = require('express');
var app = express();
var path = require('path');
var sql = require("mssql");
var login = require("./routes/login");
var bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.locals.id = login.loginID;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const PORT = 5050;

var routes = require('./routes/index');
app.use('/', routes);
var about = require('./routes/about');
app.use('/about', about);
var appointment = require('./routes/appointment');
app.use('/appointment', appointment);
var blog = require('./routes/blog');
app.use('/blog', blog);
var department = require('./routes/department');
app.use('/department', department);
var doctor = require('./routes/doctor');
app.use('/doctors', doctor);
var services = require('./routes/services');
app.use('/services', services);
var login = require('./routes/login').router;
app.use('/login', login);
var profile = require('./routes/profile');
app.use('/profile', profile);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
})

if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err,
            id: login.loginID,
            page: login.page,
            not: "NINJA"
        });
    });
}

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {},
        id: login.loginID,
        page: login.page
});
});


// config for your database
var config = {
    user: 'sa',
    password: '123',
    server: 'localhost\\HOSPITAL',
    database: 'Hospital',
    port: PORT,
    dialect: 'mssql'
};


function connection(query, callback) {
    var conn = new sql.ConnectionPool(config);
    var req = new sql.Request(conn);

    conn.connect(function (err) {
        // create Request object
        req.query(query, function (err, recordset) {
            if (err) {
                console.log(err);
                return;
            }
            callback(recordset);

            conn.close();
        });
    });
}


var server = app.listen(PORT, function () {
    console.log(`Server is running on port ${PORT}..`);
});


module.exports.connection = connection;
