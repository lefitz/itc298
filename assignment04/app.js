console.log('loading app.js');

// custom object

function Candy(obj) {
    for (var key in obj) {
        this[key] = obj[key];
    }

    this.display = function() {
        var tempRaw = $('#productTemplate').html();
        var tempCompiled = Handlebars.compile(tempRaw);
        var finishedHTML = tempCompiled(this);
        return finishedHTML;
    };
}

// static object

var utilities = {

    insert : function(item, tag) {
        $(tag).append(item.display());
    },

    megaParse : function(obj, tag) {
        if(obj instanceof Array) {
            utilities.sort('Name', obj);
            $.each(obj, function(idx, val) {
                var myObj = new Candy(val);
                utilities.insert(myObj, tag);
            });
        } else {
            var myObj = new Candy(obj);
            utilities.insert(myObj, tag);
        }
    },

    sort : function(prop, arr) {
       var sortedArray = arr.sort(function (a, b) {

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

utilities.megaParse(candy, $('#items'));

var clickable = $('.container');
clickable.on("click", function() {
    var $this = $(this);
    $this.find('.inner-container').slideToggle();
});