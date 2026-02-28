const btn = document.querySelector('.explore-btn');
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');

const cx = 189, cy = 189, r = 155;
const DOT_R = 7;
const TRAIL_LENGTH = Math.PI * 0.7; // radians of trail behind dot
const DURATION = 950; // ms for full orbit
const FADE_START = 700; // ms when fade begins

let animId = null;
let startTime = null;
let running = false;

function draw(now) {
  const elapsed = now - startTime;
  const progress = Math.min(elapsed / DURATION, 1);
  
  // Current angle: start at top (-PI/2), go clockwise
  const dotAngle = -Math.PI / 2 + progress * Math.PI * 2;

  // Fade out in last 300ms
  const fadeProgress = elapsed > FADE_START ? (elapsed - FADE_START) / (DURATION - FADE_START) : 0;
  const alpha = 1 - fadeProgress;

  ctx.clearRect(0, 0, 378, 378);

  if (alpha > 0) {
    const trailStart = dotAngle - TRAIL_LENGTH;

    // Gradient along the trail: transparent at tail, solid at dot
    const tailX = cx + r * Math.cos(trailStart);
    const tailY = cy + r * Math.sin(trailStart);
    const headX = cx + r * Math.cos(dotAngle);
    const headY = cy + r * Math.sin(dotAngle);

    const grad = ctx.createLinearGradient(tailX, tailY, headX, headY);
    grad.addColorStop(0, `rgba(255,255,255,0)`);
    grad.addColorStop(1, `rgba(255,255,255,${alpha})`);

    ctx.beginPath();
    ctx.arc(cx, cy, r, trailStart, dotAngle);
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(255,255,255,0.8)';
    ctx.shadowBlur = 8;
    ctx.stroke();

    // --- Dot ---
    ctx.beginPath();
    ctx.arc(headX, headY, DOT_R, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.shadowColor = 'white';
    ctx.shadowBlur = 12;
    ctx.fill();
  }

  if (progress < 1) {
    animId = requestAnimationFrame(draw);
  } else {
    ctx.clearRect(0, 0, 378, 378);
    running = false;
  }
}

btn.addEventListener('mouseenter', () => {
  if (running) {
    cancelAnimationFrame(animId);
    ctx.clearRect(0, 0, 326, 326);
  }
  running = true;
  startTime = performance.now();
  animId = requestAnimationFrame(draw);
});

btn.addEventListener('mouseleave', () => {
    // do nothing
});