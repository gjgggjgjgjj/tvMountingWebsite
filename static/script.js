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
    const carousel = document.getElementById('hero-slides');
    if (carousel) {
      const slides = Array.from(carousel.querySelectorAll('.hero-slide'));
      const indicators = Array.from(document.querySelectorAll('[data-hero-slide]'));
      const previousButton = document.querySelector('[data-hero-previous]');
      const nextButton = document.querySelector('[data-hero-next]');
      const controls = document.querySelector('.hero-controls');
      const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      let activeIndex = 0;
      let timer;

      const showSlide = (index) => {
        activeIndex = (index + slides.length) % slides.length;
        slides.forEach((slide, slideIndex) => {
          const isActive = slideIndex === activeIndex;
          slide.classList.toggle('is-active', isActive);
          slide.setAttribute('aria-hidden', String(!isActive));
          indicators[slideIndex].classList.toggle('is-active', isActive);
          indicators[slideIndex].setAttribute('aria-pressed', String(isActive));
        });
      };

      const stopAutoplay = () => window.clearInterval(timer);
      const startAutoplay = () => {
        stopAutoplay();
        if (!reducedMotion.matches && !document.hidden) {
          timer = window.setInterval(() => showSlide(activeIndex + 1), 6000);
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
