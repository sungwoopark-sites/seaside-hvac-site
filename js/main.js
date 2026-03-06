/* Seaside Air Conditioning and Heating - main.js */

// Mobile nav toggle
(function () {
  var hamburger = document.querySelector('.hamburger');
  var mobileNav = document.getElementById('mobile-nav');
  if (!hamburger || !mobileNav) return;

  hamburger.addEventListener('click', function () {
    var expanded = hamburger.getAttribute('aria-expanded') === 'true';
    hamburger.setAttribute('aria-expanded', String(!expanded));
    mobileNav.classList.toggle('open', !expanded);
    mobileNav.setAttribute('aria-hidden', String(expanded));

    // Toggle tabindex on all nav links
    var links = mobileNav.querySelectorAll('a');
    links.forEach(function (link) {
      link.setAttribute('tabindex', expanded ? '-1' : '0');
    });
  });

  // Close on nav link click
  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', 'true');
      mobileNav.querySelectorAll('a').forEach(function (l) {
        l.setAttribute('tabindex', '-1');
      });
    });
  });

  // Close on outside click
  document.addEventListener('click', function (e) {
    if (!mobileNav.contains(e.target) && !hamburger.contains(e.target)) {
      hamburger.setAttribute('aria-expanded', 'false');
      mobileNav.classList.remove('open');
      mobileNav.setAttribute('aria-hidden', 'true');
      mobileNav.querySelectorAll('a').forEach(function (l) {
        l.setAttribute('tabindex', '-1');
      });
    }
  });
})();

// Scroll reveal
(function () {
  var els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  // Skip hero - show immediately
  var heroContent = document.querySelector('.hero-content.reveal');
  if (heroContent) heroContent.classList.add('visible');

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(function (el) {
    if (!el.classList.contains('visible')) observer.observe(el);
  });
})();

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener('click', function (e) {
    var target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// Active nav link on scroll
(function () {
  var sections = document.querySelectorAll('main section[id]');
  var navLinks = document.querySelectorAll('.desktop-nav a[href^="#"]');
  if (!sections.length || !navLinks.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var id = entry.target.id;
        navLinks.forEach(function (link) {
          link.style.color = link.getAttribute('href') === '#' + id
            ? 'rgba(255,255,255,1)'
            : '';
        });
      }
    });
  }, { rootMargin: '-50% 0px -50% 0px' });

  sections.forEach(function (s) { observer.observe(s); });
})();
