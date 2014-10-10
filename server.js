var express = require('express');
var app = express();
var port = process.env.PORT || 3000;
var mongoose = require('mongoose');
var passport = require('passport');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var configDb = require('./config/database.js');

mongoose.connect(configDb.url);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.all('*', function(req, res, next) {	
  res.header("Access-Control-Allow-Origin", req.headers.origin); //NB: Remove before production
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', true);
  next();
 });

app.use(session({
	secret: 'mathiasersuperkulogbest',
	resave: true,
	saveUninitialized: true
}));
    
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
require('./routes/routes.js')(app, passport);

app.listen(port);
console.log('Server running on port: ' + port);


