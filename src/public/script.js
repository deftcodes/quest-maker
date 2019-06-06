
function edit()
{
  var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
window.location='/quest-edit?quest_id='+ vars["quest_id"];
}

// Элемент, куда будут загружаться квесты
var questName = document.querySelector('div[name="my-quests"]');

var questDetails = document.querySelector('input[name="quest-name"]');
var questDetailsInfo = document.querySelector('textarea[name="quest-info"]');
var questDetailsPhoto = document.querySelector('div[name="photo"]');
var questDetailsId = document.querySelector('input[name="quest-id"]');

var id = document.querySelector('input[name="quest_id"]');
var questEditName = document.querySelector('input[name="quest_name"]');
var questEditInfo = document.querySelector('textarea[name="quest_info"]');

// Делаем запрос на сервер для получения квестов
 // Запрос отрабатывает при каждой загрузке страницы
 var url = "/my-quests"
 var request = new XMLHttpRequest();
 request.open('GET', url);
 request.responseType = 'json';

// После получения ответа от сервера передаём данные в элемент 
 request.onload = function () {
  if (request.response != undefined) {
    var b = '';
    if (request.response.quest_file != undefined){
      b = '<a href="#">'+  request.response.quest_name + '</a>';
      questName.innerHTML = b;
    }
  }
};

request.send();

var url2 = "/quests-table-page"
var request2 = new XMLHttpRequest();
request2.open('GET', url2);
request2.responseType = 'json';

request2.onload = function () {
  if (request2.response != undefined) {
    questDetails.value = request2.response.quest_name;
    questDetailsId.value = request2.response.quest_id;
    }
};

request2.send();

var url4 = "/quests-table"
var request4 = new XMLHttpRequest();
request4.open('GET', url4);
request4.responseType = 'json';

request4.onload = function () {
  if (request4.response != undefined) {
    request4.response.forEach(function(element) {
      var newRow=document.getElementById('quest-table').insertRow();
      newRow.innerHTML = `<tr>
      <td><textarea name="quest-id">` + element.quest_id + `</textarea></td>
      <td><textarea name="quest-name">`+ element.quest_name +`</textarea></td>
      <td><button type="submit" class="btn btn-primary">Редактировать</button></td>
      <td><button type="submit" class="btn btn-primary">Запустить квест</button></td>
      </tr>`;
    });
    }
};

request4.send();

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



