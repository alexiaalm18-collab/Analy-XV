const canvas = document.getElementById("stars");
const context = canvas.getContext("2d");

let stars = [];
let width = window.innerWidth;
let height = window.innerHeight;
let pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

function resizeCanvas() {
  width = window.innerWidth;
  height = window.innerHeight;
  pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

  canvas.width = Math.floor(width * pixelRatio);
  canvas.height = Math.floor(height * pixelRatio);
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;

  context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
  createStars();
}

function createStars() {
  const amount = Math.min(220, Math.floor((width * height) / 4500));

  stars = Array.from({ length: amount }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() * 1.5 + 0.25,
    alpha: Math.random() * 0.75 + 0.18,
    speed: Math.random() * 0.012 + 0.004,
    phase: Math.random() * Math.PI * 2,
    warm: Math.random() > 0.76
  }));
}

function drawStars(time = 0) {
  context.clearRect(0, 0, width, height);

  for (const star of stars) {
    const shimmer = Math.sin(time * star.speed + star.phase) * 0.28;
    const alpha = Math.max(0.08, Math.min(1, star.alpha + shimmer));

    context.beginPath();
    context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    context.fillStyle = star.warm
      ? `rgba(255, 229, 158, ${alpha})`
      : `rgba(255, 255, 255, ${alpha})`;
    context.fill();

    if (star.radius > 1.25 && alpha > 0.7) {
      context.strokeStyle = `rgba(255, 235, 180, ${alpha * 0.38})`;
      context.lineWidth = 0.6;

      context.beginPath();
      context.moveTo(star.x - 4, star.y);
      context.lineTo(star.x + 4, star.y);
      context.moveTo(star.x, star.y - 4);
      context.lineTo(star.x, star.y + 4);
      context.stroke();
    }
  }

  requestAnimationFrame(drawStars);
}

const startButton = document.getElementById("startButton");
const backButton = document.getElementById("backButton");
const experience = document.getElementById("experiencia");

startButton.addEventListener("click", () => {
  experience.classList.add("open");
  experience.setAttribute("aria-hidden", "false");
  document.body.classList.add("experience-open");
});

backButton.addEventListener("click", () => {
  experience.classList.remove("open");
  experience.setAttribute("aria-hidden", "true");
  document.body.classList.remove("experience-open");
});

window.addEventListener("resize", resizeCanvas);

resizeCanvas();
requestAnimationFrame(drawStars);


const story1 = document.getElementById("story1");
const story2 = document.getElementById("story2");
const toStory2 = document.getElementById("toStory2");
const goldFlash = document.getElementById("goldFlash");

function cinematicSwitch(from, to) {
  if (goldFlash) {
    goldFlash.classList.remove("play");
    void goldFlash.offsetWidth;
    goldFlash.classList.add("play");
  }
  setTimeout(() => {
    from?.classList.remove("active");
    to?.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 480);
}

if (toStory2) {
  toStory2.addEventListener("click", () => cinematicSwitch(story1, story2));
}
