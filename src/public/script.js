// Элемент, куда будут загружаться квесты
var myQuests = document.querySelector('div[name="my-quests"]');
var questDetails = document.querySelector('input[name="quest-name"]');
var questDetails2 = document.querySelector('textarea[name="quest-info"]');

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
    a = a + '<a href="/quests-details?quest_name=' + element + '">' + element + '</a>';
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
    questDetails2.value = request2.response.inf;
  }
};

request2.send();