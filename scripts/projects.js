// Scroll on project cards
const developmentContainer = document.querySelector('#development');

// Scroll Buttons for projects section [In Future]
// function getCurrentProjectContainer() {
//     return document.querySelector('.project-container');
//   }
// const cards = getCurrentProjectContainer().querySelectorAll('.project-card');
// const scrollAmount = cards[0].clientWidth;

// document.getElementById('scrollLeftBtn').addEventListener('click', function() {
//     const projectContainer = getCurrentProjectContainer();
//     projectContainer.scrollBy({
//         left: -scrollAmount,
//         behavior: 'smooth'
//       });
//   });

// document.getElementById('scrollRightBtn').addEventListener('click', function() {
//     const projectContainer = getCurrentProjectContainer();
//     projectContainer.scrollBy({
//         left: scrollAmount,
//         behavior: 'smooth'
//       });
//   });

// --------------------------------------
// Fade effect on cards

function checkScroll() {
  const maxScrollLeft = developmentContainer.scrollWidth - developmentContainer.clientWidth;

  if (developmentContainer.scrollLeft > 30) {
    developmentContainer.classList.add('fade-left');
  } else {
    developmentContainer.classList.remove('fade-left');
  }
  
  if (developmentContainer.scrollLeft < maxScrollLeft - 30) {
    developmentContainer.classList.add('fade-right');
  } else {
    developmentContainer.classList.remove('fade-right');
  }
}

// Swtich sections logic

const researchLi = document.querySelector('.project-navbar ul li:nth-child(1)');
const developmentLi = document.querySelector('.project-navbar ul li:nth-child(2)');

let currentProjectSection = null;

function fadeElementProject(element, opacity, duration) {
    return new Promise(resolve => {
      element.style.transition = `opacity ${duration}ms ease`;
      element.style.opacity = opacity;
      element.style.pointerEvents = opacity === 0 ? 'none' : 'all'; 
      setTimeout(() => {
        resolve();
      }, duration);
    });
  }
  

function showProjectSection(sectionId) {
    if (currentProjectSection === sectionId) {
      return;
    }
  
    const targetSection = document.getElementById(sectionId);
    let oldSection = currentProjectSection ? document.getElementById(currentProjectSection) : null;
  
    researchLi.classList.remove('active');
    developmentLi.classList.remove('active');
    if (sectionId === 'research') {
      researchLi.classList.add('active');
    } else if (sectionId === 'development') {
      developmentLi.classList.add('active');
    }

    Promise.resolve()
      .then(() => {
        if (oldSection) {
          return fadeElementProject(oldSection, 0, 500);
        }
      })
      .then(() => {
        if (oldSection) {
          oldSection.style.display = "none";
        }
        targetSection.style.display = "flex";
        targetSection.style.opacity = "0"; 
        checkScroll();
        return Promise.resolve();
      })
      .then(() => {
        return fadeElementProject(targetSection, 1, 500); // Fade in
      })
      .then(() => {
        currentProjectSection = sectionId;
      });
  }
  

document.addEventListener("DOMContentLoaded", function() {
    showProjectSection("research");
    researchLi.classList.add('active'); 
  
    researchLi.addEventListener('click', function() {
      showProjectSection('research');
    });
  
    developmentLi.addEventListener('click', function() {
      showProjectSection('development');
    });
  
    developmentContainer.addEventListener('scroll', function() {
developmentContainer.scrollTimeout = setTimeout(checkScroll, 0);
  });

  checkScroll();
});

