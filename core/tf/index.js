const tf = require('@tensorflow/tfjs-node');
let model;

const init = async () => {
    model = await tf.loadLayersModel('file://core/tf/model.json');
    console.log('model loaded');
};

const choices = [
    "A Club Sandwich is a cool idea",
    "You should eat a Burger",
    "A Beef Steak is the better choice",
    "You should eat a Chef Salad",
    "You should have some Pasta",
    "French Fries is the better choice",
    "Roasted Vegetables seems like a good option",
    "You can eat a Greek Salad"
];

const normalize = (value, min, max) => {

    value = (value < min) ? min : value;
    value = (value > max) ? max : value;

    return (value - min) / (max - min);

};

const toAge = dob => {
    let ageDate = new Date(Date.now() - new Date(dob).getTime());
    return Math.abs(ageDate.getUTCFullYear() - 1970);
};

const normalizeAge = dob => normalize(toAge(dob), 15, 75);

const minutes = () => {
    let dt = new Date();
    let f = (new Date(Date.UTC(dt.getFullYear(), dt.getMonth(), dt.getDate()))).getTime();
    return (Date.now() - f) / 60000;
};

const normalizeTime = () => normalize(minutes(), 720, 1320);

const normalizeVegetarian = value => normalize(value, 1, 10);

const maxIndex = arr => arr.indexOf(Math.max(...arr));

// input : Array [3], [AGE, VEGETARIAN, CURRENT_TIME]
const predict = async input => {

    let normalInput = [
        normalizeAge(input[0]),
        normalizeVegetarian(input[1]),
        normalizeTime()
    ];

    let res = await model.predict(tf.tensor([normalInput])).array();
    return choices[maxIndex(...res)]
};

module.exports = {init, predict};