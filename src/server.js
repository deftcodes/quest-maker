const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// Разрешаем использование статических файлов (images, css и т.п.)
app.use('/public', express.static(__dirname + '/public'));

const urlencodedParser = bodyParser.urlencoded({ extended: false });

let myQuests = [];

app.get("/", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

app.get("/create-quest", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/create.html");
});

app.post("/create-quest", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    console.log(request.body);
    myQuests.push(request.body);

    // Возвращаем пользователя обратно на страницу, с которой пришли.
    response.sendFile(__dirname + "/create.html");
});

// Url, отвечающий за выдачу массива созданных квестов
app.get("/my-quests", urlencodedParser, function (request, response) {
    if (myQuests.length > 0) {
        var myQuestName = [];
        myQuests.forEach(function (element) { myQuestName.push(element.quest_name) });
        response.send(myQuestName);
    }
    else
        response.send('У вас нет созданных квестов');
});


app.listen(3000);