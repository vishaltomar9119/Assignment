var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/its')
.then(() => console.log('Connected!'));

var models = require('./bootstrap/models')(mongoose);


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

mongoose.Promise =  global.Promise;
app.use( function( req, res ,next){
  req.nosql = mongoose;
  global.nosql = req.nosql;
  next();
})


var engine = require('express-dot-engine');

app.engine('dot', engine.__express);
app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'dot');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
