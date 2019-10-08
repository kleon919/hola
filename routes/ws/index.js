module.exports = io => {

    require('./hotels')(io);
    require('./customers')(io);

    return io
}