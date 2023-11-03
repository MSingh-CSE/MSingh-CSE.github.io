
const updateScrollButtonVisibility = () => {
  // Hide the scroll up button at the begin
  if (currentSectionIndex === 0) {
    scrollUpButton.style.display = 'none';
  } else {
    scrollUpButton.style.display = 'block';
  }

  // Hide the scroll down button at the end
  if (currentSectionIndex === sections.length - 1) {
    scrollDownButton.style.display = 'none';
  } else {
    scrollDownButton.style.display = 'block';
  }
};

// Mac Users
const isMac = window.navigator.userAgent.includes('Mac');

// Event Listeners for scroll buttons
const scrollUpButton = document.getElementById("scrollUp");
const scrollDownButton = document.getElementById("scrollDown");

// Initialize the current section index and grab all sections
let currentSectionIndex = 0;
const sections = Array.from(document.querySelectorAll("section"));

const nav_links = Array.from(document.querySelectorAll("#navbar ul li a"));

// Initialize the first section as visible
sections[0].classList.add("visible");
nav_links[0].classList.add("active");

updateScrollButtonVisibility();

// Function to smoothly scroll to a given section by its index
const scrollToSection = (index) => {

  if (index >= 0 && index < sections.length) {
    const offsetTop = sections[index].offsetTop;

    window.scrollTo({
      top: offsetTop,
      behavior: "smooth",
    });

    currentSectionIndex = index;

    updateScrollButtonVisibility();

    sections.forEach((section) => section.classList.remove("visible"));
    sections[currentSectionIndex].classList.add("visible");

    nav_links.forEach((nav_link) => nav_link.classList.remove("active"));
    nav_links[currentSectionIndex].classList.add("active");
  }
};

// Functions for scrolling up and down by one section
const scrollUp = () => scrollToSection(currentSectionIndex - 1);
const scrollDown = () => scrollToSection(currentSectionIndex + 1);

scrollUpButton.addEventListener("click", scrollUp);
scrollDownButton.addEventListener("click", scrollDown);

let lastScrollTime = 0;
const throttleDuration = isMac ? 1300 : 300;

let isTouching = false;

let touchStartX = 0;
let touchStartY = 0;
let touchEndY = 0;
let lastTouchTime = 0;

const touchThreshold = 100;
const touchThrottleDuration = isMac ? 1300 : 300;  

let shouldPreventScroll = false;
let didUserMove = false;  

const isHorizontalMove = (event) => {
  const dx = touchEndX - touchStartX; 
  const dy = touchEndY - touchStartY; 
  const isHorizontal = Math.abs(dx) > Math.abs(dy); 
  
  return isHorizontal;
};

const researchSection = document.getElementById('research');
const developmentSection = document.getElementById('development');

window.addEventListener("touchmove", function(event) {
  touchEndX = event.touches[0].clientX;
  touchEndY = event.touches[0].clientY;
  didUserMove = true;

  if (isHorizontalMove(event) && (researchSection.contains(event.target) || developmentSection.contains(event.target))) {
    shouldPreventScroll = false;
  } else {
    event.preventDefault();
  }
}, { passive: false });

window.addEventListener("touchstart", function(event) {
shouldPreventScroll = true;
isTouching = true;
touchStartX = event.touches[0].clientX;
touchStartY = event.touches[0].clientY;
didUserMove = false;
}, { passive: true });

window.addEventListener("touchend", function(event) {
  const currentTime = new Date().getTime();
  if (didUserMove) {
    if (isHorizontalMove(event) && (researchSection.contains(event.target) || developmentSection.contains(event.target))) {
      shouldPreventScroll = false;
    } else {
      if (Math.abs(touchEndY - touchStartY) > touchThreshold && currentTime - lastTouchTime > touchThrottleDuration) {
        scrollToSection(currentSectionIndex - Math.sign(touchEndY - touchStartY));
        lastTouchTime = currentTime;
      }
    }
  }
  
  isTouching = false;
  didUserMove = false;
}, { passive: true });



window.addEventListener('wheel', function(event) {
  if(event.deltaY !== 0){
    if (!isTouching) {
      event.preventDefault();
      const currentTime = new Date().getTime();
  
      if (currentTime - lastScrollTime > throttleDuration) {
          const direction = Math.sign(event.deltaY);
          scrollToSection(currentSectionIndex + direction);
          lastScrollTime = currentTime;
      }
    }
  }
  
}, { passive: false });


// Event Listener for keyboard arrow keys
window.addEventListener("keydown", function (event) {
  if (event.key === "ArrowUp" || event.key === "ArrowDown") {
    event.preventDefault(); 
  }

  if (event.key === "ArrowUp") {
    scrollUp();
  } else if (event.key === "ArrowDown") {
    scrollDown();
  }
});

// Event handling for navbar links
const navLinks = document.querySelectorAll("#navbar a");
navLinks.forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href").slice(1);
    const targetIndex = sections.findIndex(
      (section) => section.id === targetId
    );
    scrollToSection(targetIndex);
  });
});

  
