document.addEventListener("DOMContentLoaded", () => {
  const startDate = new Date('2023-01-02');
  const now = new Date();
  let yearsDiff = now.getFullYear() - startDate.getFullYear();
  let monthsDiff = now.getMonth() - startDate.getMonth();

  if (monthsDiff < 0) {
    yearsDiff -= 1;
    monthsDiff += 12;
  }
  const timeWompi = document.getElementById('experience-wompi');
  timeWompi.textContent = `+${yearsDiff} años, ${monthsDiff} meses`;
});
const navLinks = document.querySelectorAll(".nav-link");
const panels = document.querySelectorAll(".tab-panel");

navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();

    navLinks.forEach(l => l.classList.remove("active"));
    panels.forEach(p => p.classList.add("hidden"));

    link.classList.add("active");
    const target = link.getAttribute("data-section");
    document.getElementById(target).classList.remove("hidden");
  });
});

const langBtn = document.querySelector(".language-btn");
const langBtnImg = langBtn.querySelector("img");
const langMenu = document.querySelector(".language-menu");
const langOptions = langMenu.querySelectorAll("a");

let translations = {};

function applyTranslations(lang) {
  const elements = document.querySelectorAll("[data-i18n]");
  elements.forEach(el => {
    const key = el.getAttribute("data-i18n");
    const translation = translations[lang]?.[key];
    if (translation) {
      el.textContent = translation;
    } else {
      console.warn(`Missing translation for "${key}" in language "${lang}"`);
    }
  });
}

function setLangPreference(lang) {
  localStorage.setItem("preferredLang", lang);
}

function getLangPreference() {
  return localStorage.getItem("preferredLang") || "en";
}

function loadTranslations(callback) {
  fetch("/assets/utils/translate-web-site.json")
    .then(response => {
      if (!response.ok) {
        throw new Error("Error loading translations");
      }
      return response.json();
    })
    .then(json => {
      translations = json;
      callback();
    })
    .catch(error => {
      console.error("Failed to load translation file:", error);
    });
}

function changeLanguage(langCode, imgSrc, imgAlt) {
  langBtnImg.src = imgSrc;
  langBtnImg.alt = imgAlt;
  langMenu.style.display = "none";
  setLangPreference(langCode);
  applyTranslations(langCode);
}

langBtn.addEventListener("click", () => {
  langMenu.style.display = langMenu.style.display === "block" ? "none" : "block";
});

window.addEventListener("click", (e) => {
  if (!langBtn.contains(e.target) && !langMenu.contains(e.target)) {
    langMenu.style.display = "none";
  }
});

langOptions.forEach(option => {
  option.addEventListener("click", (e) => {
    e.preventDefault();
    const langCode = option.getAttribute("data-lang");
    const selectedImg = option.querySelector("img");
    if (selectedImg) {
      changeLanguage(langCode, selectedImg.src, selectedImg.alt);
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  loadTranslations(() => {
    const preferredLang = getLangPreference();
    const selectedOption = [...langOptions].find(opt => opt.getAttribute("data-lang") === preferredLang);
    if (selectedOption) {
      const img = selectedOption.querySelector("img");
      if (img) {
        changeLanguage(preferredLang, img.src, img.alt);
      }
    } else {
      applyTranslations("en");
    }
  });
});

function toggleDropdown() {
  document.getElementById("cvDropdown").classList.toggle("show");
}

window.onclick = function (event) {
  if (!event.target.matches('.dropbtn')) {
    let dropdowns = document.getElementsByClassName("dropdown-content");
    for (let i = 0; i < dropdowns.length; i++) {
      let openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}