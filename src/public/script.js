// Элемент, куда будут загружаться квесты
var myQuests = document.querySelector('pre');

// Делаем запрос на сервер для получения квестов
// Запрос отрабатывает при каждой загрузке страницы
var url = "/my-quests"
var request = new XMLHttpRequest();
request.open('GET', url);
request.responseType = 'text';

// После получения ответа от сервера передаём данные в элемент myQuests
request.onload = function () {
  if (request.response != undefined)
    myQuests.textContent = request.response;
};

request.send();