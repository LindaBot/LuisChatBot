var builder = require('botbuilder');
var restify = require('restify');

// Setup restify server
var server = restify.createServer();
server.listen(process.env.port || process.env.PORT || 3978, function(){
    console.log('%s listening to %s', server.name, server.url);
})

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: process.eventNames.username,
    appPassword: process.env.password
});

// Listen for messages from users
server.post('/api/messages', connector.listen());

// Receive messages from the user and respond by echoing each message back
var bot = new builder.UniversalBot(connector, function (session){
    session.send("You said %s", session.message.text);
});
