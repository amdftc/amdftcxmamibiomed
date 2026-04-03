// Общие функции
document.addEventListener('DOMContentLoaded', function() {
    // Для тренировки интеллекта
    if (document.getElementById('question-container')) {
        initQuiz();
    }
});

function initQuiz() {
    const questions = [
        {
            question: "Робот перестал ехать прямо и начал крутиться на месте. Что проверить первым?",
            options: ["Работает ли джойстик", "Не отвалилось ли одно из колес или провод от мотора", "В каком альянсе твоя команда", "Не пора ли пообедать"],
            correct: 1,
            explanation: "Самая простая причина поломки обычно самая верная."
        },
        {
            question: "У вас есть выбор: сделать механизм из картона за 5 минут или из металла за 5 часов. С чего лучше начать проверку идеи?",
            options: ["Сразу из металла, чтобы было крепко", "Из картона, чтобы быстро понять, работает идея или нет", "Вообще ничего не делать", "Купить готовое в магазине"],
            correct: 1,
            explanation: "Инженеры всегда сначала делают дешевый прототип."
        },
        {
            question: "Вы увидели, что провод на роботе немного оголился. Ваши действия?",
            options: ["Замотать изолентой прямо сейчас", "Подождать, пока он заискрится", "Сказать, что так и было", "Покрасить его в другой цвет"],
            correct: 0,
            explanation: "Маленькая проблема сегодня — это большой пожар завтра."
        },
        {
            question: "Что делать, если робот на тренировке работает, а на соревнованиях — нет?",
            options: ["Плакать", "Спокойно проверить все настройки (вдруг что-то отошло при перевозке)", "Сказать, что это магия", "Отказаться участвовать на матче"],
            correct: 1,
            explanation: "Стрессоустойчивость — важное качество инженера."
        },
        {
            question: "Почему важно, чтобы кнопка выключения робота была на видном месте?",
            options: ["Чтобы её было удобно нажимать ногой", "Чтобы в случае опасности любой мог быстро остановить робота", "Чтобы она не мешала дизайну", "Кнопка не нужна, можно просто выдернуть шнур"],
            correct: 1,
            explanation: "Безопасность должна быть доступной."
        },
        {
            question: "Какое самое главное правило инженера при работе в команде?",
            options: ["Быть самым умным", "Помогать друг другу и делиться информацией", "Делать всё самому, чтобы было качественно", "Приходить позже всех"],
            correct: 1,
            explanation: "Робот — это результат работы всей команды, а не одного человека."
        },
        {
            question: "Что делать, если деталь на роботе постоянно ломается в одном и том же месте?",
            options: ["Клеить её скотчем каждый раз", "Подумать, почему там такая нагрузка, и изменить конструкцию", "Перестать пользоваться этой деталью", "Сказать, что деталь бракованная"],
            correct: 1,
            explanation: "Нужно лечить причину, а не симптомы."
        },
        {
            question: "Команда спорит, как строить робота. Один человек кричит громче всех. Чье решение принять?",
            options: ["Того, кто громче кричит", "Того, чья идея логичнее и подтверждена расчетами или тестами", "Ничье, лучше разойтись по домам", "Решить спором на кулаках"],
            correct: 1,
            explanation: "В инженерии факты важнее эмоций."
        }
    ];

    let currentQuestion = 0;
    let score = 0;
    const questionContainer = document.getElementById('question-container');
    const nextBtn = document.getElementById('next-btn');
    const resultDiv = document.getElementById('result');

    function loadQuestion() {
        const q = questions[currentQuestion];
        questionContainer.innerHTML = `
            <div class="question">
                <p id="question-text">${q.question}</p>
                <div class="options">
                    ${q.options.map((opt, idx) => `<div class="option" data-index="${idx}">${opt}</div>`).join('')}
                </div>
            </div>
        `;

        // Добавить обработчики кликов
        document.querySelectorAll('.option').forEach(option => {
            option.addEventListener('click', selectOption);
        });
    }

    function selectOption(e) {
        const selected = e.target;
        const index = parseInt(selected.dataset.index);
        const q = questions[currentQuestion];

        // Отключить клики на остальные элементы
        document.querySelectorAll('.option').forEach(opt => {
            opt.style.pointerEvents = 'none';
        });

        // Показать правильный ответ зеленым
        document.querySelectorAll('.option').forEach((opt, idx) => {
            if (idx === q.correct) {
                opt.classList.add('correct');
            }
        });

        // Показать выбранный ответ
        if (index === q.correct) {
            score++;
            selected.classList.add('selected');
        } else {
            selected.classList.add('incorrect');
        }

        // Показать объяснение
        setTimeout(() => {
            alert(q.explanation);
            nextQuestion();
        }, 1000);
    }

    function nextQuestion() {
        currentQuestion++;
        if (currentQuestion < questions.length) {
            loadQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        questionContainer.style.display = 'none';
        nextBtn.style.display = 'none';
        resultDiv.innerHTML = `<p>Вы ответили правильно на ${score} из ${questions.length} вопросов.</p>`;
    }

    nextBtn.addEventListener('click', nextQuestion);

    loadQuestion();
}