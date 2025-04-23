document.addEventListener("DOMContentLoaded", function() {
    const images = document.querySelectorAll('img[data-src]'); 

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