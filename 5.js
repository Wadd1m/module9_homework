// Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

// Заголовок первого input — «номер страницы».
// Заголовок второго input — «лимит».
// Заголовок кнопки — «запрос».
// При клике на кнопку происходит следующее:

// Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
// Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
// Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
// Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://jsonplaceholder.typicode.com/photos?_page=0&_limit=5, 
// где GET-параметр _page — это число из первого input, а GET-параметр _limit — это введённое число второго input.


const inputPageNumber = document.getElementById("page-number");
const inputLimit = document.getElementById("limit");
const submitButton = document.querySelector("button");
const outputSpan = document.querySelector("span");
const photosContainer = document.querySelector("div");

submitButton.addEventListener("click", submitButtonHandle);

if (loadPhotosFromLocalStorage())
    write("Загружены последние просмотренные фото.");

function submitButtonHandle() {
    const pageNumber = inputPageNumber.value;
    const limit = inputLimit.value;

    if ((pageNumber < 1 || pageNumber > 10 || isNaN(pageNumber)) && (limit < 1 || limit > 10 || isNaN(limit))) {
        write("Номер страницы и лимит вне диапазона от 1 до 10.");
        return;
    } else
    if (pageNumber < 1 || pageNumber > 10 || isNaN(pageNumber)) {
        write("Номер страницы вне диапазона от 1 до 10.");
        return;
    } else
    if (limit < 1 || limit > 10 || isNaN(limit)) {
        write("Лимит вне диапазона от 1 до 10.");
        return;
    }

    write("Загружаю фото...");

    fetch(`https://jsonplaceholder.typicode.com/photos?_page=${pageNumber}&limit=${limit}`)
        .then((response) => response.json())
        .then((json) => {
            loadPhotos(json);
            savePhotosToLocalStorage();
            write("Фото загружены.");
        })
        .catch((reason) => {
            write("Ошибка: " + reason);
        });
}

function write(text) {
    outputSpan.innerHTML = text;
}

function loadPhotos(apiData) {
    let cards = String();

    apiData.forEach(item => {
        const cardBlock =     `<div>
                                <img
                                  src="${item.download_url}"
                                  style="width: 150px; margin-right: 30px"
                                />
                                <p>${item.author}</p>
                              </div>`;
        cards += cardBlock;
    });

    photosContainer.innerHTML = cards;
}

function savePhotosToLocalStorage() {
    localStorage.setItem("last_photos", photosContainer.innerHTML);
}

function loadPhotosFromLocalStorage() {
    photosContainer.innerHTML = localStorage.getItem("last_photos");
    return  photosContainer.innerHTML.length > 0;
}