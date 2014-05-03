console.log('loading app.js');


// static object

var utilities = {
    prettyPrint : function(obj, container) {
        var tempHTML = $('#template').html();
        for (var key in obj) {
            var val = obj[key];
            tempHTML = tempHTML.replace('{{' + key + '}}', val);
        }
        container.append(tempHTML);
    },
    megaParse : function(jsonString, container) {
        var parseObj = JSON.parse(jsonString);

        if(parseObj instanceof Array) {
            utilities.arraySorter(parseObj, 'Name');
            $.each(parseObj, function(index, val) {
                utilities.prettyPrint(val, container);
            });
        } else {
            utilities.prettyPrint(parseObj, container);
        }
    },
    arraySorter : function(anArray, prop) {
        var sortedArray = anArray.sort(function (a, b) {

             if (a[prop].toLowerCase() > b[prop].toLowerCase()){
               return 1;
             }
             else if (b[prop].toLowerCase() > a[prop].toLowerCase()){
               return -1;
             }
             else {
               return 0;
             }
        });
    }
 };   


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

utilities.megaParse(candyString, $('#items'));