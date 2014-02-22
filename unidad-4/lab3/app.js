var express = require('express');
app = express();
http = require('http');
server = http.createServer(app);
io = require('socket.io').listen(server);


server.listen(8585);

// routing URL
app.get('/', function(req, res){
	res.sendfile(__dirname + '/index.html');
});

// usernames wich current connect in this chat
var usernames = {};

io.sockets.on('connection', function(socket){
	// cuando el clliente emite 'sendchat' el escucha y ejecuta
	socket.on('sendchat', function(data){
		// indicación al cliente para que ejecute "updatechat" con 2 parametros
		io.sockets.emit('updatechat', socket.username, data);
	});

	// cuando el cliente emite "adduser" adiciona un usuario al chat
	socket.on('adduser', function(username){
		// Guardamos el nombre de usuario en la sesión del socket de este cliente "username"
		socket.username = username;
		// Agregamos el nombre usuario pasado por el parametro al objeto global "usernames"
		usernames[username] = username;
		// al cliente le emite un mensaje de "Esta conectado" 
		socket.emit('updatechat', 'SERVER', 'Esta conectado');
		// realiza un broadcast anunciando a los demas usuarios que esta conectado
		socket.broadcast.emit('updatechat', 'SERVER', username + ' Esta conectado!');
	});

	// Cuando el usuario se desconecta
	socket.on('disconnect', function(){
		// removiendo el usuario del objeto global
		delete usernames[socket.username];
		// Actualizando la lista de usuarios en el cliente
		io.sockets.emit('updateusers', usernames);
		// Realiza un broadcasta anunciando que el usuario se retiro
		socket.broadcast.emit('updatechat', 'SERVER', socket.username + ' Esta desconectado!');
	});
});


