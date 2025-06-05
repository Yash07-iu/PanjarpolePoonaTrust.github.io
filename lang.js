let currentTranslations = {};

// Load the selected language's translations from translations.json
async function loadTranslations(lang) {
  try {
    const res = await fetch('translations.json');
    const allTranslations = await res.json();
    currentTranslations = allTranslations[lang] || {};
    applyTranslations();
  } catch (error) {
    console.error("Error loading translations:", error);
  }
}

// Apply translations to all elements with the data-i18n attribute
function applyTranslations() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (currentTranslations[key]) {
      el.innerHTML = currentTranslations[key];
    }
  });
}

// Initialize language switcher on DOM load
document.addEventListener('DOMContentLoaded', () => {
  const switcher = document.getElementById('languageSwitcher');
  switcher.addEventListener('change', e => {
    const selectedLang = e.target.value;
    loadTranslations(selectedLang);
  });

  loadTranslations('en'); // Default language on load
});
