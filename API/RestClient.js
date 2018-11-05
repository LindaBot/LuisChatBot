var request = require('request');

exports.getFavouriteFood = function getData(url, session, username, callback){
    request.get(url, {'headers':{'ZUMO-API-VERSION': '2.0.0'}}, function handleGetReponse(err,res,body){
        if(err){
            console.log(err);
        }else {
            callback(body, session, username);
        }
    });
};

exports.getYelpData = function getData(url, bearer, session, callback){
    // Make the request to url
    request.get(url, {'auth' : {'bearer' : bearer}}, function(err, res, body){
        if (err){
            console.log(err);
        } else {
            callback(body, session);
        }
    });
};