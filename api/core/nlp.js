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


manager.addAnswer('en', 'greetings.bye', 'See you soon');
manager.addAnswer('en', 'services.towel', 'Of course, in 5 minutes it wil be there');
manager.addAnswer('en', 'greetings.thank', 'You are welcome');


module.exports = {
    init: async() => {
        await manager.train();
        manager.save();
        console.log('Net has been trained')
    },
    analyze : ph => manager.process('en', ph)
};


