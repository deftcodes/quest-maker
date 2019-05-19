// $('carousel').carousel({
//     interval: 3000
// })
//$('#exampleModal').modal({
  //  keyboard: false
    //backdrop: "static"
//})



// Элемент, куда будут загружаться квесты
var myQuests = document.querySelector('pre');

// Делаем запрос на сервер для получения квестов
// Запрос отрабатывает при каждой загрузке страницы
var url = "/my-quests"
var request = new XMLHttpRequest();
request.open('GET', url);
request.responseType = 'text';

// После получения ответа от сервера передаём данные в элемент myQuests
request.onload = function() {
  myQuests.textContent = request.response;
};

request.send();