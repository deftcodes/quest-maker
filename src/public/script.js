var vars = {};
var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
    vars[key] = value;
});

function edit() {
    window.location = '/create-lvl?quest_id=' + vars["quest_id"];
}


// Проверка правильности ответа.
function checkAnswer(levelId) {
    var checkAnswerUrl = "/level-check-answer?lvl_id=" + levelId;
    var checkAnswer = new XMLHttpRequest();
    checkAnswer.open('POST', checkAnswerUrl);
    checkAnswer.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    checkAnswer.responseType = 'json';

    checkAnswer.onload = function () {
        if (checkAnswer.response !== undefined) {
            if (checkAnswer.response)
                alert("Поздравляем, ваш ответ верный!");
            else
                alert("Увы, это неправильный ответ.")
        }
    };

    checkAnswer.send("answer=" + levelAnswer.value);

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
var levelId = document.querySelector('input[name="lvl_id"]');
var levelName = document.querySelector('input[name="lvl_name"]');
var levelQuestion = document.querySelector('textarea[name="question"]');
var levelAnswer = document.querySelector('textarea[name="answer"]');

// Делаем запрос на сервер для получения квестов
// Запрос отрабатывает при каждой загрузке страницы
var questTablePageUrl = "/quests-table-page";
var questTablePage = new XMLHttpRequest();
questTablePage.open('GET', questTablePageUrl);
questTablePage.responseType = 'json';
// После получения ответа от сервера передаём данные в элемент 
questTablePage.onload = function () {
    if (questTablePage.response != undefined) {
        questDetails.value = questTablePage.response.quest_name;
        questDetailsId.value = questTablePage.response.quest_id;
    }
};

questTablePage.send();

var questTable = "/quests-table"
var getQuestTable = new XMLHttpRequest();
getQuestTable.open('GET', questTable);
getQuestTable.responseType = 'json';

getQuestTable.onload = function () {
    if (getQuestTable.response != undefined) {
        getQuestTable.response.forEach(function (element) {
            var newRow = document.getElementById('quest-table').insertRow();
            newRow.innerHTML = `<tr>
      <td><textarea name="quest-id"  class="form-control" cols="50" rows="1">` + element.quest_id + `</textarea></td>
      <td><textarea name="quest-name"  class="form-control" cols="50" rows="1">` + element.quest_name + `</textarea></td>
      <td><button type="submit" class="btn btn-primary" onclick="javascript:window.location='/quest-edit?quest_id=` + element.quest_id + `'">Редактировать</button></td>
      <td><button type="submit" class="btn btn-primary" onclick="javascript:window.location='/launch-quest?quest_id=` + element.quest_id + `'">Запустить квест</button></td>
      </tr>`;
        });
    }
};

getQuestTable.send();

var questEditDetailsUrl = "/quest-edit-details";
var getQuestEditDetails = new XMLHttpRequest();
getQuestEditDetails.open('GET', questEditDetailsUrl);
getQuestEditDetails.responseType = 'json';

getQuestEditDetails.onload = function () {
    if (getQuestEditDetails.response != undefined) {
        id.value = getQuestEditDetails.response.quest_id;
        questEditName.value = getQuestEditDetails.response.quest_name;
        questEditInfo.value = getQuestEditDetails.response.quest_info;
    }
};

getQuestEditDetails.send();

var myLevelListUrl = "/my-lvls?quest_id=" + vars["quest_id"];
var getMyLevels = new XMLHttpRequest();
getMyLevels.open('GET', myLevelListUrl);
getMyLevels.responseType = 'json';

getMyLevels.onload = function () {
    if (getMyLevels.response != undefined)
        var a = '';
    getMyLevels.response.forEach(function (element) {
        a = a + '<a href="/create-lvl?lvl_id=' + element.lvl_id + '&quest_id=' + element.quest_id + '">' + element.lvl_name + '</a>';
    });
    myLvls.innerHTML = a;
};

getMyLevels.send();


var levelEditUrl = "/level-edit-details";
var getLevelEditDetails = new XMLHttpRequest();
getLevelEditDetails.open('GET', levelEditUrl);
getLevelEditDetails.responseType = 'json';

getLevelEditDetails.onload = function () {
    if (getLevelEditDetails.response != undefined) {
        id.value = getLevelEditDetails.response.quest_id;
        levelName.value = getLevelEditDetails.response.lvl_name;
        levelQuestion.value = getLevelEditDetails.response.question;
        levelAnswer.value = getLevelEditDetails.response.answer;
    }
};

getLevelEditDetails.send();

var launchEditDetails = "/launch-edit-details";
var getLauchQuestDetails = new XMLHttpRequest();
getLauchQuestDetails.open('GET', launchEditDetails);
getLauchQuestDetails.responseType = 'json';

getLauchQuestDetails.onload = function () {
    if (getLauchQuestDetails.response != undefined) {
        levelId.value = getLauchQuestDetails.response.lvl_id;
        levelName.value = getLauchQuestDetails.response.lvl_name;
        levelQuestion.value = getLauchQuestDetails.response.question;        
    }
};

getLauchQuestDetails.send();

var launchLevelDetails = "/launch-level-details";
var getLaunchLevelDetails = new XMLHttpRequest();
getLaunchLevelDetails.open('GET', launchLevelDetails);
getLaunchLevelDetails.responseType = 'json';

getLaunchLevelDetails.onload = function () {
    if (getLaunchLevelDetails.response != undefined) {
        var c = '';
        levelName.value = getLauchQuestDetails.response.level_name;
        levelQuestion.value = getLauchQuestDetails.response.question;
        getLaunchLevelDetails.response.forEach(function (element) {
            c = c + '<button type="submit" class="btn btn-secondary onclick="javascript:window.location=/quest-edit?lvl_id=' + element.lvl_id + '">Далее</button>';
        });
        launchLevel.innerHTML = с;
    }
};

getLaunchLevelDetails.send();





