document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('img[data-src]'); 
    const iframes = document.querySelectorAll('iframe[data-src]');
    function loadImage(image) {
        const src = image.getAttribute('data-src');
        if (src) {
            image.src = src;
            image.onload = () => image.classList.add('loaded');  
            image.removeAttribute('data-src');  
        }
    }

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadImage(entry.target);  
                observer.unobserve(entry.target);  
            }
        });
    }, { threshold: 0.1 }); 

    images.forEach(image => {
        observer.observe(image); 
    });

    iframes.forEach(iframe => {
        observer.observe(iframe); 
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

document.addEventListener("DOMContentLoaded", function() {
    const themeToggleButton = document.getElementById("themeToggle");
    const currentTheme = localStorage.getItem("theme");

    if (currentTheme === "dark") {
        document.body.classList.add("dark-theme");
    } else {
        document.body.classList.remove("dark-theme");
    }

    themeToggleButton.addEventListener("click", function() {
        document.body.classList.toggle("dark-theme");

        if (document.body.classList.contains("dark-theme")) {
            localStorage.setItem("theme", "dark");
        } else {
            localStorage.setItem("theme", "light");
        }
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById('searchButton');
    const movieSearch = document.getElementById('movieSearch');
    const movieDetailsSection = document.getElementById('movieDetails');
    
    searchButton.addEventListener('click', async function() {
        await searchMovie();
    });

    async function searchMovie() {
    const movieTitle = movieSearch.value.trim();
    
    if (!movieTitle) {
        alert('Введите название фильма');
        return;
    }

    const apiKey = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjRkZDViZmYyZGM3NjZjMjk4MjE2ZTZlYmFhZTZmZSIsIm5iZiI6MTc0NzMyMzE5NS43MTI5OTk4LCJzdWIiOiI2ODI2MDkzYjFiNTYxNjQxZjA0YjU0M2YiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.iEfIRRO6nz8QQ3L-A7sIA8o1YS7QbZSLe1rSm9nPwYA';
    const url = `https://api.themoviedb.org/3/search/movie?query=${movieTitle}&api_key=${apiKey}&language=ru-RU`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Ошибка при запросе: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            displayMovieDetails(data.results[0]);
        } else {
            displayNoResultsMessage();
        }
    } catch (error) {
        console.error('Ошибка при запросе:', error);
        alert('Произошла ошибка при запросе данных. Попробуйте позже.');
    }
}

    function displayMovieDetails(movie) {
        movieDetailsSection.style.display = 'block';

        movieDetailsSection.innerHTML = `
            <h2>${movie.title}</h2>
            <p><strong>Описание:</strong> ${movie.overview}</p>
            <p><strong>Дата выхода:</strong> ${movie.release_date}</p>
            <p><strong>Оценка:</strong> ${movie.vote_average}</p>
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
        `;
    }

    function displayNoResultsMessage() {
        movieDetailsSection.style.display = 'block'; 
        movieDetailsSection.innerHTML = `<p>Фильмы не найдены по вашему запросу.</p>`;
    }
});