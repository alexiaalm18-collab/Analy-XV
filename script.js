const startButton = document.getElementById("startButton");
const hero = document.getElementById("inicio");
const experience = document.getElementById("experiencia");
const backButton = document.getElementById("backButton");

const story1 = document.getElementById("story1");
const story2 = document.getElementById("story2");
const toStory2 = document.getElementById("toStory2");
const toStory3 = document.getElementById("toStory3");
const goldFlash = document.getElementById("goldFlash");

function showExperience() {
  if (!hero || !experience) return;
  hero.classList.add("leaving");

  setTimeout(() => {
    hero.style.display = "none";
    experience.classList.add("open");
    experience.setAttribute("aria-hidden", "false");

    if (story1) story1.classList.add("active");
    if (story2) story2.classList.remove("active");

    window.scrollTo({ top: 0, behavior: "auto" });
  }, 650);
}

function showHero() {
  if (!hero || !experience) return;

  experience.classList.remove("open");
  experience.setAttribute("aria-hidden", "true");

  if (story1) story1.classList.add("active");
  if (story2) story2.classList.remove("active");

  hero.style.display = "";
  requestAnimationFrame(() => hero.classList.remove("leaving"));
  window.scrollTo({ top: 0, behavior: "auto" });
}

function cinematicSwitch(from, to) {
  if (!from || !to) return;

  if (goldFlash) {
    goldFlash.classList.remove("play");
    void goldFlash.offsetWidth;
    goldFlash.classList.add("play");
  }

  setTimeout(() => {
    from.classList.remove("active");
    to.classList.add("active");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, 480);
}

if (startButton) startButton.addEventListener("click", showExperience);
if (backButton) backButton.addEventListener("click", showHero);
if (toStory2) toStory2.addEventListener("click", () => cinematicSwitch(story1, story2));

if (toStory3) {
  toStory3.addEventListener("click", () => {
    toStory3.textContent = "Próxima escena ✦";
  });
}
