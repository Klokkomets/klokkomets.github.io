document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');
    const searchNotification = document.getElementById('search-notification');
    const searchMessage = document.getElementById('search-message');
    const searchResults = document.getElementById('search-results');

    // База данных для поиска
    const searchDatabase = [
        { title: "Греческая мифология", type: "Мифология", keywords: "греция зевс аид афина аполлон артемида гермес", url: "#" },
        { title: "Скандинавская мифология", type: "Мифология", keywords: "скандинавия викинги один тор локи фрейя", url: "#" },
        { title: "Египетская мифология", type: "Мифология", keywords: "египет ра осирис анубис исида гор", url: "#" },
        { title: "Славянская мифология", type: "Мифология", keywords: "славяне перун велес дажьбог макошь", url: "#" },
        { title: "Японская мифология", type: "Мифология", keywords: "япония ёкай нагицуне эбису аматерасу", url: "#" },
        { title: "Китайская мифология", type: "Мифология", keywords: "китай нефритовый император гуаньинь фуси", url: "#" },
        { title: "Зевс", type: "Бог", keywords: "громовержец олимп греция небо", url: "#" },
        { title: "Один", type: "Бог", keywords: "верховный скандинавия мудрость война вороны", url: "#" },
        { title: "Ра", type: "Бог", keywords: "солнце египет фараон небо", url: "#" },
        { title: "Перун", type: "Бог", keywords: "громовержец славяне молния дуб", url: "#" },
        { title: "Минотавр", type: "Существо", keywords: "крит лабиринт астерий тесей", url: "#" },
        { title: "Феникс", type: "Существо", keywords: "птица огонь возрождение бессмертие", url: "#" },
        { title: "Кентавр", type: "Существо", keywords: "лошадь человек греция хирон", url: "#" }
    ];

    // Функция поиска
    function performSearch() {
        const query = searchInput.value.trim().toLowerCase();

        if (query === '') {
            showNotification('Введите поисковый запрос', 'info');
            return;
        }

        // Поиск по базе данных
        const results = searchDatabase.filter(item => {
            return item.title.toLowerCase().includes(query) ||
                item.keywords.toLowerCase().includes(query);
        });

        // Отображение результатов
        displaySearchResults(results, query);
    }

    // Отображение результатов поиска
    function displaySearchResults(results, query) {
        searchResults.innerHTML = '';

        if (results.length === 0) {
            showNotification(`По запросу "${query}" ничего не найдено`, 'warning');
            return;
        }

        showNotification(`Найдено ${results.length} результатов по запросу "${query}"`, 'success');

        results.forEach(result => {
            const resultItem = document.createElement('div');
            resultItem.className = 'search-result-item';
            resultItem.innerHTML = `
                        <strong>${result.title}</strong> <span style="color: #888; font-size: 0.9em;">(${result.type})</span>
                    `;
            resultItem.addEventListener('click', function () {
                // В реальном приложении здесь был бы переход на страницу
                showNotification(`Переход на страницу: ${result.title}`, 'info');
            });

            searchResults.appendChild(resultItem);
        });
    }

    // Показать уведомление
    function showNotification(message, type) {
        searchMessage.textContent = message;

        // Сброс предыдущих классов
        searchNotification.className = 'search-notification';

        // Добавление класса типа уведомления
        if (type === 'success') {
            searchNotification.style.borderLeftColor = '#4CAF50';
        } else if (type === 'warning') {
            searchNotification.style.borderLeftColor = '#FF9800';
        } else if (type === 'info') {
            searchNotification.style.borderLeftColor = '#2196F3';
        }

        // Показать уведомление
        searchNotification.classList.add('show');

        // Автоматически скрыть через 5 секунд
        setTimeout(() => {
            searchNotification.classList.remove('show');
        }, 5000);
    }

    // Обработчики событий
    searchButton.addEventListener('click', performSearch);

    searchInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Закрыть уведомление при клике вне его
    document.addEventListener('click', function (e) {
        if (!searchNotification.contains(e.target) &&
            e.target !== searchInput &&
            e.target !== searchButton) {
            searchNotification.classList.remove('show');
        }
    });
});

// Плавная прокрутка к якорям
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Подсветка текущего раздела при прокрутке
window.addEventListener('scroll', function () {
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.page-nav a');

    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            currentSection = '#' + section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
});

// Добавляем стиль для активной ссылки
const style = document.createElement('style');
style.textContent = `
            .page-nav a.active {
                background-color: var(--primary) !important;
                color: white !important;
            }
        `;
document.head.appendChild(style);
