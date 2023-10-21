document.addEventListener("DOMContentLoaded", function() {
    const educationDiv = document.querySelector('.education');
    const experienceDiv = document.querySelector('.experience');
    const educationLi = document.querySelector('.about-navbar ul li:nth-child(1)');
    const experienceLi = document.querySelector('.about-navbar ul li:nth-child(2)');
    const allLiElements = document.querySelectorAll('.about-navbar ul li');


    educationLi.addEventListener('click', function() {
        educationDiv.style.display = 'block';
        experienceDiv.style.display = 'none';

        allLiElements.forEach(li => li.classList.remove('active'));

        educationLi.classList.add('active');
    });

    experienceLi.addEventListener('click', function() {
        educationDiv.style.display = 'none';
        experienceDiv.style.display = 'block';

        allLiElements.forEach(li => li.classList.remove('active'));

        experienceLi.classList.add('active');
    });
});
