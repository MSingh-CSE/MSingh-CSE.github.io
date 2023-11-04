document.addEventListener("DOMContentLoaded", function () {
    // Hide the loader and show the content after the 'load' event
    window.addEventListener("load", function () {
        var loader = document.getElementById('loader-wrapper');
        var content = document.getElementById('main-content');

        // After the page is fully loaded, hide the loader
        loader.style.display = 'none';
        // And show the content
        content.style.display = 'block';
    });
});

