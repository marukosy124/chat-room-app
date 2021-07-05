// Setup basic express server
const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const cors = require('cors');
const io = require('socket.io')(server, {
	headers: {
		'Access-Control-Allow-Origin': '*',
	},
	cors: {
		origin: '*',
	},
});

const port = process.env.PORT || 5000;

server.listen(port, () => {
	console.log('Server listening at port %d', port);
});

// Routing
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

io.on('connection', (socket) => {
	socket.on('join_room', (data) => {
		socket.join(data.room);
	});

	socket.on('send_message', (data) => {
		socket.to(data.room).emit('receive_message', data);
	});

	socket.on('disconnect', () => {
		// console.log("USER DISCONNECTED");
	});
});
