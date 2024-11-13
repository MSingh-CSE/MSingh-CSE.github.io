document.addEventListener("DOMContentLoaded", function () {
    var loader = document.getElementById('loader-wrapper');
    var content = document.getElementById('main-content');

    document.body.classList.add('loaded');

    loader.style.display = 'none';
    content.style.display = 'block';
});
