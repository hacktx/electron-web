var express = require('express');
var app = express();
var session = require('express-session');
var swig = require('swig');

var sess = {
  secret: 'HackTX Checkin',
  cookie: {},
  resave: false,
  saveUninitialized: true
};
app.use(session(sess));

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.get('/', function (req, res) {
  res.render('index-login');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
