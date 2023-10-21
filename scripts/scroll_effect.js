
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
  
  
  // Event Listeners for scroll buttons
  const scrollUpButton = document.getElementById("scrollUp");
  const scrollDownButton = document.getElementById("scrollDown");
  
  // Initialize the current section index and grab all sections
  let currentSectionIndex = 0;
  const sections = Array.from(document.querySelectorAll("section"));
  
  // Initialize the first section as visible
  sections[0].classList.add("visible");
  
  updateScrollButtonVisibility();
  
  // Function to smoothly scroll to a given section by its index
  const scrollToSection = (index) => {
    // Ensure the index is within bounds
    if (index >= 0 && index < sections.length) {
      // Calculate the top offset of the target section
      const offsetTop = sections[index].offsetTop;
  
      // Perform smooth scrolling to the target section
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
  
      // Update the current section index
      currentSectionIndex = index;
  
      updateScrollButtonVisibility();
  
      // Remove 'visible' class from all sections and add to the current one
      sections.forEach((section) => section.classList.remove("visible"));
      sections[currentSectionIndex].classList.add("visible");
    }
  };
  
  // Functions for scrolling up and down by one section
  const scrollUp = () => scrollToSection(currentSectionIndex - 1);
  const scrollDown = () => scrollToSection(currentSectionIndex + 1);
  
  scrollUpButton.addEventListener("click", scrollUp);
  scrollDownButton.addEventListener("click", scrollDown);
  
  // Event Listener for touchpad and mouse wheel scrolling
  let lastScrollTime = 0;
  const throttleDuration = 400;

  window.addEventListener('wheel', function(event) {
    event.preventDefault();
    const currentTime = new Date().getTime();

    if (currentTime - lastScrollTime > throttleDuration) {
        const direction = Math.sign(event.deltaY);
        scrollToSection(currentSectionIndex + direction);
        lastScrollTime = currentTime;
    }
}, { passive: false });
  
  // Event Listener for keyboard arrow keys
  window.addEventListener("keydown", function (event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      event.preventDefault(); // Prevent the default scroll behavior
    }
  
    // Scroll up or down based on the arrow key pressed
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