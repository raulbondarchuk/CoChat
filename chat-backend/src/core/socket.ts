import { Server, Socket } from 'socket.io';
import http from 'http';

export default (http: http.Server) => {
    const io = new Server(http, {cors: {origin: "*"}});

    io.on('connection', function(socket: Socket) {
        console.log('socket.io works');
        
    });

    

    return io;
};