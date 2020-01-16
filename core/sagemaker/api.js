const AWS = require('aws-sdk');
const current_region = 'us-east-1';
AWS.config.loadFromPath('./config/aws-config.json');
AWS.config.update({region: current_region}) // todo

const sm = new AWS.SageMakerRuntime();

const params = {
    EndpointName: 'sagemaker-tensorflow-2020-01-15-14-35-16-716',
    Accept: 'application/json',
    ContentType: 'application/json'
};

// Body must be String, Buffer ...etc
// Here is a nested Array as a string e.g. '[[0.1, 0.2, 0.3]]'
// Input must be an Array with 3 values
const predict = input =>
    new Promise((resolve, reject) =>
        sm.invokeEndpoint({...params, Body: JSON.stringify([input])}, (err, data) => {
            if (err) reject(err);
            resolve(JSON.parse(new Buffer.from(data.Body).toString('utf8')))
        }));


module.exports = predict;