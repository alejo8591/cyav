var express = require('express');
var http = require('http');
var path = require('path');
var favicon = require('static-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var routes = require('./routes');
var users = require('./routes/user');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon());
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database("avantelapp.sqlite");

db.serialize(function() {
    db.run("CREATE TABLE IF NOT EXISTS user (id integer primary key autoincrement, email text, password text, firstname text, lastname text)");
    var stmt = db.prepare("INSERT INTO user (email, password, firstname, lastname) VALUES (?, ?, ?, ?)");
    stmt.run("admin@admin.com", "admin", "admin", "server");
    stmt.finalize();
});

//app.get('/', routes.index);
//app.get('/users', users.list);

app.get('/', function(req, res) {
  res.send("Hello world!");
});

/// catch 404 and forwarding to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.render('error', {
        message: err.message,
        error: {}
    });
});

routes = require('./routes/api')(app, db);

module.exports = app;
