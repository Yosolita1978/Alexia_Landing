/*
  Minimal JS — progressive enhancement only
  FAQ accordion works natively via <details>
  This just adds smooth scroll polyfill for older browsers
  and closes other FAQ items when one opens (optional UX)
*/

(function() {
    'use strict';
  
    // Close other FAQ details when one opens (accordion behavior)
    const faqDetails = document.querySelectorAll('.faq details');
    
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
  
    // Hide sticky CTA when near the contact section
    const stickyCta = document.querySelector('.mobile-sticky-cta');
    const contactSection = document.getElementById('contact');
    
    if (stickyCta && contactSection) {
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
  
    // Add transition for sticky CTA fade
    if (stickyCta) {
      stickyCta.style.transition = 'opacity 0.3s ease';
    }
  })();