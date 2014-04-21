var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var config = require('./config/index.js');
var mongoose = require('./lib/mongoose');
var app = express();

// all environments
app.set('port', config.get('port') || 80);

app.engine("ejs", require("ejs-locals"));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.favicon(), path.join(__dirname, 'public'));
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());

var sessionStore = require('./lib/sessionStore');

app.use(express.session({
	secret: config.get('session:secret'),
	key: config.get('session:key'),
	cookie: config.get('session:cookie'),
	store: sessionStore
}));
app.use(require('./lib/loadUser'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

require('./routes')(app);

var server = http.createServer(app);

server.listen(config.get('port'), function(){
	console.log('Express server listening on port ' + config.get('port'));
});

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket){
	socket.emit("news", {"your":"fag"});
	socket.on('other event', function(data){
		console.log(data);
	})
})