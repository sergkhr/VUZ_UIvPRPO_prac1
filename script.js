

const fileInput = document.getElementById("fileInput");
const processBtn = document.getElementById("processBtn");
const output = document.getElementById("output");
const output_ini = document.getElementById("output_ini");


function displayOutput(text_ini, text) {
    output_ini.value = text_ini
    output.value = text;
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
        
        fileInput.value = "";
    } catch (error) {
        alert(error);
    }
});