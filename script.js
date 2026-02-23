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

  const aboutTabButtons = Array.from(document.querySelectorAll('.about-tab-btn[data-tab-target]'));
  const aboutTabPanels = Array.from(document.querySelectorAll('.about-tab-panel[data-tab-panel]'));

  if (aboutTabButtons.length && aboutTabPanels.length) {
    const activateAboutTab = (targetPanelId) => {
      aboutTabButtons.forEach((button) => {
        const isActive = button.dataset.tabTarget === targetPanelId;
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });

      aboutTabPanels.forEach((panel) => {
        const isActive = panel.id === targetPanelId;
        panel.classList.toggle('active', isActive);
        panel.hidden = !isActive;
      });
    };

    const defaultTab = aboutTabButtons.find((button) => button.classList.contains('active')) || aboutTabButtons[0];
    if (defaultTab) {
      activateAboutTab(defaultTab.dataset.tabTarget);
    }

    aboutTabButtons.forEach((button) => {
      button.addEventListener('click', () => {
        activateAboutTab(button.dataset.tabTarget);
      });
    });
  }

  const impactNumbers = Array.from(document.querySelectorAll('.impact-number[data-target]'));
  if (impactNumbers.length) {
    const animateCounter = (node) => {
      const target = Number(node.dataset.target || 0);
      const suffix = node.dataset.suffix || '';
      const durationMs = 1300;
      const startTime = performance.now();

      const tick = (now) => {
        const progress = Math.min((now - startTime) / durationMs, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        node.textContent = `${value.toLocaleString()}${suffix}`;

        if (progress < 1) {
          window.requestAnimationFrame(tick);
        }
      };

      window.requestAnimationFrame(tick);
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.45 });

    impactNumbers.forEach((node) => counterObserver.observe(node));
  }
});
