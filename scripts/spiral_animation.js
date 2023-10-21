const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let t = 0;
canvas.width = window.innerWidth * 0.95;  // 95% of the window width
canvas.height = window.innerHeight * 0.1;  // 10% of the window height

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear canvas

  ctx.beginPath();  // Start a new path for the first spiral
  ctx.moveTo(0, canvas.height / 2);  // Move to initial position
  
  for (let x = 0; x <= canvas.width; x += 5) {
    const y = canvas.height / 2 + Math.sin(t + x * 0.02) * 20;
    const cx = x + 2.5;
    const cy = canvas.height / 2 + Math.sin(t + cx * 0.02) * 20;
    ctx.bezierCurveTo(x, y, cx, cy, x + 5, y);
  }
  ctx.strokeStyle = 'black';
  ctx.stroke();  // Draw the curve

  ctx.beginPath();  // Start a new path for the second spiral
  ctx.moveTo(0, canvas.height / 2);  // Move to initial position

  for (let x = 0; x <= canvas.width; x += 5) {
    const y = canvas.height / 2 + Math.sin(t + Math.PI + x * 0.02) * 20;
    const cx = x + 2.5;
    const cy = canvas.height / 2 + Math.sin(t + Math.PI + cx * 0.02) * 20;
    ctx.bezierCurveTo(x, y, cx, cy, x + 5, y);
  }
  ctx.strokeStyle = 'black';
  ctx.stroke();  // Draw the curve

  t += 0.05;
  requestAnimationFrame(draw);
}

draw();
