document.addEventListener('DOMContentLoaded', (event) => {
    const themeToggle = document.getElementById('theme-toggle');
    const iconLight = document.getElementById('icon-light');
    const iconDark = document.getElementById('icon-dark');
    const currentTheme = localStorage.getItem('theme');

    if (currentTheme === 'dark-theme') {
        document.body.classList.add('dark-theme');
        iconDark.style.display = 'block';
        iconLight.style.display = 'none';
    } else {
        iconLight.style.display = 'block';
        iconDark.style.display = 'none';
    }

    themeToggle.addEventListener('click', function () {
        document.body.classList.toggle('dark-theme');
        if (document.body.classList.contains('dark-theme')) {
            iconDark.style.display = 'block';
            iconLight.style.display = 'none';
            localStorage.setItem('theme', 'dark-theme');
        } else {
            iconLight.style.display = 'block';
            iconDark.style.display = 'none';
            localStorage.setItem('theme', 'light-theme');
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.getElementById('theme-toggle');
    const images = document.querySelectorAll('.theme-image');

    function updateImagesForTheme() {
        images.forEach(img => {
            const lightSrc = img.getAttribute('data-light');
            const darkSrc = img.getAttribute('data-dark');
            img.src = document.body.classList.contains('dark-theme') ? darkSrc : lightSrc;
        });
    }

    updateImagesForTheme();

    themeToggle.addEventListener('click', () => {
        updateImagesForTheme();
    });
});
