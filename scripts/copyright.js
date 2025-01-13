const startYear = 2023;
const currentYear = new Date().getFullYear();
const yearDisplay = startYear === currentYear 
    ? currentYear 
    : `${startYear}-${currentYear}`;
document.getElementById('copyright').innerHTML = `© ${yearDisplay} Manpreet Singh. All Rights Reserved.`;