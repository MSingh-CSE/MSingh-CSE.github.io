// Scroll on project cards
const developmentContainer = document.querySelector('#development');
const scrollArrowLeftDevelopment = document.querySelector('#development .scroll-arrow-left');
const scrollArrowRightDevelopment = document.querySelector('#development .scroll-arrow-right');

const researchContainer = document.querySelector('#research');
const scrollArrowLeftResearch = document.querySelector('#research .scroll-arrow-left');
const scrollArrowRightResearch = document.querySelector('#research .scroll-arrow-right');

function checkScrollDevelopment() {
  const maxScrollLeft = developmentContainer.scrollWidth - developmentContainer.clientWidth;

  if (developmentContainer.scrollLeft > 30) {
    scrollArrowLeftDevelopment.classList.remove('hidden');
    developmentContainer.classList.add('fade-left');
  } else {
    scrollArrowLeftDevelopment.classList.add('hidden');
    developmentContainer.classList.remove('fade-left');
  }

  if (developmentContainer.scrollLeft < maxScrollLeft - 30) {
    scrollArrowRightDevelopment.classList.remove('hidden');
    developmentContainer.classList.add('fade-right');
  } else {
    scrollArrowRightDevelopment.classList.add('hidden');
    developmentContainer.classList.remove('fade-right');
  }
}

function checkScrollResearch() {
  const maxScrollLeft = researchContainer.scrollWidth - researchContainer.clientWidth;

  if (researchContainer.scrollLeft > 30) {
    scrollArrowLeftResearch.classList.remove('hidden');
    researchContainer.classList.add('fade-left');
  } else {
    scrollArrowLeftResearch.classList.add('hidden');
    researchContainer.classList.remove('fade-left');
  }

  if (researchContainer.scrollLeft < maxScrollLeft - 30) {
    scrollArrowRightResearch.classList.remove('hidden');
    researchContainer.classList.add('fade-right');
  } else {
    scrollArrowRightResearch.classList.add('hidden');
    researchContainer.classList.remove('fade-right');
  }
}

scrollArrowLeftDevelopment.addEventListener('click', function() {
  developmentContainer.scrollBy({
    left: -developmentContainer.offsetWidth / 2,
    behavior: 'smooth'
  });
});

scrollArrowRightDevelopment.addEventListener('click', function() {
  developmentContainer.scrollBy({
    left: developmentContainer.offsetWidth / 2,
    behavior: 'smooth'
  });
});

scrollArrowLeftResearch.addEventListener('click', function() {
  researchContainer.scrollBy({
    left: -researchContainer.offsetWidth / 2,
    behavior: 'smooth'
  });
});

scrollArrowRightResearch.addEventListener('click', function() {
  researchContainer.scrollBy({
    left: researchContainer.offsetWidth / 2,
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
          checkScrollDevelopment();  
          checkScrollResearch();
        });
        return fadeElement(targetSection, 1, 500, signal);
    })
    .then(() => {
      checkScrollDevelopment();  
      checkScrollResearch();
    })
    .catch(error => {
        if (error.name !== 'AbortError') {
            console.error('Animation failed:', error);
        }
    });
}

window.addEventListener('resize', checkScrollDevelopment);
window.addEventListener('resize', checkScrollResearch);
  
document.addEventListener("DOMContentLoaded", function() {
    showProjectSection("research");
    
    const researchLi = document.querySelector('.project-navbar ul li:nth-child(1)');
    const developmentLi = document.querySelector('.project-navbar ul li:nth-child(2)');
    
    researchLi.addEventListener('click', function() {
      showProjectSection('research');
    });

    researchContainer.addEventListener('scroll', function() {
      researchContainer.scrollTimeout = setTimeout(checkScrollResearch, 0);
    });
    checkScrollResearch();
    
    developmentLi.addEventListener('click', function() {
      showProjectSection('development');
    });
    
    developmentContainer.addEventListener('scroll', function() {
      developmentContainer.scrollTimeout = setTimeout(checkScrollDevelopment, 0);
    });
    checkScrollDevelopment();
    
});

// No link notification
document.querySelectorAll('.project-card.no-link').forEach(card => {
  const tooltip = card.querySelector('.tooltip');

  card.addEventListener('click', (e) => {
    e.preventDefault();
    if (!tooltip) return;

    if (card._tooltipTimeout) {
      clearTimeout(card._tooltipTimeout);
    }

    card.classList.add('show-tooltip');

    card._tooltipTimeout = setTimeout(() => {
      card.classList.remove('show-tooltip');
      card._tooltipTimeout = null;
    }, 3000);
  });
});

