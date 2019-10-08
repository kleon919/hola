module.exports = io =>

    io
        .of('customers')
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
                io.of('customers').emit('broadcast', {OLOI: "MAZI-CUSTOMERS"});
            })
        });
