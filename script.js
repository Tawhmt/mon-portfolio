/* ============================================================
   TAOUS HAMITI — PORTFOLIO — SCRIPT
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. MENU MOBILE ---------- */
  var burger = document.getElementById('navBurger');
  var mobilePanel = document.getElementById('navMobilePanel');

  if (burger && mobilePanel) {
    burger.addEventListener('click', function () {
      var isOpen = mobilePanel.classList.toggle('open');
      burger.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Ferme le menu mobile après un clic sur un lien
    mobilePanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobilePanel.classList.remove('open');
        burger.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---------- 2. ANIMATIONS AU SCROLL (Intersection Observer) ---------- */
  var revealEls = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // Fallback : tout afficher directement
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 3. BARRES DE LANGUES (animation de largeur au scroll) ---------- */
  var bars = document.querySelectorAll('.bar-fill');

  if ('IntersectionObserver' in window && bars.length) {
    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var target = entry.target;
          target.style.width = target.getAttribute('data-width');
          barObserver.unobserve(target);
        }
      });
    }, { threshold: 0.5 });

    bars.forEach(function (bar) { barObserver.observe(bar); });
  } else {
    bars.forEach(function (bar) { bar.style.width = bar.getAttribute('data-width'); });
  }

  /* ---------- 4. NAVIGATION ACTIVE AU SCROLL ---------- */
  var sections = document.querySelectorAll('section[id], header[id]');
  var navLinks = document.querySelectorAll('.nav-links a');

  if ('IntersectionObserver' in window && sections.length && navLinks.length) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.getAttribute('id');
        var matchingLink = document.querySelector('.nav-links a[href="#' + id + '"]');
        if (!matchingLink) return;
        if (entry.isIntersecting) {
          navLinks.forEach(function (l) { l.classList.remove('active'); });
          matchingLink.classList.add('active');
        }
      });
    }, { threshold: 0.4, rootMargin: '-40% 0px -40% 0px' });

    sections.forEach(function (s) { navObserver.observe(s); });
  }

  /* ---------- 5. COPIER L'EMAIL (accès démo projet) ---------- */
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var email = btn.getAttribute('data-email');
      var original = btn.textContent;

      function showCopied() {
        btn.textContent = '✓ Email copié';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove('copied');
        }, 2000);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(showCopied, function () {
          window.prompt('Copiez mon email :', email);
        });
      } else {
        window.prompt('Copiez mon email :', email);
      }
    });
  });

  /* ---------- 6. CAROUSEL PROJETS ---------- */
  var projectTrack = document.getElementById('projectsTrack');
  var projectPrev = document.getElementById('projectsPrev');
  var projectNext = document.getElementById('projectsNext');

  function scrollProjects(direction) {
    if (!projectTrack) return;
    var activeCard = projectTrack.querySelector('.proj-card');
    var amount = activeCard ? activeCard.getBoundingClientRect().width + 18 : Math.max(320, Math.floor(projectTrack.clientWidth * 0.92));
    projectTrack.scrollBy({ left: direction * amount, behavior: 'smooth' });
  }

  if (projectTrack && projectPrev && projectNext) {
    projectPrev.addEventListener('click', function () {
      scrollProjects(-1);
    });

    projectNext.addEventListener('click', function () {
      scrollProjects(1);
    });
  }

  /* ---------- 7. OMBRE DE LA NAVBAR AU SCROLL ---------- */
  var navGlass = document.querySelector('.navbar-glass');
  if (navGlass) {
    var lastScrolled = false;
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY > 12;
      if (scrolled !== lastScrolled) {
        navGlass.style.boxShadow = scrolled
          ? '0 12px 32px rgba(34,34,34,0.10)'
          : '';
        lastScrolled = scrolled;
      }
    }, { passive: true });
  }

});