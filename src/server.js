const express = require("express");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require('path');
const loki = require('lokijs');
const uuidv1 = require('uuid/v1');

var db = new loki("db.json", {
    autoload: true,
    autoloadCallback : databaseInitialize,
    autosave: true,
    autosaveInterval: 4000
});

let quests_db;

function databaseInitialize() {
    if (!db.getCollection("quests")) {
        db.addCollection("quests");        
    }
    quests_db = db.getCollection("quests");
}

const app = express();

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({storage: storage});

// Разрешаем использование статических файлов (images, css и т.п.)
app.use('/public', express.static(__dirname + '/public'));
app.use('/images', express.static(__dirname + '/images'));
app.use(upload.single("filedata"));

const urlencodedParser = bodyParser.urlencoded({extended: false});

//let myQuests = [];

app.get("/", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/index.html");
});

let questDetail;
let questTable;

app.get("/quests-details", urlencodedParser, function (request, response) {
    questDetail = quests_db.find({'quest_id': request.query.quest_id})[0];
    response.sendFile(__dirname + "/details.html");

});

app.get("/quests-table-page", urlencodedParser, function (request, response) {
    questTable = quests_db.data;
    response.sendFile(__dirname + "/table.html");

});

// Url, отвечающий за выдачу массива созданных квестов
app.get("/quests-table", urlencodedParser, function (request, response) {
    if (quests_db.data.length > 0) {
        const myQuestWithId = [];
        quests_db.data.forEach(function (element) {
            const quest = {quest_id: element.quest_id, quest_name: element.quest_name};
            myQuestWithId.push(quest)
        });
        response.send(myQuestWithId);
    } else
        response.send('У вас нет созданных квестов');
});


app.get("/quest-edit", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/editing.html");
});


app.get("/create-quest", urlencodedParser, function (request, response) {
    response.sendFile(__dirname + "/create.html");
});

app.post("/save-detail", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    let quest = quests_db.find({'quest_id': request.query.quest_id});
    quest.quest_name = request.body.quest_name;
    quest.quest_info = request.body.quest_info;
    quest.quest_file = request.file.path;
    response.sendFile(__dirname + "/create.html");
});

app.post("/create-quest", urlencodedParser, function (request, response) {
    if (!request.body) return response.sendStatus(400);
    let quest = {};
    let questId = uuidv1(); // Генерирует уникальный ключ
    if (request.file !== undefined) {
        quest = {
            quest_id: questId,
            quest_name: request.body.quest_name,
            quest_info: request.body.inf,
            quest_file: request.file.path
        };
    } else {
        quest = {quest_id: questId, quest_name: request.body.quest_name, quest_info: request.body.inf};
    }
    quests_db.insert(quest);

    // Возвращаем пользователя обратно на страницу, с которой пришли.
    response.sendFile(__dirname + "/create.html");
});

app.get("/my-quests", urlencodedParser, function (request, response) {
    if (quests_db.data.length > 0) {
        const myQuestWithId = [];
        quests_db.data.forEach(function (element) {
            const quest = {quest_id: element.quest_id, quest_name: element.quest_name};
            myQuestWithId.push(quest)
        });
        response.send(myQuestWithId);
    } else
        response.send('У вас нет созданных квестов');
});

app.get("/detail-name", urlencodedParser, function (request, response) {
    response.send(questDetail);
});

app.get("/quest-edit-details", urlencodedParser, function (request, response) {
    response.send(questDetail);
});


app.listen(3000);