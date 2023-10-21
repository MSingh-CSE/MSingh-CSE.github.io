// Mobile Warning
window.addEventListener('beforeunload', function() {
  window.scrollTo(0, 0);
});


window.addEventListener("load", function () {
  window.scrollTo(0, 0);
  const mobileWarning = document.getElementById("mobile-warning");
  const mainContent = document.getElementById("main-content");

  if (window.innerWidth <= 800) {
    mobileWarning.style.display = "block";
    mainContent.style.display = "none";
  }
});

window.addEventListener("resize", function () {
  const mobileWarning = document.getElementById("mobile-warning");
  const mainContent = document.getElementById("main-content");

  if (window.innerWidth <= 800) {
    mobileWarning.style.display = "block";
    mainContent.style.display = "none";
  } else {
    mobileWarning.style.display = "none";
    mainContent.style.display = "block";
  }
});





