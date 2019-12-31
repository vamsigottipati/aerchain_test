var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');

var cors = require("cors")
var bodyParser = require("body-parser")
var pr = require("./routes/products")

var app = express();
app.use(cors())
app.use(bodyParser.json())

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', pr)

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
app.listen(5000)
console.log("listening on port 5000")
