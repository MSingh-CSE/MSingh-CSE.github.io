let currentSection = null;
let currentAnimationController = null;

function fadeElement(element, opacity, duration, signal) {
    return new Promise((resolve, reject) => {
        if (signal.aborted) {
            reject(new DOMException('Aborted', 'AbortError'));
            return;
        }

        element.style.transition = `opacity ${duration}ms ease`;
        element.style.opacity = opacity;
        
        const timeoutId = setTimeout(() => {
            resolve();
        }, duration);

        signal.addEventListener('abort', () => {
            clearTimeout(timeoutId);
            element.style.transition = ''; 
            reject(new DOMException('Aborted', 'AbortError'));
        });
    });
}

function showSection(sectionId) {

    if (currentSection === sectionId) {
        return;
    }

    if (currentAnimationController) {
        currentAnimationController.abort(); 
    }

    currentAnimationController = new AbortController();  
    const signal = currentAnimationController.signal;

    const targetSection = document.getElementById(sectionId);
    const educationLi = document.querySelector('.about-navbar ul li:nth-child(1)');
    const experienceLi = document.querySelector('.about-navbar ul li:nth-child(2)');

    educationLi.classList.remove('active');
    experienceLi.classList.remove('active');

    if (sectionId === 'education') {
        educationLi.classList.add('active');
    } else if (sectionId === 'experience') {
        experienceLi.classList.add('active');
    }

    let oldSection = currentSection ? document.getElementById(currentSection) : null;
    currentSection = sectionId;

    Promise.resolve()
    .then(() => {
        if (oldSection) {
            return fadeElement(oldSection, 0, 500, signal);
        }
    })
    .then(() => {
        if (oldSection) {
            oldSection.style.display = "none";
        }
        targetSection.style.display = "flex"; 
        return fadeElement(targetSection, 1, 500, signal);
    })
    .catch(error => {
        if (error.name !== 'AbortError') {
            console.error('Animation failed:', error);
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    showSection("education");
    const educationLi = document.querySelector('.about-navbar ul li:nth-child(1)');
    const experienceLi = document.querySelector('.about-navbar ul li:nth-child(2)');

    educationLi.addEventListener('click', function() {
        showSection('education');
    });

    experienceLi.addEventListener('click', function() {
        showSection('experience');
    });
});
