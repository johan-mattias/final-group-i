var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');
var getCourses = require('./routes/getCourses');
var getReviews = require('./routes/getReviews');
var getComments = require('./routes/getComments');
var getUser = require('./routes/getUser');
var addReview = require('./routes/addReview');
var auth = require('./routes/auth');
var reg = require('./routes/reg');
var like = require('./routes/like');
var dislike = require('./routes/dislike');
var addComment = require('./routes/addComment');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors())

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', index);
app.use('/api/courses', getCourses);
app.use('/api/reviews', getReviews);
app.use('/api/comments', getComments);
app.use('/api/user', getUser);
app.use('/api/addreview', addReview);
app.use('/api/auth', auth);
app.use('/api/reg', reg);
app.use('/api/like', like);
app.use('/api/dislike', dislike);
app.use('/api/addcomment', addComment);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
