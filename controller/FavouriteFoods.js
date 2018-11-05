// This links LUIS to the database

var rest = require('../API/RestClient');

exports.displayFavouriteFood = function getFavouriteFood(session, username){
    var url = 'https://lindafoodbot.azurewebsites.net/tables/FoodBot';
    rest.getFavouriteFood(url, session, username, handleFavouriteFoodResponse)
};

exports.sendFavouriteFood = function postFavouriteFood(session, username, favouriteFood){
    // Update the database to store favourite food
    var url = 'https://lindafoodbot.azurewebsites.net/tables/FoodBot';
    rest.postFavouriteFood(url, username, favouriteFood);
};

function handleFavouriteFoodResponse(message, session, username) {
    var favouriteFoodResponse = JSON.parse(message);
    var allFoods = [];
    for (var index in favouriteFoodResponse) {
        var usernameReceived = favouriteFoodResponse[index].username;
        console.log(favouriteFoodResponse[index]);
        var favouriteFood = favouriteFoodResponse[index].favouriteFood;

        //Convert to lower case whilst doing comparison to ensure the user can type whatever they like
        if (username.toLowerCase() === usernameReceived.toLowerCase()) {
            //Add a comma after all favourite foods unless last one
            if(favouriteFoodResponse.length - 1) {
                allFoods.push(favouriteFood);
            }
            else {
                allFoods.push(favouriteFood + ', ');
            }
        } else {
            session.send("Failed to retreived food");
        }        
    }
    
    // Print all favourite foods for the user that is currently logged in
    session.send("%s, your favourite foods are: %s", username, allFoods);                
    
};