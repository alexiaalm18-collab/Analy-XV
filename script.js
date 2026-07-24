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


/* Cuenta regresiva. Hora provisional: medianoche del 12 de septiembre de 2026.
   Se puede cambiar fácilmente cuando se confirme el horario del evento. */
(function () {
  const target = new Date("2026-09-12T00:00:00-07:00").getTime();
  const d = document.getElementById("days");
  const h = document.getElementById("hours");
  const m = document.getElementById("minutes");
  const s = document.getElementById("seconds");
  if (!d || !h || !m || !s) return;

  function updateCountdown() {
    let distance = target - Date.now();
    if (distance < 0) distance = 0;
    d.textContent = Math.floor(distance / 86400000);
    h.textContent = String(Math.floor((distance % 86400000) / 3600000)).padStart(2, "0");
    m.textContent = String(Math.floor((distance % 3600000) / 60000)).padStart(2, "0");
    s.textContent = String(Math.floor((distance % 60000) / 1000)).padStart(2, "0");
  }
  updateCountdown();
  setInterval(updateCountdown, 1000);
})();


/* ===== Música continua de la experiencia ===== */
(function () {
  const music = document.getElementById("bgMusic");
  const toggle = document.getElementById("musicToggle");
  const startLink = document.querySelector('a.start-button[href="#escena1"]');
  const finalHome = document.getElementById("finalHome");
  if (!music || !toggle) return;

  const START_AT = 20;
  music.volume = 0.32;

  function setToggleState() {
    toggle.textContent = music.paused ? "♪" : "♫";
    toggle.classList.toggle("muted", music.paused);
  }

  function playFromExperienceStart() {
    try { music.currentTime = START_AT; } catch (e) {}
    music.play().then(() => {
      toggle.classList.add("visible");
      setToggleState();
    }).catch(() => {
      toggle.classList.add("visible");
      setToggleState();
    });
  }

  if (startLink) {
    startLink.addEventListener("click", playFromExperienceStart);
  }

  toggle.addEventListener("click", function () {
    if (music.paused) {
      if (music.currentTime < START_AT) {
        try { music.currentTime = START_AT; } catch (e) {}
      }
      music.play().catch(() => {});
    } else {
      music.pause();
    }
    setTimeout(setToggleState, 30);
  });

  music.addEventListener("ended", function () {
    try { music.currentTime = START_AT; } catch (e) {}
    music.play().catch(() => {});
  });

  music.addEventListener("play", setToggleState);
  music.addEventListener("pause", setToggleState);

  if (finalHome) {
    finalHome.addEventListener("click", function () {
      music.pause();
      try { music.currentTime = START_AT; } catch (e) {}
      toggle.classList.remove("visible");
      setToggleState();
    });
  }
})();
