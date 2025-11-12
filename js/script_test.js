// Данные для викторины
const quizData = {
    all: [
        {
            question: "Кто является верховным богом в греческой мифологии?",
            answers: ["Зевс", "Посейдон", "Аид", "Аполлон"],
            correct: 0,
            mythology: "greek"
        },
        {
            question: "Как зовут верховного бога в скандинавской мифологии?",
            answers: ["Тор", "Один", "Локи", "Фрейр"],
            correct: 1,
            mythology: "norse"
        },
        {
            question: "Кто является богом солнца в египетской мифологии?",
            answers: ["Осирис", "Анубис", "Ра", "Сет"],
            correct: 2,
            mythology: "egyptian"
        },
        {
            question: "Как зовут бога-громовержца в славянской мифологии?",
            answers: ["Велес", "Сварог", "Перун", "Даждьбог"],
            correct: 2,
            mythology: "slavic"
        },
        {
            question: "Кто охранял вход в подземное царство Аида?",
            answers: ["Минотавр", "Цербер", "Гидра", "Химера"],
            correct: 1,
            mythology: "greek"
        },
        {
            question: "Какое мифическое существо имеет тело льва и голову орла?",
            answers: ["Сфинкс", "Грифон", "Химера", "Гарпия"],
            correct: 1,
            mythology: "all"
        },
        {
            question: "Кто создал людей из глины в греческой мифологии?",
            answers: ["Зевс", "Гефест", "Прометей", "Афина"],
            correct: 2,
            mythology: "greek"
        },
        {
            question: "Как зовут бога мудрости и магии в скандинавской мифологии?",
            answers: ["Тор", "Один", "Локи", "Хеймдалль"],
            correct: 1,
            mythology: "norse"
        },
        {
            question: "Кто является богом загробного мира в египетской мифологии?",
            answers: ["Ра", "Анубис", "Осирис", "Гор"],
            correct: 2,
            mythology: "egyptian"
        },
        {
            question: "Как зовут бога солнца в славянской мифологии?",
            answers: ["Перун", "Сварог", "Велес", "Даждьбог"],
            correct: 3,
            mythology: "slavic"
        },
        {
            question: "Какое оружие было у бога Тора?",
            answers: ["Копье Гунгнир", "Молот Мьёльнир", "Меч Грам", "Топор"],
            correct: 1,
            mythology: "norse"
        },
        {
            question: "Кто является богиней любви и красоты в греческой мифологии?",
            answers: ["Афина", "Артемида", "Афродита", "Гера"],
            correct: 2,
            mythology: "greek"
        },
        {
            question: "Как зовут бога мудрости и знаний в египетской мифологии?",
            answers: ["Тот", "Птах", "Атум", "Хепри"],
            correct: 0,
            mythology: "egyptian"
        },
        {
            question: "Кто является богом скота и богатства в славянской мифологии?",
            answers: ["Перун", "Сварог", "Велес", "Стрибог"],
            correct: 2,
            mythology: "slavic"
        },
        {
            question: "Как называется корабль, на котором плавали аргонавты?",
            answers: ["Одиссей", "Арго", "Тритон", "Посейдон"],
            correct: 1,
            mythology: "greek"
        }
    ]
};

// Элементы DOM
const welcomeScreen = document.getElementById('welcomeScreen');
const gameScreen = document.getElementById('gameScreen');
const resultsScreen = document.getElementById('resultsScreen');
const startBtn = document.getElementById('startBtn');
const nextBtn = document.getElementById('nextBtn');
const restartBtn = document.getElementById('restartBtn');
const questionCounter = document.getElementById('questionCounter');
const scoreElement = document.getElementById('score');
const questionText = document.getElementById('questionText');
const answersContainer = document.getElementById('answersContainer');
const feedback = document.getElementById('feedback');
const finalScore = document.getElementById('finalScore');
const scoreMessage = document.getElementById('scoreMessage');
const mythologyBadge = document.getElementById('mythologyBadge');

// Переменные игры
let currentMythology = 'all';
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
let answered = false;

// Инициализация игры
function initGame() {
    // Получаем выбранную мифологию
    const selectedOption = document.querySelector('.mythology-option.active');
    currentMythology = selectedOption ? selectedOption.dataset.mythology : 'all';

    // Фильтруем вопросы по выбранной мифологии
    if (currentMythology === 'all') {
        currentQuestions = [...quizData.all];
    } else {
        currentQuestions = quizData.all.filter(q =>
            q.mythology === currentMythology || q.mythology === 'all'
        );
    }

    // Перемешиваем вопросы
    currentQuestions = shuffleArray(currentQuestions).slice(0, 10);

    // Сбрасываем состояние игры
    currentQuestionIndex = 0;
    score = 0;
    scoreElement.textContent = `Счёт: ${score}`;

    // Показываем экран игры
    showScreen(gameScreen);
    loadQuestion();
}

// Загрузка вопроса
function loadQuestion() {
    answered = false;
    const question = currentQuestions[currentQuestionIndex];

    // Обновляем счетчик вопросов
    questionCounter.textContent = `Вопрос ${currentQuestionIndex + 1}/${currentQuestions.length}`;

    // Обновляем текст вопроса
    questionText.textContent = question.question;

    // Очищаем контейнер ответов
    answersContainer.innerHTML = '';

    // Добавляем варианты ответов
    question.answers.forEach((answer, index) => {
        const answerBtn = document.createElement('button');
        answerBtn.className = 'answer-btn';
        answerBtn.textContent = answer;
        answerBtn.addEventListener('click', () => checkAnswer(index));
        answersContainer.appendChild(answerBtn);
    });

    // Скрываем кнопку "Следующий вопрос" и фидбэк
    nextBtn.style.display = 'none';
    feedback.className = 'feedback';
}

// Проверка ответа
function checkAnswer(selectedIndex) {
    if (answered) return;

    answered = true;
    const question = currentQuestions[currentQuestionIndex];
    const answerButtons = document.querySelectorAll('.answer-btn');

    // Показываем правильный и неправильный ответ
    answerButtons.forEach((btn, index) => {
        if (index === question.correct) {
            btn.classList.add('correct');
        } else if (index === selectedIndex) {
            btn.classList.add('incorrect');
        }
        btn.disabled = true;
    });

    // Проверяем, правильный ли ответ
    if (selectedIndex === question.correct) {
        score++;
        scoreElement.textContent = `Счёт: ${score}`;
        feedback.textContent = 'Правильно!';
        feedback.className = 'feedback correct';
    } else {
        feedback.textContent = `Неправильно! Правильный ответ: ${question.answers[question.correct]}`;
        feedback.className = 'feedback incorrect';
    }

    // Показываем кнопку "Следующий вопрос"
    nextBtn.style.display = 'block';
}

// Переход к следующему вопросу
function nextQuestion() {
    currentQuestionIndex++;

    if (currentQuestionIndex < currentQuestions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

// Показ результатов
function showResults() {
    const percentage = (score / currentQuestions.length) * 100;

    // Обновляем результаты
    finalScore.textContent = `${score}/${currentQuestions.length}`;

    // Сообщение в зависимости от результата
    if (percentage >= 90) {
        scoreMessage.textContent = 'Отличный результат! Вы настоящий знаток мифологии!';
    } else if (percentage >= 70) {
        scoreMessage.textContent = 'Хороший результат! Вы хорошо разбираетесь в мифологии.';
    } else if (percentage >= 50) {
        scoreMessage.textContent = 'Неплохой результат! Есть что повторить.';
    } else {
        scoreMessage.textContent = 'Попробуйте еще раз! Мифология - это увлекательно!';
    }

    // Бейдж с названием мифологии
    const mythologyNames = {
        all: 'Все мифологии',
        greek: 'Греческая мифология',
        norse: 'Скандинавская мифология',
        egyptian: 'Египетская мифология',
        slavic: 'Славянская мифология'
    };

    mythologyBadge.textContent = mythologyNames[currentMythology];

    // Показываем экран результатов
    showScreen(resultsScreen);
}

// Вспомогательные функции
function showScreen(screen) {
    // Скрываем все экраны
    welcomeScreen.classList.remove('active');
    gameScreen.classList.remove('active');
    resultsScreen.classList.remove('active');

    // Показываем нужный экран
    screen.classList.add('active');
}

function shuffleArray(array) {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
}

// Обработчики событий
startBtn.addEventListener('click', initGame);
nextBtn.addEventListener('click', nextQuestion);
restartBtn.addEventListener('click', () => showScreen(welcomeScreen));

// Выбор мифологии
document.querySelectorAll('.mythology-option').forEach(option => {
    option.addEventListener('click', () => {
        document.querySelectorAll('.mythology-option').forEach(opt => {
            opt.classList.remove('active');
        });
        option.classList.add('active');
    });
});