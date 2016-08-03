var express = require('express');
var swig = require('swig');
var app = express();


//var socketio = require('socket.io');

var routes = require('./routes/');


app.use(express.static(__dirname + '/public'));

app.engine('html', swig.renderFile);
app.set('view engine','html');
app.set('views', __dirname + '/views');
app.set('view cache',false);
swig.setDefaults({cache: false});

app.use('/', routes);

var server = app.listen(3000);
//var io = socketio.listen(server);


console.log('server listening');