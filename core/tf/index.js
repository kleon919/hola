const tf = require('@tensorflow/tfjs-node');
let model;

const init = async () => {
    model = await tf.loadLayersModel('file://core/tf/model.json');
    console.log('model loaded');
};

const choices = [
    "Pasta-Bolognese (Soy)",
    "Chef Salad",
    "Greek Salad",
    "Club Sandwich",
    "Pasta-Bolognese",
    "Sushi",
    "Steak",
    "Burger and Fries"
];

const maxIndex = arr => arr.indexOf(Math.max(...arr));

// Input must be an array with 3 values
const predict = async input => {
    let res = await model.predict(tf.tensor([input])).array();
    return choices[maxIndex(...res)]
}

module.exports = {init, predict};