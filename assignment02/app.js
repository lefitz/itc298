console.log('loading app.js');

var candy = [
    {
        "Category" : "Gummy",
        "Name" : "Sour S'ghetti",
        "Flavors" : "Green Apple, Strawberry, Blueberry",
        "Distributor" : "Haribo",
        "Price" : "$12.99",
        "Serving" : "38 pieces",
        "Calories": 150,
        "Allergens" : "Lactose free",
        "Image" : "sour"
    },
    {
        "Category" : "Chocolate",
        "Name" : "Reese's Peanut Butter Cups",
        "Flavors" : "Chocolate, Peanut Butter",
        "Distributor" : "Hershey's",
        "Price" : "$10.00",
        "Serving" : "2 pieces",
        "Calories": 210,
        "Allergens" : "Gluten free",
        "Image" : "reeses"
    },
        {
        "Category" : "Licorice",
        "Name" : "Twizzlers",
        "Flavors" : "Strawberry, Cherry, Black Licorice",
        "Distributor" : "Hershey's",
        "Price" : "$9.25",
        "Serving" : "4 pieces",
        "Calories": 150,
        "Allergens" : "Lactose free",
        "Image" : "twizzlers"
    },
    {
        "Category" : "Gummy",
        "Name" : "Frogs",
        "Flavors" : "Apple, Passion Fruit",
        "Distributor" : "Haribo",
        "Price" : "$12.50",
        "Serving" : "6 pieces",
        "Calories": 140,
        "Allergens" : "Gluten free, lactose free",
        "Image" : "frogs"
    },
    {
        "Category" : "Chewy",
        "Name" : "Skittles",
        "Flavors" : "Grape, Lemon, Lime, Orange, Strawberry",
        "Distributor" : "Wrigley",
        "Price" : "$8.99",
        "Serving" : "45 pieces",
        "Calories": 230,
        "Allergens" : "Gluten free, lactose free",
        "Image" : "skittles"
    },
    {
        "Category" : "Gummy",
        "Name" : "Happy Cola",
        "Flavors" : "Cola, Vanilla",
        "Distributor" : "Haribo",
        "Price" : "$13.10",
        "Serving" : "12 pieces",
        "Calories": 130,
        "Allergens" : "Gluten free, lactose free",
        "Image" : "cola"
    }
];

var candyString = JSON.stringify(candy);

var template =  '<div class="container">' +
                '<h2>{{Name}}</h2>' +
                    '<div class="inner-container">' +
                        '<img src="images/{{Image}}.jpg">' +
                        '<p class="item"><span class="key">Category</span>: <span class="value">{{Category}}</span></p>' +
                        '<p class="item"><span class="key">Flavors</span>: <span class="value">{{Flavors}}</span></p>' +
                        '<p class="item"><span class="key">Distributor</span>: <span class="value">{{Distributor}}</span></p>' +
                        '<p class="item"><span class="key">Price per lb</span>: <span class="value">{{Price}}</span></p>' +
                        '<p class="item"><span class="key">Serving size</span>: <span class="value">{{Serving}}</span></p>' +
                        '<p class="item"><span class="key">Calories per serving</span>: <span class="value">{{Calories}}</span></p>' +
                        '<p class="item"><span class="key">Allergen info</span>: <span class="value">{{Allergens}}</span></p>' +
                    '</div>' +
                '<div>';


function prettyPrint(parseFunc) {
    var addData = template;
    for (var key in parseFunc) {
        var val = parseFunc[key];
        addData = addData.replace('{{' + key + '}}', val);
    }
    $('#items').append(addData);
};

function megaParse(myString) {
    var evaluateThis = JSON.parse(myString);
    if(evaluateThis instanceof Array) {
        $.each(evaluateThis, function(index, val) {
            prettyPrint(evaluateThis[index]);
        });
    } else {
        prettyPrint(evaluateThis);
    }
    
};
megaParse(candyString);
