const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
var path = require('path');

const app = express();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

var upload = multer({ storage: storage });

// Разрешаем использование статических файлов (images, css и т.п.)
app.use('/public', express.static(__dirname + '/public'));
app.use('/images', express.static(__dirname + '/images'));
app.use(upload.single("filedata"));

const urlencodedParser = bodyParser.urlencoded({ extended: false });

let myQuests = [];

app.get("/", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

var questDetail;

app.get("/quests-details", urlencodedParser, function (request, response) {
    myQuests.forEach(function (element) {
        if (element.quest_id == request.query.quest_id) {
            questDetail = element;
        }
    });
    response.sendFile(__dirname + "/details.html");

});

app.get("/quest-edit", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/editing.html");
});


app.get("/create-quest", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/create.html");
});

app.post("/save-detail", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    myQuests.forEach(function (element) {
        if (element.quest_id == request.body.quest_id) {
            element.quest_name = request.body.quest_name;
            element.quest_info = request.body.quest_info;
            element.quest_file = request.file.path;
        }
    });
    response.sendFile(__dirname + "/create.html");
});

var questID = 1;

app.post("/create-quest", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    var quest = {};
    if (request.file != undefined) {
        quest = { quest_id: questID, quest_name: request.body.quest_name, quest_info: request.body.inf, quest_file: request.file.path };
    }
    else {
        quest = { quest_id: questID, quest_name: request.body.quest_name, quest_info: request.body.inf };
    }
    myQuests.push(quest);
    questID = questID + 1;
    // Возвращаем пользователя обратно на страницу, с которой пришли.
    response.sendFile(__dirname + "/create.html");


});

// Url, отвечающий за выдачу массива созданных квестов
app.get("/my-quests", urlencodedParser, function (request, response) {
    if (myQuests.length > 0) {
        var myQuestWithId = [];
        myQuests.forEach(function (element) {
            var quest = { quest_id: element.quest_id, quest_name: element.quest_name };
            myQuestWithId.push(quest)
        });
        response.send(myQuestWithId);
    }
    else
        response.send('У вас нет созданных квестов');
});

app.get("/detail-name", urlencodedParser, function (request, response) {
    response.send(questDetail);
});

app.get("/quest-edit-details", urlencodedParser, function (request, response) {
    response.send(questDetail);
});



app.listen(3000);