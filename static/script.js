$(document).ready(function(){
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;
      $('body,html').animate({
      scrollTop: $(hash).offset().top
      }, 1200, function(){
      window.location.hash = hash;
     });
     } 
    });
});

setTimeout(function(){
    $("#loading").addClass("animated fadeOut");
    setTimeout(function(){
      $("#loading").removeClass("animated fadeOut");
      $("#loading").css("display","none");
    },800);
},1450);

// help services button work
window.addEventListener('DOMContentLoaded', () => {
    const servicesDialog = document.getElementById('services-overlay');
    const servicesButtons = Array.from(document.querySelectorAll('[data-services-open]'));
    const servicesCloseButton = document.querySelector('[data-services-close]');

    if (servicesDialog && servicesButtons.length && servicesCloseButton) {
      let activeServicesButton;

      servicesButtons.forEach((button) => {
        button.addEventListener('click', () => {
          activeServicesButton = button;
          button.setAttribute('aria-expanded', 'true');
          servicesDialog.showModal();
          servicesCloseButton.focus();
        });
      });

      const closeServicesDialog = () => {
        if (servicesDialog.open) servicesDialog.close();
      };

      servicesCloseButton.addEventListener('click', closeServicesDialog);
      servicesDialog.addEventListener('click', (event) => {
        if (event.target === servicesDialog) closeServicesDialog();
      });
      servicesDialog.addEventListener('close', () => {
        servicesButtons.forEach((button) => button.setAttribute('aria-expanded', 'false'));
        if (activeServicesButton) activeServicesButton.focus();
      });
    }

    const carousel = document.getElementById('hero-slides');
    if (carousel) {
      const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
      const indicators = Array.from(document.querySelectorAll('[data-hero-slide]'));
      const previousButton = document.querySelector('[data-hero-previous]');
      const nextButton = document.querySelector('[data-hero-next]');
      const controls = document.querySelector('.hero-controls');
      const currentLabel = document.querySelector('[data-hero-current]');
      const totalLabel = document.querySelector('[data-hero-total]');
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      const interval = 4000;
      const pad = (n) => String(n).padStart(2, '0');
      let activeIndex = 0;
      let timer;

      controls.style.setProperty('--hero-interval', interval + 'ms');
      if (totalLabel) totalLabel.textContent = pad(slides.length);

      const showSlide = (index) => {
        activeIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
          const isActive = slideIndex === activeIndex;
          slide.classList.toggle('is-active', isActive);
          slide.setAttribute('aria-hidden', String(!isActive));
          const indicator = indicators[slideIndex];
          if (indicator) {
            indicator.classList.toggle('is-active', isActive);
            indicator.setAttribute('aria-pressed', String(isActive));
          }
        });
        if (currentLabel) currentLabel.textContent = pad(activeIndex + 1);
      };

      // restart the progress-bar fill on the active indicator
      const restartProgress = () => {
        controls.classList.remove('is-playing');
        void controls.offsetWidth;
        controls.classList.add('is-playing');
      };

      const stopAutoplay = () => {
        window.clearInterval(timer);
        controls.classList.remove('is-playing');
      };
      const startAutoplay = () => {
        stopAutoplay();
        if (!reducedMotion.matches && !document.hidden) {
          restartProgress();
          timer = window.setInterval(() => {
            showSlide(activeIndex + 1);
            restartProgress();
          }, interval);
        }
      };

      previousButton.addEventListener('click', () => {
        showSlide(activeIndex - 1);
        startAutoplay();
      });
      nextButton.addEventListener('click', () => {
        showSlide(activeIndex + 1);
        startAutoplay();
      });
      indicators.forEach((indicator) => {
        indicator.addEventListener('click', () => {
          showSlide(Number(indicator.dataset.heroSlide));
          startAutoplay();
        });
      });

      controls.addEventListener('mouseenter', stopAutoplay);
      controls.addEventListener('mouseleave', startAutoplay);
      controls.addEventListener('focusin', stopAutoplay);
      controls.addEventListener('focusout', (event) => {
        if (!controls.contains(event.relatedTarget)) startAutoplay();
      });
      document.addEventListener('visibilitychange', startAutoplay);
      reducedMotion.addEventListener('change', startAutoplay);
      showSlide(activeIndex);
      startAutoplay();
    }

    if (window.location.hash === '#services') {
      const servicesSection = document.getElementById('services');
      if (servicesSection) {
        // Small delay ensures the page layout is fully rendered before scrolling
        setTimeout(() => {
          servicesSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  });
