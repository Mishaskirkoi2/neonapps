// Функции для работы с модальным окном скриншотов
var currentImageIndex = 0;
var screenshots = [];

// Инициализация после загрузки DOM
function initApp() {
    screenshots = document.querySelectorAll('.screenshot');
    initScreenshotModal();
}

function initScreenshotModal() {
    // Закрытие модального окна при клике вне изображения
    var modal = document.getElementById('imageModal');
    if (modal) {
        modal.onclick = function(e) {
            if (e.target === this) {
                closeModal();
            }
        };
    }

    // Закрытие модального окна по клавише ESC
    if (document.addEventListener) {
        document.addEventListener('keydown', function(e) {
            if (e.keyCode === 27) { // ESC key
                closeModal();
            }
        });
    } else if (document.attachEvent) {
        document.attachEvent('onkeydown', function(e) {
            if (e.keyCode === 27) { // ESC key
                closeModal();
            }
        });
    }
}

function openModal(index) {
    currentImageIndex = index;
    document.getElementById('imageModal').style.display = 'flex';
    document.getElementById('modalImage').src = screenshots[currentImageIndex].src;
    document.body.style.overflow = 'hidden'; // Блокируем прокрутку страницы
}

function closeModal() {
    document.getElementById('imageModal').style.display = 'none';
    document.body.style.overflow = 'auto'; // Восстанавливаем прокрутку
}

function changeImage(direction) {
    currentImageIndex += direction;
    
    // Зацикливаем перелистывание
    if (currentImageIndex >= screenshots.length) {
        currentImageIndex = 0;
    } else if (currentImageIndex < 0) {
        currentImageIndex = screenshots.length - 1;
    }
    
    document.getElementById('modalImage').src = screenshots[currentImageIndex].src;
}

// Инициализация с поддержкой старых браузеров
if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', initApp);
} else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', function() {
        if (document.readyState === 'complete') {
            initApp();
        }
    });
} else {
    window.onload = initApp;
}
