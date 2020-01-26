const tf = require('@tensorflow/tfjs-node');
let model;

const init = async () => {
    model = await tf.loadLayersModel('file://core/tf/model.json');
    console.log('model loaded');
};

const choices = [
    "Club Sandwich",
    "Steak",
    "Burger",
    "Chef Salad",
    "Pasta",
    "French Fries",
    "Greek Salad",
    "Boiled Vegetables"
];

const normalize = (value, min, max) => {

    value = (value < min) ? min : value;
    value = (value > max) ? max : value;

    return (value - min) / (max - min);

};

const normalizeAge = age => normalize(age, 15, 75);

const normalizeTime = secs => normalize(secs, 720, 1320);

const normalizeVegeterian = value => normalize(value, 1, 10);

const maxIndex = arr => arr.indexOf(Math.max(...arr));

// input : Array [3], [AGE, VEGETERIAN, CURRENT_TIME]
const predict = async input => {

    let normalInput = [
        normalizeAge(input[0]),
        normalizeVegeterian(input[1]),
        normalizeTime(input[2])
    ];

    let res = await model.predict(tf.tensor([normalInput])).array();
    return choices[maxIndex(...res)]
}

module.exports = {init, predict};