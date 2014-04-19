console.log('loading megaParse.js');

// make stringified JSON object here
var candy = {
    "Category" : "Gummy",
    "Name" : "Sour S'ghetti",
    "Flavors" : ["Green Apple", "Strawberry", "Blueberry"],
    "Distributor" : "Haribo",
    "Price per lb" : "$12.99",
    "Serving size" : "38 pieces",
    "Calories per serving": 150,
    "Allergen info" : "Lactose free"
};

var candyString = JSON.stringify(candy);

// make megaParse() function here

function megaParse(myString) {
    var obj = JSON.parse(myString);
    for (var key in obj) {
        var val = obj[key];
        console.log('The property "' + key + '" has a value of "' + val + '" in this object.');
    }
    return obj;
};

// call megaParse() function with your stringified object here

megaParse(candyString);

