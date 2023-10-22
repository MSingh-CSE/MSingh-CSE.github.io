function setHeight() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  }
  
  // Initial set
  setHeight();
  
  // Reset on window resize
  window.addEventListener('resize', () => {
    setHeight();
  });