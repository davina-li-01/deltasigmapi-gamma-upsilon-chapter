document.addEventListener('DOMContentLoaded', () => {
  const pillarsSelect = document.querySelector('.pillars-select');
  if (pillarsSelect) {
    pillarsSelect.addEventListener('change', (event) => {
      const target = event.target.value;
      if (target) {
        window.location.href = target;
      }
    });
  }

  const revealNodes = document.querySelectorAll('.reveal');
  if (revealNodes.length) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.14 });

    revealNodes.forEach((node) => revealObserver.observe(node));
  }

  const slides = Array.from(document.querySelectorAll('.carousel-slide'));
  const prevBtn = document.querySelector('.carousel-btn.prev');
  const nextBtn = document.querySelector('.carousel-btn.next');

  if (slides.length && prevBtn && nextBtn) {
    let index = 0;
    let timerId;

    const showSlide = (nextIndex) => {
      slides[index].classList.remove('active');
      index = (nextIndex + slides.length) % slides.length;
      slides[index].classList.add('active');
    };

    const nextSlide = () => showSlide(index + 1);
    const prevSlide = () => showSlide(index - 1);

    const startAuto = () => {
      timerId = window.setInterval(nextSlide, 4500);
    };

    const restartAuto = () => {
      window.clearInterval(timerId);
      startAuto();
    };

    nextBtn.addEventListener('click', () => {
      nextSlide();
      restartAuto();
    });

    prevBtn.addEventListener('click', () => {
      prevSlide();
      restartAuto();
    });

    startAuto();
  }
});
