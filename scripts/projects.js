// Scroll on project cards
const developmentContainer = document.querySelector('#development');
const scrollArrowLeft = document.querySelector('#development .scroll-arrow-left');
const scrollArrowRight = document.querySelector('#development .scroll-arrow-right');

function checkScroll() {
  const maxScrollLeft = developmentContainer.scrollWidth - developmentContainer.clientWidth;

  if (developmentContainer.scrollLeft > 30) {
    scrollArrowLeft.classList.remove('hidden');
    developmentContainer.classList.add('fade-left');
  } else {
    scrollArrowLeft.classList.add('hidden');
    developmentContainer.classList.remove('fade-left');
  }

  if (developmentContainer.scrollLeft < maxScrollLeft - 30) {
    scrollArrowRight.classList.remove('hidden');
    developmentContainer.classList.add('fade-right');
  } else {
    scrollArrowRight.classList.add('hidden');
    developmentContainer.classList.remove('fade-right');
  }
}

scrollArrowLeft.addEventListener('click', function() {
  developmentContainer.scrollBy({
    left: -developmentContainer.offsetWidth / 2,
    behavior: 'smooth'
  });
});

scrollArrowRight.addEventListener('click', function() {
  developmentContainer.scrollBy({
    left: developmentContainer.offsetWidth / 2,
    behavior: 'smooth'
  });
});

// Switch sections logic
let currentProjectSection = null;
let projectAnimationController = null;

function fadeElementProject(element, opacity, duration, signal) {
  return new Promise((resolve, reject) => {
    if (signal.aborted) {
      reject(new DOMException('Aborted', 'AbortError'));
      return;
    }

    element.style.transition = `opacity ${duration}ms ease`;
    element.style.opacity = opacity;
    element.style.pointerEvents = opacity === 0 ? 'none' : 'all'; 

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
  

function showProjectSection(sectionId) {
    
    if (currentProjectSection === sectionId) {
      return;
    }

    if (projectAnimationController) {
      projectAnimationController.abort(); 
    }
    
    projectAnimationController = new AbortController();  
    const signal = projectAnimationController.signal;

    const targetSection = document.getElementById(sectionId);
    const researchLi = document.querySelector('.project-navbar ul li:nth-child(1)');
    const developmentLi = document.querySelector('.project-navbar ul li:nth-child(2)');

    researchLi.classList.remove('active');
    developmentLi.classList.remove('active');

    if (sectionId === 'research') {
      researchLi.classList.add('active');
    } else if (sectionId === 'development') {
      developmentLi.classList.add('active');
    }

    let oldSection = currentProjectSection ? document.getElementById(currentProjectSection) : null;
    currentProjectSection = sectionId;

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
        window.requestAnimationFrame(() => {
          checkScroll();  
        });
        return fadeElement(targetSection, 1, 500, signal);
    })
    .then(() => {
      checkScroll();  
    })
    .catch(error => {
        if (error.name !== 'AbortError') {
            console.error('Animation failed:', error);
        }
    });
}

window.addEventListener('resize', checkScroll);
  
document.addEventListener("DOMContentLoaded", function() {
    showProjectSection("research");
    
    const researchLi = document.querySelector('.project-navbar ul li:nth-child(1)');
    const developmentLi = document.querySelector('.project-navbar ul li:nth-child(2)');
    
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
