import { Server } from 'socket.io';

export default function handler(req, res) {
  const tryb_jeden_do_jeden = true
  if (tryb_jeden_do_jeden) {
    if (!res.socket.server.io) {
      console.log("Socket inicjalizowany")
      const io = new Server(res.socket.server, {
        allowEIO3: true,
        path: "/api/socket_io",
        addTrailingSlash: false,
      });
      res.socket.server.io = io;
      io.on('connection', (socket) => {
        console.log('New client connected');
        socket.on('message', (msg) => {
          socket.emit('message', msg);
        });
        socket.on('disconnect', () => {
          console.log('Client disconnected');
        });
      });
    }
  }
  console.log("test")
  if (!res.socket.server.io) {
		console.log("Socket inicjalizowany")
		const io = new Server(res.socket.server, {
      allowEIO3: true,
      path: "/api/socket_io",
      addTrailingSlash: false,
    });
		res.socket.server.io = io;

		// io.on('connection', (socket) => {
		// 		console.log('New client connected');
		// 		socket.on('disconnect', () => {
		// 		console.log('Client disconnected');
		// 	});
		// });
		io.on('connection', (socket) => {
			console.log('New client connected');
			socket.on('message', (msg) => {
				io.emit('message', msg);
			});
			socket.on('disconnect', () => {
				console.log('Client disconnected');
			});
		});
	}
  res.end();
}