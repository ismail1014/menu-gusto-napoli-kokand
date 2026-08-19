// ---------- LANGUAGE TOGGLE ----------
// Content is written twice in the HTML (inside .t-uz / .t-ru spans).
// This script just shows/hides them via the data-lang attribute on <html>.
document.querySelectorAll('.lang-switch button').forEach(btn => {
  btn.addEventListener('click', () => {
    document.documentElement.setAttribute('data-lang', btn.dataset.lang);
    document.documentElement.lang = btn.dataset.lang;
    document.querySelectorAll('.lang-switch button').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});

// ---------- THEME TOGGLE (day / night) ----------
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.getElementById('themeIcon');
const moonPath = `<path d="M20 14.5C18.8 15.6 17.2 16.3 15.5 16.3C11.6 16.3 8.5 13.1 8.5 9.3C8.5 7.5 9.2 5.9 10.3 4.7C6.5 5.5 3.7 8.9 3.7 13C3.7 17.7 7.5 21.5 12.2 21.5C16.1 21.5 19.4 18.9 20 14.5Z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>`;
const sunPath = `<circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2"/><path d="M12 1V3M12 21V23M4.22 4.22L5.64 5.64M18.36 18.36L19.78 19.78M1 12H3M21 12H23M4.22 19.78L5.64 18.36M18.36 5.64L19.78 4.22" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`;

themeToggle.addEventListener('click', () => {
  const html = document.documentElement;
  const isDay = html.getAttribute('data-theme') === 'day';
  html.setAttribute('data-theme', isDay ? 'night' : 'day');
  themeIcon.innerHTML = isDay ? moonPath : sunPath;
});

// ---------- STICKY NAV: highlight active section on scroll ----------
const sections = document.querySelectorAll('section.category');
const navButtons = document.querySelectorAll('nav.tabs button');
navButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    document.getElementById(btn.dataset.target).scrollIntoView({behavior:'smooth', block:'start'});
  });
});
const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navButtons.forEach(b => b.classList.remove('active'));
      const active = document.querySelector(`nav.tabs button[data-target="${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });
sections.forEach(s => navObserver.observe(s));

// ---------- LIGHTBOX: tap a photo to enlarge it ----------
// Reads the image straight out of the card that was tapped - no data model needed.
// Works automatically for any image you swap in the HTML.
const lightbox = document.getElementById('lightbox');
const lightboxInner = document.getElementById('lightboxInner');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

document.querySelectorAll('.menu-thumb').forEach(btn => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    const card = btn.closest('.menu-card');
    const nameEl = card ? card.querySelector('.menu-name') : null;

    lightboxInner.innerHTML = `<img src="${img.src}" alt="${img.alt}">`;
    lightboxCaption.textContent = nameEl ? nameEl.innerText.trim() : img.alt;
    lightbox.classList.add('open');
  });
});

function closeLightbox(){
  lightbox.classList.remove('open');
}
lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
