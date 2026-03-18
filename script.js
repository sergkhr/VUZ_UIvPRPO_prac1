const fileInput = document.getElementById("fileInput");
const processBtn = document.getElementById("processBtn");
const output = document.getElementById("output");


function displayOutput(text) {
    output.value = text;
}


function processText(text) {
    // placeholder
    return text;
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
        displayOutput(result);
    } catch (error) {
        alert(error);
    }
});