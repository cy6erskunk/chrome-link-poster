var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('hello world!');
});

app.post('/ok', function(req, res) {
    res.status('200');
    console.log(req.body);
    setTimeout(function () {
        res.send('OK');
    }, 2000);
});

app.post('/error', function(req, res) {
    res.status('500');
    setTimeout(function () {
        res.send('ERROR! BOOM!');
    }, 2000);
});

var server = app.listen(9999, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Test app listening at http://%s:%s', host, port);

});
