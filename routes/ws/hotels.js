const hotelNotifyEmitter = require('../../core/events/hotelNotifyEmitter')

module.exports = io => {

    hotelNotifyEmitter.on('hotel.notify',  ob =>
        io.of('hotels').emit('broadcast', {anama: "roukou", sikolo: ob}));

    return io
        .of('hotels')
        .use(require('socketio-jwt').authorize({
            secret: 'top_secret',
            handshake: true
        }))
        .on('connection', socket => {
            let currentRoom = socket.handshake.query.token;

            socket.join(currentRoom);
            socket.on('message', msg => {
                socket.emit('hey', {msg: msg, answer: true})
                socket.in(currentRoom).emit('roomie', {msg: msg, intoRoom: currentRoom});
                // todo check io.nsps to broadcast to all clients, even if they are connected to other namespace
                io.of('hotels').emit('broadcast', {OLOI: "MAZI"});
                io.of('customers').emit('broadcast', {OLOI: "MAZI"});
            });
            socket.on('assign', msg => {
                console.log(socket.conn.pingTimeoutTimer._idleStart)
                console.log(socket.decoded_token)
                socket.emit('hey', {msg: msg, answer: true, token: socket.handshake.query.token, rooms: socket.rooms})

            })
        });

}



