const express = require("express");
const bodyParser = require("body-parser");
  
const app = express();

const urlencodedParser = bodyParser.urlencoded({extended: false});
 
var array = [];

app.get("/", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

array.push()

app.post("/", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(`${request.body.quest_name}`);
}); 
app.listen(3000);