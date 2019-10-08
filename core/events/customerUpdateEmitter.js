const EventEmitter = require('events');
const {customer} = require('../../models');

const emitter = new EventEmitter();

emitter.on('customer:update', async ob => customer.update(ob, {where: {id: ob.customerId}}).catch(err => console.log(err)));

module.exports = emitter;