(function() {
  'use strict';

  // ========================================
  // 1. Reveal-on-scroll navbar
  // ========================================
  var navbar = document.getElementById('navbar');
  var hero = document.querySelector('.hero');

  if (navbar && hero) {
    var navObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          navbar.classList.remove('is-visible');
        } else {
          navbar.classList.add('is-visible');
        }
      });
    }, { threshold: 0 });

    navObserver.observe(hero);
  }

  // Active link highlighting on scroll
  var navLinks = document.querySelectorAll('.navbar-links a:not(.btn-nav)');
  var sections = document.querySelectorAll('section[id]');

  if (navLinks.length > 0 && sections.length > 0) {
    var activeLinkObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          var id = entry.target.getAttribute('id');
          navLinks.forEach(function(link) {
            if (link.getAttribute('href') === '#' + id) {
              link.style.color = 'var(--forest-dark)';
            } else {
              link.style.color = '';
            }
          });
        }
      });
    }, { threshold: 0.3 });

    sections.forEach(function(section) {
      activeLinkObserver.observe(section);
    });
  }

  // ========================================
  // 2. Scroll-triggered reveal animations
  // ========================================
  var revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    var revealObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(function(el) {
      revealObserver.observe(el);
    });
  }

  // ========================================
  // 3. FAQ accordion behavior
  // ========================================
  var faqDetails = document.querySelectorAll('.faq details');

  faqDetails.forEach(function(detail) {
    detail.addEventListener('toggle', function() {
      if (this.open) {
        faqDetails.forEach(function(otherDetail) {
          if (otherDetail !== detail && otherDetail.open) {
            otherDetail.open = false;
          }
        });
      }
    });
  });

  // ========================================
  // 4. Hide sticky CTA near contact section
  // ========================================
  var stickyCta = document.querySelector('.mobile-sticky-cta');
  var contactSection = document.getElementById('contact');

  if (stickyCta && contactSection) {
    stickyCta.style.transition = 'opacity 0.3s ease';

    var hideObserver = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          stickyCta.style.opacity = '0';
          stickyCta.style.pointerEvents = 'none';
        } else {
          stickyCta.style.opacity = '1';
          stickyCta.style.pointerEvents = 'auto';
        }
      });
    }, { threshold: 0.2 });

    hideObserver.observe(contactSection);
  }

})();
