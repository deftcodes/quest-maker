
function edit()
{
  var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
window.location='/quest-edit?quest_id='+ vars["quest_id"];
}

// Элемент, куда будут загружаться квесты
var questDetails = document.querySelector('input[name="quest-name"]');
var questDetailsInfo = document.querySelector('textarea[name="quest-info"]');
var questDetailsPhoto = document.querySelector('div[name="photo"]');
var questDetailsId = document.querySelector('input[name="quest-id"]');

var id = document.querySelector('input[name="quest_id"]');
var questEditName = document.querySelector('input[name="quest_name"]');
var questEditInfo = document.querySelector('textarea[name="quest_info"]');

// Делаем запрос на сервер для получения квестов
// Запрос отрабатывает при каждой загрузке страницы
var url = "/detail-name"
var request = new XMLHttpRequest();
request.open('GET', url);
request.responseType = 'json';

// После получения ответа от сервера передаём данные в элемент 
request.onload = function () {
  if (request.response != undefined) {
    questDetails.value = request.response.quest_name;
    questDetailsId.value = request.response.quest_id;
   // var b = '';
    //if (request.response.quest_file != undefined){
   //b = '<audio src="' +  request.response.quest_file + '" class="w-100" controls></audio>';
   // questDetailsPhoto.innerHTML = b;
   // }
    }
};

request.send();

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

