
var express = require('express');
var path = require('path');
var logger = require('morgan');
const cors = require('cors');
const compression = require('compression');
require('express-async-errors');
require('./db_modules/dbconnection');

var app = express();


app.use(cors());
app.use(compression());
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));

app.use(function (req, res, next) {  
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
var usersRouter = require('./routes/userroutes');
var indexRouter = require('./routes/index');
var absenceRouter = require('./routes/absenceroutes');
var commonRouter = require('./routes/commonroutes');
var timestampRouter = require('./routes/timestamproutes');

app.use(express.json({
  limit: '50mb'
}));
app.use(express.urlencoded({
  limit: '50mb',
  extended: true,
  parameterLimit: 50000
}));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/Users', usersRouter);

//router.use(require('./helper/tokenchecker'))
const tokenChecker = require('./helper/tokenchecker');
app.use('/',  indexRouter);
app.use(tokenChecker);
app.use('/absence', absenceRouter);
app.use('/common', commonRouter);
app.use('/timestamp', timestampRouter);

// error handler
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    return res.send({
      "status": "error",
      "errorMessage": err.message
    });
  });
}
// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  return res.send({
    "status": "error",
    "errorMessage": "Error occured"
  });
});
app.set('port', (process.env.PORT || 8090));
app.listen(app.get('port'), function () {
  // console.log('Server started on port '+app.get('port'));
});

module.exports = app;
