const customerNotifyEmitter = require('../../core/events/customerNotifyEmitter')

module.exports = io => {

    customerNotifyEmitter.on('customer:notify', ob =>
        io
            .of('customers')
            .to(ob.customerId) // todo: Avoid to create a room for each customer. Try to keep them in an object using as keys their auto-generated ids from socketio
            .emit('broadcast', ob));

    return io
        .of('customers')
        .use(require('socketio-jwt').authorize({
            secret: 'top_secret',
            handshake: true
        }))
        .on('connection', socket => {
            let currentRoom = socket.decoded_token.customerId;

            socket.join(currentRoom);
            socket.on('message', msg => {
                socket.emit('hey', {msg: msg, answer: true})
                socket.in(currentRoom).emit('roomie', {msg: msg, intoRoom: currentRoom});
                io.of('customers').emit('broadcast', {OLOI: "MAZI-CUSTOMERS"});
            })
        });

}