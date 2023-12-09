var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors = require('cors');
var AdminLoginRouter = require('./routes/AdminLogin');
var DistrictViewRouter = require('./routes/DistrictView');
var locationregRouter = require('./routes/locationreg');
var LocationViewRouter = require('./routes/LocationView');
var LocationEditViewRouter = require('./routes/LocationEditView');
var LocationUpdateRouter = require('./routes/LocationUpdate');
var LocationDeleteRouter = require('./routes/locationdelete');
var connectiontyperegteRouter = require('./routes/connectiontypereg');
var connectiontypedeleteRouter = require('./routes/connectiontypedelete');
var customerregloginRouter = require('./routes/customerreglogin');
var newconnectionRouter = require('./routes/newconnectionreg');
var paymentRouter = require('./routes/payment');
var monthlypaymentRouter = require('./routes/monthlypayment');
var ReportsRouter = require('./routes/Reports');

var app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/index', indexRouter);
app.use('/users', usersRouter);
app.use('/adminlogin',AdminLoginRouter);
app.use('/districtview',DistrictViewRouter);
app.use('/locationreg',locationregRouter);
app.use('/LocationView', LocationViewRouter);
app.use('/LocationEditView', LocationEditViewRouter);
app.use('/LocationUpdate', LocationUpdateRouter);
app.use('/Locationdelete', LocationDeleteRouter);
app.use('/connectiontypereg', connectiontyperegteRouter);
app.use('/connectiontypedelete', connectiontypedeleteRouter);
app.use('/customerregistration', customerregloginRouter);
app.use('/newconnection', newconnectionRouter);
app.use('/payment', paymentRouter);
app.use('/monthlypayment', monthlypaymentRouter);
app.use('/Reports', ReportsRouter);

module.exports = app;
