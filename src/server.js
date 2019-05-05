const express = require("express");
const bodyParser = require("body-parser");
  
const app = express();
  
const urlencodedParser = bodyParser.urlencoded({extended: false});
 
app.get("/", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/index.html");
});
app.post("/", urlencodedParser, function (request, response) {
    if(!request.body) return response.sendStatus(400);
    console.log(request.body);
    response.send(`${request.body.question} ${request.body.answer}`);
}); 
app.listen(3000);