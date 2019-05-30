
function edit()
{
  var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
window.location='/quest-edit?quest_id='+ vars["quest_id"];
}


// Элемент, куда будут загружаться квесты
var myQuests = document.querySelector('div[name="my-quests"]');

var questDetails = document.querySelector('input[name="quest-name"]');
var questDetailsInfo = document.querySelector('textarea[name="quest-info"]');
var questDetailsPhoto = document.querySelector('div[name="photo"]');

var id = document.querySelector('input[name="quest_id"]');
var questEditName = document.querySelector('input[name="quest_name"]');
var questEditInfo = document.querySelector('textarea[name="quest_info"]');

// Делаем запрос на сервер для получения квестов
// Запрос отрабатывает при каждой загрузке страницы
var url = "/my-quests"
var request = new XMLHttpRequest();
request.open('GET', url);
request.responseType = 'json';

// После получения ответа от сервера передаём данные в элемент myQuests
request.onload = function () {
  if (request.response != undefined)
    var a = '';
  request.response.forEach(function (element) {
    a = a + '<a href="/quests-details?quest_id=' + element.quest_id + '">' + element.quest_name + '</a>';
  });
  myQuests.innerHTML = a;
};

request.send();

var url2 = "/detail-name"
var request2 = new XMLHttpRequest();
request2.open('GET', url2);
request2.responseType = 'json';

request2.onload = function () {
  if (request2.response != undefined) {
    questDetails.value = request2.response.quest_name;
    questDetailsInfo.value = request2.response.quest_info;
    var b = '';
    if (request2.response.quest_file != undefined){
    b = '<img src="' +  request2.response.quest_file + '" class="w-100"></img>';
    questDetailsPhoto.innerHTML = b;
    }
    }
};

request2.send();

var url3 = "/quest-edit-details"
var request3 = new XMLHttpRequest();
request3.open('GET', url3);
request3.responseType = 'json';

request3.onload = function () {
  if (request3.response != undefined) {
    questEditName.value = request3.response.quest_name;
    questEditInfo.value = request3.response.quest_info;
    id.value = request3.response.quest_id;
    }
};

request3.send();

