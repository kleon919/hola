const {NlpManager} = require('node-nlp')
const manager = new NlpManager({languages:['en']})

manager.addDocument('en', 'hello', 'hello.person');
manager.addDocument('en', 'hi', 'hello.person');

manager.addDocument('en', 'good morning', 'morning.person');
manager.addDocument('en', 'good evening', 'evening.person');

manager.addDocument('en', 'how are you', 'emotion.person');
manager.addDocument('en', 'how do you feel', 'emotion.person');

manager.addDocument('en', 'goodbye for now', 'greetings.bye');
manager.addDocument('en', 'goodbye man', 'greetings.bye');

manager.addDocument('en', 'thanks a lot', 'greetings.thank');
manager.addDocument('en', 'thank you', 'greetings.thank');
manager.addDocument('en', 'thnx', 'greetings.thank');

manager.addDocument('en', 'weather', 'predict.weather');
manager.addDocument('en', 'what\'s it like outside?', 'predict.weather');
manager.addDocument('en', 'how\'s the weather', 'predict.weather');
manager.addDocument('en', 'what\'s the weather forecast for', 'predict.weather');
manager.addDocument('en', 'what’s the weather like', 'predict.weather');

manager.addDocument('en', 'I need a towel', 'services.towel');
manager.addDocument('en', 'a towel please', 'services.towel');
manager.addDocument('en', 'could you bring me a towel please', 'services.towel');
manager.addDocument('en', 'may I have a towel please', 'services.towel');

manager.addDocument('en', 'room please', 'services.room');
manager.addDocument('en', 'want a room', 'services.room');


manager.addAnswer('en', 'hello.person', 'Hello ');
manager.addAnswer('en', 'morning.person', 'It is indeed a good morning ');
manager.addAnswer('en', 'evening.person', 'Good evening to you too ');

manager.addAnswer('en', 'greetings.bye', 'See you soon ');
manager.addAnswer('en', 'greetings.thank', 'You are welcome ');

manager.addAnswer('en', 'emotion.person', 'I am great, I hope you are too ');

manager.addAnswer('en', 'predict.weather', 'Looks a bit cloudy, I would suggesting an umbrella ');

manager.addAnswer('en', 'services.room', 'BOOKING');
manager.addAnswer('en', 'services.towel', 'TASK');


module.exports = {
    init: async() => {
        await manager.train();
        manager.save();
        console.log('Net has been trained')
    },
    analyze : ph => manager.process('en', ph)
};


