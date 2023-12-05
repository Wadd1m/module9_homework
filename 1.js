// Вам дана заготовка и результат, который вы должны получить. Ваша задача — написать код, который будет преобразовывать XML в JS-объект и выводить его в консоль.

const xmlString = `
<list>
  <student>
    <name lang="en">
      <first>Ivan</first>
      <second>Ivanov</second>
    </name>
    <age>35</age>
    <prof>teacher</prof>
  </student>
  <student>
    <name lang="ru">
      <first>Петр</first>
      <second>Петров</second>
    </name>
    <age>58</age>
    <prof>driver</prof>
  </student>
</list>
`; 


const parser = new DOMParser();
const xmlDOM = parser.parseFromString(xmlString, "text/xml");

const listNode = xmlDOM.querySelector("list");
const studentsNode = listNode.querySelectorAll("student");

const object = {
    list: []
};

studentsNode.forEach(function(element) {
    const studentName = element.querySelector("name");
    const studentFirstName = studentName.querySelector("first").textContent;
    const studentSecondName = studentName.querySelector("second").textContent;
    const studentAge = element.querySelector("age").textContent;
    const studentProf = element.querySelector("prof").textContent;

    const student = {
        name: {
            first: studentFirstName,
            second: studentSecondName
        },
        age: studentAge,
        prof: studentProf
    };

    object.list.push(student);
});

console.log(object);