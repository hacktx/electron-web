var express = require('express');
var app = express();
var session = require('express-session');
var swig = require('swig');
var bodyParser = require('body-parser')
var request = require('request');

var sess = {
  secret: 'HackTX Checkin',
  cookie: {},
  resave: false,
  saveUninitialized: true
};
app.use(session(sess));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
})); 

app.use(express.static(__dirname + '/public'));
app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

app.post('/login', function(req, res) {
  req.session.volunteer_id = req.body.id;
  res.redirect('/');
});

app.get('/logout', function(req, res) {
  req.session.volunteer_id = undefined;
  res.redirect('/');
});

app.get('/', function (req, res) {
  if(!req.session.volunteer_id) {
    res.render('index-login');
  } else {
    res.render('dashboard', { volunteer_id: req.session.volunteer_id });
  }
});

app.get('/review', function(req, res) {
  if(!req.session.volunteer_id) {
    res.redirect('/');
  }

  email = req.query.email;
  url = 'https://my.hacktx.com/api/user?volunteer_id=' + req.session.volunteer_id + '&email=' + email;
  request.get(url, function(error, response, body) {
    res.render('review', { volunteer_id: req.session.volunteer_id, user: JSON.parse(body) });
  });
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
