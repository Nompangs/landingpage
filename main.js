
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1);
      const target = document.getElementById(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Section highlight in navbar
  const navLinks = document.querySelectorAll('.nav-menu a');
  const sectionIds = Array.from(navLinks)
    .map(link => link.getAttribute('href'))
    .filter(href => href.startsWith('#'))
    .map(href => href.slice(1));
  const sections = sectionIds
    .map(id => document.getElementById(id))
    .filter(Boolean);

  function removeActive() {
    navLinks.forEach(link => link.classList.remove('active'));
  }

  // IntersectionObserver for section highlighting
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          removeActive();
          const activeLink = document.querySelector('.nav-menu a[href="#' + id + '"]');
          if (activeLink) activeLink.classList.add('active');
        }
      });
    },
    {
      root: null,
      rootMargin: '-50% 0px -49% 0px', // triggers when section is in the middle of the viewport
      threshold: 0
    }
  );
  sections.forEach(section => {
    observer.observe(section);
  });
});

// Enable smooth scroll for the whole document (fallback)
document.documentElement.style.scrollBehavior = 'smooth';

console.log('Landing page script loaded.'); 