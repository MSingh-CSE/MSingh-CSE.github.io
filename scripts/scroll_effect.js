const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const sectionId = entry.target.id;
      updateNavLinks(sectionId);
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  root: null,
  rootMargin: '0px',
  threshold: 0.4  
});

document.querySelectorAll('.content-section').forEach(section => {
  observer.observe(section);
});


const updateNavLinks = (sectionId) => {
  document.querySelectorAll('#navbar ul li a').forEach(navLink => {
    navLink.classList.remove('active');
  });

  const activeNavLink = document.querySelector(`#navbar ul li a[href="#${sectionId}"]`);
  if (activeNavLink) {
    activeNavLink.classList.add('active');
  }
};

// Add hover only for pointer devices
function watchForHover() {
  let lastTouchTime = 0

  function enableHover() {
    if (new Date() - lastTouchTime < 500) return
    document.body.classList.add('hasHover')
  }

  function disableHover() {
    document.body.classList.remove('hasHover')
  }

  function updateLastTouchTime() {
    lastTouchTime = new Date()
  }

  document.addEventListener('touchstart', updateLastTouchTime, true)
  document.addEventListener('touchstart', disableHover, true)
  document.addEventListener('mousemove', enableHover, true)

  enableHover()
}

watchForHover()