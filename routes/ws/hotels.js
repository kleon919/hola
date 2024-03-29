const hotelNotifyEmitter = require('../../core/events/hotelNotifyEmitter')

module.exports = io => {

    hotelNotifyEmitter.on('hotel.notify', ob =>
        io
            .of('hotels')
            .to(ob.hotelId) // room per hotel
            .emit('broadcast', ob));

    return io
        .of('hotels')
        .use(require('socketio-jwt').authorize({
            secret: 'top_secret',
            handshake: true
        }))
        .on('connection', socket => {

            let currentRoom = socket.decoded_token.hotelId;
            socket.join(currentRoom);

            // socket.on('assign', ob => {
            //     io
            //         .of('customers')
            //         .to(ob.customerId)
            //         .emit('broadcast', ob);
            // })

            // socket.on('message', msg => {
            //     socket.emit('hey', {msg: msg, answer: true})
            //     socket.in(currentRoom).emit('roomie', {msg: msg, intoRoom: currentRoom});
            //     // todo check io.nsps to broadcast to all clients, even if they are connected to other namespace
            //     io.of('hotels').emit('broadcast', {OLOI: "MAZI"});
            // });
            // socket.on('test', msg => {
            //     console.log(socket.conn.pingTimeoutTimer._idleStart)
            //     console.log(socket.decoded_token)
            //     socket.emit('hey', {msg: msg, answer: true, token: socket.handshake.query.token, rooms: socket.rooms})
            //
            // })

        });
}