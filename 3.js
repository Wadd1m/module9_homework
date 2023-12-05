// Напишите код приложения, интерфейс которого представляет собой input и кнопку. В input можно ввести любое число. При клике на кнопку происходит следующее:

// Если число не попадает в диапазон от 1 до 10 — выводить ниже текст «число вне диапазона от 1 до 10».
// Если число попадает в диапазон от 1 до 10 — сделать запрос c помощью XHR по URL https://jsonplaceholder.typicode.com/photos?_limit=5, где get-параметр limit — это введённое число.

const input = document.querySelector("input");
const submitButton = document.querySelector("button");
const outputSpan = document.querySelector("span");
const photosContainer = document.querySelector("div");

submitButton.addEventListener("click", submitButtonHandle);

function submitButtonHandle() {
    const value = input.value;

    if (value >= 1 && value <= 10 && !isNaN(value)) {
        useRequest("https://jsonplaceholder.typicode.com/photos?_limit=" + value, loadPhotos);
        write("Загружаю фото...");
    } else {
        write("Число вне диапазона от 1 до 10.");
    }
}

function write(text) {
    outputSpan.innerHTML = text;
}

function useRequest(url, callback) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);

    xhr.onload = function() {
        if (xhr.status !== 200) {
            write("Статус ответа: ", xhr.status);
        } else {
            const result = JSON.parse(xhr.response);
            if (callback) {
                callback(result);
            }
            write("Фото загружены.");
        }
    };

    xhr.onerror = function() {
        write("Ошибка! Статус ответа: ", xhr.status);
    };

    xhr.send();
};

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