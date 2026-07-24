const canvas = document.getElementById("stars");
if (canvas) {
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
    }
    requestAnimationFrame(drawStars);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();
  requestAnimationFrame(drawStars);
}
