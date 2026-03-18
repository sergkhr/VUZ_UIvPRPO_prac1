const fileInput = document.getElementById("fileInput");
const processBtn = document.getElementById("processBtn");
const output = document.getElementById("output");
const output_ini = document.getElementById("output_ini");


function displayOutput(text_ini, text) {
    output_ini.value = text_ini
    output.value = text;
}


function processText(text) {
    const phoneRegex = /(\+?\d[\d\s\-()_]{7,}\d)/g;

    return text.replace(phoneRegex, (match) => {
        // Удаляем всё кроме цифр
        let digits = match.replace(/\D/g, "");

        // Обработка разных случаев
        if (digits.length === 11 && (digits[0] === "7" || digits[0] === "8")) {
            // Убираем код страны (7 или 8)
            digits = digits.slice(1);
        } else if (digits.length === 10) {
            // Ок, уже локальный номер
        } else {
            // Если длина странная — не трогаем
            return match;
        }

        // Теперь должно быть 10 цифр
        if (digits.length !== 10) return match;

        const area = digits.slice(0, 3);
        const number = digits.slice(3);

        return `+1 (${area}) ${number}`;
    });
}


function readFile(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = function (e) {
            resolve(e.target.result);
        };

        reader.onerror = function () {
            reject("Ошибка чтения файла");
        };

        reader.readAsText(file);
    });
}


processBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];

    if (!file) {
        alert("Выберите файл");
        return;
    }

    try {
        const text = await readFile(file);
        const result = processText(text);
        displayOutput(text, result);
    } catch (error) {
        alert(error);
    }
});