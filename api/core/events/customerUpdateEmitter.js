const EventEmitter = require('events');
const {customer} = require('../../models');

const emitter = new EventEmitter();

emitter.on('event', async ob => customer.update(ob, {where: {id: ob.customerId}}).catch(err => console.log(err)));

module.exports = emitter;