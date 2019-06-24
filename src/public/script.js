var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
});

function edit() {
    window.location = '/create-lvl?quest_id=' + vars["quest_id"];
}

// Элемент, куда будут загружаться квесты
var myLvls = document.querySelector('div[name="my-lvls"]');

var questDetails = document.querySelector('input[name="quest-name"]');
var questDetailsInfo = document.querySelector('textarea[name="quest-info"]');
var questDetailsPhoto = document.querySelector('div[name="photo"]');
var questDetailsId = document.querySelector('input[name="quest-id"]');

var id = document.querySelector('input[name="quest_id"]');
var questEditName = document.querySelector('input[name="quest_name"]');
var questEditInfo = document.querySelector('textarea[name="quest_info"]');

var launchLevel = document.querySelector('div[name="launch-level"]');

// Уровень.
var levelName = document.querySelector('input[name="lvl_name"]');
var levelQuestion = document.querySelector('textarea[name="question"]');
var levelAnswer = document.querySelector('textarea[name="answer"]');

// Делаем запрос на сервер для получения квестов
// Запрос отрабатывает при каждой загрузке страницы
var url2 = "/quests-table-page"
var request2 = new XMLHttpRequest();
request2.open('GET', url2);
request2.responseType = 'json';
// После получения ответа от сервера передаём данные в элемент 
request2.onload = function () {
    if (request2.response != undefined) {
        questDetails.value = request2.response.quest_name;
        questDetailsId.value = request2.response.quest_id;
    }
};

request2.send();

var url3 = "/quests-table"
var request3 = new XMLHttpRequest();
request3.open('GET', url3);
request3.responseType = 'json';

request3.onload = function () {
    if (request3.response != undefined) {
        request3.response.forEach(function (element) {
            var newRow = document.getElementById('quest-table').insertRow();
            newRow.innerHTML = `<tr>
      <td><textarea name="quest-id"  class="form-control" cols="50" rows="1">` + element.quest_id + `</textarea></td>
      <td><textarea name="quest-name"  class="form-control" cols="50" rows="1">` + element.quest_name + `</textarea></td>
      <td><button type="submit" class="btn btn-secondary onclick="javascript:window.location='/quest-edit?quest_id=` + element.quest_id + `'">Редактировать</button></td>
      <td><button type="submit" class="btn btn-primary" onclick="javascript:window.location='/launch-quest?quest_id=` + element.quest_id + `'">Запустить квест</button></td>
      </tr>`;
        });
    }
};

request3.send();

var url4 = "/quest-edit-details";
var request4 = new XMLHttpRequest();
request4.open('GET', url4);
request4.responseType = 'json';

request4.onload = function () {
    if (request4.response != undefined) {
        id.value = request4.response.quest_id;
        questEditName.value = request4.response.quest_name;
        questEditInfo.value = request4.response.quest_info;        
    }
};

request4.send();

var url5 = "/my-lvls?quest_id=" + vars["quest_id"];
var request5 = new XMLHttpRequest();
request5.open('GET', url5);
request5.responseType = 'json';

request5.onload = function () {
    if (request5.response != undefined)
        var a = '';
    request5.response.forEach(function (element) {
        a = a + '<a href="/create-lvl?lvl_id=' + element.lvl_id + '&quest_id=' + element.quest_id + '">' + element.lvl_name + '</a>';
    });
    myLvls.innerHTML = a;
};

request5.send();


var url6 = "/level-edit-details";
var request6 = new XMLHttpRequest();
request6.open('GET', url6);
request6.responseType = 'json';

request6.onload = function () {
    if (request6.response != undefined) {
        id.value = request6.response.quest_id;
        levelName.value = request6.response.lvl_name;
        levelQuestion.value = request6.response.question;
        levelAnswer.value = request6.response.answer;
    }
};

request6.send();

var url7 = "/launch-edit-details";
var request7 = new XMLHttpRequest();
request7.open('GET', url7);
request7.responseType = 'json';

request7.onload = function () {
    if (request7.response != undefined) {
        levelName.value = request7.response.quest_name;
        levelQuestion.value = request7.response.quest_info;
    }
};

request7.send();

var url8 = "/launch-level-details";
var request8 = new XMLHttpRequest();
request8.open('GET', url8);
request8.responseType = 'json';

request8.onload = function () {
    if (request8.response != undefined) {
        var c = '';
        levelName.value = request7.response.level_name;
        levelQuestion.value = request7.response.question;
        request8.response.forEach(function (element) {
        c =c + '<button type="submit" class="btn btn-secondary onclick="javascript:window.location=/quest-edit?lvl_id='+ element.lvl_id + '">Далее</button>';
    });
    launchLevel.innerHTML = с;
    }
};

request8.send();





