var request = require('request');

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