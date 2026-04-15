


function processText(text) {
    // Ищем все потенциальные номера
    const phoneRegex = /(\+?\d[\d\s\-()_!]{5,}\d)/g;

    return text.replace(phoneRegex, (match) => {
        // 1. Если есть буквы → НЕ исправляем   -- TODO - ГПТ моумент - пересмотреть, исправить
        if (/[a-zA-Zа-яА-Я]/.test(match)) {
            return match;
        }

        // 2. Оставляем только цифры
        let digits = match.replace(/\D/g, "");

        // 3. Проверка длины
        if (digits.length < 10) {
            return match; // НЕисправляемо
        }

        // 4. Нормализация
        if (digits.length === 11 && (digits[0] === "7" || digits[0] === "8")) {
            digits = digits.slice(1);
        } else if (digits.length === 10) {
            // локальный номер — ок
        } else {
            return match; // лишние цифры → НЕисправляемо
        }

        // 5. Финальная проверка
        if (digits.length !== 10) return match;

        const area = digits.slice(0, 3);
        const number = digits.slice(3);

        return `+1 (${area}) ${number}`;
    });
}

module.exports = { processText };