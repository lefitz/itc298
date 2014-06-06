console.log('loading app.js');

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

var utilities = {

    getCart : function() {
        //parses window.localStorage.cart to an array
        var tempArr;
        if(window.localStorage.cart) {
            tempArr = JSON.parse(window.localStorage.cart);
        } else {
            tempArr = [];
        }
        //call addToCart on each ID in array
        $.each(tempArr, function(ix, val) {
            utilities.addToCart(val);
        });
        //returns the array
        return tempArr;
    },

    saveCart : function() {
        //stringifies the Static Objects cart and sets it to window.localStorage.cart
        window.localStorage.cart = JSON.stringify(utilities.cart);
    },

    insert : function(item, tag) {
        tag.append(item.display());
    },

    load : function(callback) {
        //register handlebars partials
        Handlebars.registerPartial('addButton', $('#addButtonTemplate').html());
        Handlebars.registerPartial('removeButton', $('#removeButtonTemplate').html());

        var apiKey = "10Bi2UaI6XSpxLpDaLNKJimavR2iYt4sAI9-7qPXFELI";
        var googleUrl = 'https://spreadsheets.google.com/feeds/list/@apiKey/od6/public/values?alt=json-in-script';

        function parseGoogleData(data) {
          var tempArr = [];
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
          return tempArr;
        }

        function isInCart(id) {
            return $.inArray(id, utilities.cart) >= 0;
        }

        $.ajax({
            url : googleUrl.replace('@apiKey', apiKey),
            dataType : 'jsonp',
            success : function(data) {
                parseGoogleData(data);
                //inside AJAX success, after parseGoogleData, call getCart and store result in StaticObject.cart
                utilities.cart = utilities.getCart();
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

    data : [],

    cart : [],

    display : function() {
        $('#items').empty();
        utilities.sort('name', utilities.data);
        $.each(utilities.data, function(index, val) {
            utilities.insert(val, $('#items'));
        });

        //attach button clicks
        utilities.attachButtonClick($('button'));
    },

    displayCart : function() {
        $('#items').empty();
        for(var i = 0; i < utilities.data.length; i++) {
            var current = utilities.data[i];
            var checker = $.inArray(current.id, utilities.cart);
            if(checker >= 0) {
                utilities.insert(current, $('#items'));
            }
        }
        //attach button clicks
        utilities.attachButtonClick($('button'));
    },

    attachButtonClick: function(element) {
        //sets up all the button behavior

        function makeButton(templateId) {
            //takes a template id
            var source = $(templateId).html();

            //compiles the template
            var compiled = Handlebars.compile(source);

            //returns the html
            return compiled();
        }

        function switchButton(element, templ) {
            //takes a jquery element and a templateId
            //remove any inner buttons
            element.find('button').remove();

            //call makeButton with the templateId argument and append result to the jquery element
            var buttonHtml = makeButton(templ);
            element.append(buttonHtml);

            //call attachButtonClick on the 'button' inside the jquery element
            utilities.attachButtonClick(element.find('button'));
        }

        element.click(function(ev) { 
            //find the closest '.likeButton'
            var el = $(ev.currentTarget).parent();

            //find the 'data-item-id' attribute on that element, store in variable
            var id = el.attr('data-item-id');

            //see if button has 'inCart' class, store in variable
            var isInCart = el.find('button').hasClass('inCart');
     
            //if button has inCart class
            if(isInCart) {
                //call StaticObject.removeFromCart with stored id
                utilities.removeFromCart(id);

                //call switchButton with the '.likeButton' element and the add button template
                switchButton(el, '#addButtonTemplate');
            } else {
                //else call StaticObject.addToCart with the stored id
                utilities.addToCart(id);

                //call switchButton with the '.likeButton' element and the remove button template
                switchButton(el, '#removeButtonTemplate');
            }
            //Finally, call StaticObject.saveCart to persist cart into local storage    
            utilities.saveCart();
        });
    },


    addToCart : function(itemID) {
        var valIx = $.inArray(itemID, utilities.cart);
        if(valIx < 0) {
            utilities.cart.push(itemID);
 
            //find item and set inCart property to true
            $.each(utilities.data, function(){
                if(this.id == itemID) {
                    this.inCart = true;
                }
            });
        }
    },

    removeFromCart : function(itemId) {
        //Takes an item id
 
        var ix = $.inArray(itemId, utilities.cart);
        if(ix >= 0) {
            utilities.cart.splice(ix, 1);
            //find item and set inCart property to false
            $.each(utilities.data, function(){
                if(this.id == itemId) {
                    this.inCart = false;
                }
            });
        }
    }
};

utilities.load(utilities.display);