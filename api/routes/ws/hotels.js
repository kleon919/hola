module.exports = (io, socket) => {

    let currentRoom = socket.handshake.query.token;

    socket.join(currentRoom);
    socket.on('message', msg => {
        socket.emit('hey', {msg: msg, answer: true})
        socket.in(currentRoom).emit('roomie', {msg: msg, intoRoom: currentRoom});
        io.of('hotels').emit('broadcast', {OLOI: "MAZI"});
        io.of('customers').emit('broadcast', {OLOI: "MAZI"});
    })
};