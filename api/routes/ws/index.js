const socketioJwt = require('socketio-jwt');

const hotels = require('./hotels')
const customers = require('./customers')

module.exports = io => {

    // Authenticate using the token in query params.
    io
        .use(socketioJwt.authorize({
            secret: 'top_secret',
            handshake: true
        }));
    io
        .of('hotels')
        .on('connection', hotels.bind(null, io));
    io
        .of('customers')
        .on('connection', customers.bind(null, io));

    return io

}