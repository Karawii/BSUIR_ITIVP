document.addEventListener("DOMContentLoaded", function() {
    // Ищем все изображения на странице, включая картинки с изображениями YouTube
    const images = document.querySelectorAll('img');

    // Функция для загрузки изображений
    function loadImage(image) {
        const src = image.getAttribute('data-src'); // Получаем путь к изображению из data-src
        if (src) {
            image.src = src; // Устанавливаем src
            image.onload = () => {
                image.classList.add('loaded'); // После загрузки добавляем класс loaded
            };
            image.removeAttribute('data-src'); // Убираем атрибут data-src
        }
    }

    // Используем IntersectionObserver для отслеживания изображений, которые видны на экране
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target); // Загружаем изображение, если оно видимо
                observer.unobserve(entry.target); // Прекращаем отслеживание этого изображения
            }
        });
    }, {
        threshold: 0.1 // Порог видимости, когда 10% изображения на экране — оно будет загружено
    });

    images.forEach(image => {
        // Преобразуем изображения для lazy loading
        const src = image.src;
        image.setAttribute('data-src', src); // Переносим исходный src в data-src
        image.removeAttribute('src'); // Убираем исходный атрибут src
        observer.observe(image); // Начинаем наблюдать за изображением
    });
});

window.onscroll = function() {
    const button = document.getElementById("scrollToTop");
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        button.classList.add('show');
    } else {
        button.classList.remove('show'); 
    }
};

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('dark-theme');
    body.classList.toggle('light-theme');
}

document.addEventListener("DOMContentLoaded", function() {
    const currentPage = window.location.pathname.split("/").pop();
    const galleryLinks = document.querySelectorAll('.galeruLinks');

    galleryLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.style.display = 'none';
        }
    });
});