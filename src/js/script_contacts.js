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

// Модальное окно для социальных сетей
document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('redirectModal');
    const modalMessage = document.getElementById('modalMessage');
    const confirmBtn = document.getElementById('confirmRedirect');
    const cancelBtn = document.getElementById('cancelRedirect');

    let targetUrl = '';
    let platformName = '';

    // Обработчики для ссылок социальных сетей
    document.querySelectorAll('.social-link').forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            platformName = this.getAttribute('data-platform');
            targetUrl = this.getAttribute('data-url');

            // Настройка сообщения в модальном окне
            modalMessage.innerHTML = `
                        Вы собираетесь покинуть Мифопедию и перейти на <strong>${platformName}</strong>. 
                        Пожалуйста, помните о безопасности в интернете и не делитесь личной информацией.
                        <br><br>
                        <em>Ссылка: ${targetUrl}</em>
                    `;

            // Показ модального окна
            modal.style.display = 'flex';
        });
    });

    // Подтверждение перехода
    confirmBtn.addEventListener('click', function () {
        window.open(targetUrl, '_blank');
        modal.style.display = 'none';
    });

    // Отмена перехода
    cancelBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });

    // Закрытие модального окна при клике вне его
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Закрытие модального окна при нажатии Escape
    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && modal.style.display === 'flex') {
            modal.style.display = 'none';
        }
    });
});