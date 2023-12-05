// Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать JSON в JS-объект и выводить его в консоль.

const jsonString = `
{
	"list": [
	 {
	  "name": "Petr",
	  "age": "20",
	  "prof": "mechanic"
	 },
	 {
	  "name": "Vova",
	  "age": "60",
	  "prof": "pilot"
	 }
	]
   }
   `;

function transformJson(strJson) {

	let data = JSON.parse(strJson);
	
    let list = data.list;
	
	let result = {list: []};
	let objList = new Object();
	    
	list.forEach(function(elem) {
		objList = elem;

        result.list.push(objList);

	});
	console.log(result);
}
transformJson(jsonString); 