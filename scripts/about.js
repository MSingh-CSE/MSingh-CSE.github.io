let currentSection = null;

function fadeElement(element, opacity, duration) {
  return new Promise(resolve => {
    element.style.transition = `opacity ${duration}ms ease`;
    element.style.opacity = opacity;
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

function showSection(sectionId) {
  if (currentSection === sectionId) {
    return;
  }
  
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

  targetSection.style.display = "flex";
  let oldSection = currentSection ? document.getElementById(currentSection) : null;

  Promise.resolve()
    .then(() => {
      if (oldSection) {
        return fadeElement(oldSection, 0, 500);
      }
    })
    .then(() => {
      if (oldSection) {
        oldSection.style.display = "none";
      }
      return fadeElement(targetSection, 1, 500);
    })
    .then(() => {
      currentSection = sectionId;
    });
}

document.addEventListener("DOMContentLoaded", function() {
  showSection("education");
  const educationLi = document.querySelector('.about-navbar ul li:nth-child(1)');
  const experienceLi = document.querySelector('.about-navbar ul li:nth-child(2)');

  educationLi.classList.add('active'); 

  educationLi.addEventListener('click', function() {
    showSection('education');
  });

  experienceLi.addEventListener('click', function() {
    showSection('experience');
  });
});
