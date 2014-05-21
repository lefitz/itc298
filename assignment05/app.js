console.log('loading app.js');

// custom object

function Candy(obj) {
    // copy object props to this
    for (var key in obj) {
        this[key] = obj[key];
    }

    this.display = function() {
        var tempRaw = $('#productTemplate').html();
        var tempCompiled = Handlebars.compile(tempRaw);
        var finishedHTML = tempCompiled(this);
        return finishedHTML;
    };
};

// static object

var utilities = {

    // item : candy object
    // tag : jquery object
    insert : function(item, tag) {
        tag.append(item.display());
    },

    load : function(callback) {
        // makes an ajax call to get data from a Google Spreadsheet
        var apiKey = "10Bi2UaI6XSpxLpDaLNKJimavR2iYt4sAI9-7qPXFELI";
        var googleUrl = 'https://spreadsheets.google.com/feeds/list/@apiKey/od6/public/values?alt=json-in-script';

        function parseGoogleData(data) {
          $.each(data.feed.entry, function(ix, val){
            var tempObj = {};
            for(var key in val){
              var matched = key.match(/gsx\$/);
              if (matched) {
                tempObj[key.slice(4)] = val[key].$t;
              }
            }

            var itemObj = new Candy(tempObj);
            utilities.data.push(itemObj);
          });
        }

        $.ajax({
            url : googleUrl.replace('@apiKey', apiKey),
            dataType : 'jsonp',
            success : function(data) {
                parseGoogleData(data);
                // if there's a callback, call the callback
                if(callback) {
                    callback(data);
                }
            }
        });
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
    },

    // can start out as a blank array; data will be stored here, from load()
    data : [],

    // Array of ID's (numbers) that reference objects in data
    cart : [],

    display : function() {
        // Calls insert on all the objects in the data property
        // For each element in data, call .display() and append the results #items
        $('#items').empty();
        utilities.sort('name', utilities.data);
        $.each(utilities.data, function(index, val) {
            // utilities.data == array of candy objects
            // utilities.insert(utilities.data, $('#items'));
            // val == candy obj

            // append data to #items
            utilities.insert(val, $('#items'));
       });

        // Attaches any jQuery animations to the inserted elements
        /* var clickable = $('.container');
        clickable.on("click", function() {
            var $this = $(this);
            $this.find('.inner-container').slideToggle();
        }); */
        
        $('.fave').click(function() {
            $(this).find('i').addClass('heart');
        });
        
    },

    displayCart : function() {
        // Calls insert only on data objects that have their ID's in the cart property
        // For each element in data
        // insert(obj, $('#items'))
        
        $('#items').empty();
        for(var i = 0; i < utilities.data.length; i++) {
            var current = utilities.data[i];
            var checker = $.inArray(current.id, utilities.cart);
            if(checker >= 0) {
                utilities.insert(current, $('#items'));
            }
        }
    },

    addToCart : function(itemID) {
        // Adds the item ID to the cart property array
        // check if itemID is in utilities.cart
        // can use $.inArray()
        // if its not, push into utilities.cart
        var valIx = $.inArray(itemID, utilities.cart);
        if(valIx < 0) {
            utilities.cart.push(itemID);
        }
        console.log(utilities.cart);
    }
};

// end of static object


// call load with callback

utilities.load(utilities.display);




