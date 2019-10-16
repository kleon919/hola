const {NlpManager} = require('node-nlp')
const manager = new NlpManager({languages:['en']})

manager.addDocument('en', 'goodbye for now', 'greetings.bye');
manager.addDocument('en', 'goodbye man', 'greetings.bye');

manager.addDocument('en', 'I need a towel', 'services.towel');
manager.addDocument('en', 'a towel please', 'services.towel');
manager.addDocument('en', 'could you bring me a towel please', 'services.towel');
manager.addDocument('en', 'may I have a towel please', 'services.towel');

manager.addDocument('en', 'thanks a lot', 'greetings.thank');
manager.addDocument('en', 'thank you', 'greetings.thank');
manager.addDocument('en', 'thnx', 'greetings.thank');

manager.addDocument('en', 'room please', 'greetings.room');
manager.addDocument('en', 'want a room', 'greetings.room');



manager.addAnswer('en', 'greetings.bye', 'See you soon');
manager.addAnswer('en', 'greetings.thank', 'You are welcome');

manager.addAnswer('en', 'greetings.room', 'BOOKING');
manager.addAnswer('en', 'services.towel', 'TASK');



module.exports = {
    init: async() => {
        await manager.train();
        manager.save();
        console.log('Net has been trained')
    },
    analyze : ph => manager.process('en', ph)
};


