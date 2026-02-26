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

  const logoMarquee = document.querySelector('.logo-marquee');
  if (logoMarquee) {
    let scrollEndTimerId;

    const setUserScrollingState = () => {
      logoMarquee.classList.add('is-user-scrolling');
      window.clearTimeout(scrollEndTimerId);
      scrollEndTimerId = window.setTimeout(() => {
        logoMarquee.classList.remove('is-user-scrolling');
      }, 260);
    };

    const getLoopWidth = () => logoMarquee.scrollWidth / 2;

    const normalizeLoopScroll = () => {
      const loopWidth = getLoopWidth();
      if (!loopWidth) {
        return;
      }

      if (logoMarquee.scrollLeft >= loopWidth) {
        logoMarquee.scrollLeft -= loopWidth;
      }
    };

    logoMarquee.addEventListener('wheel', (event) => {
      const hasScrollIntent = Math.abs(event.deltaX) > 0 || Math.abs(event.deltaY) > 0;
      if (!hasScrollIntent) {
        return;
      }

      const dominantDelta = Math.abs(event.deltaX) > Math.abs(event.deltaY)
        ? event.deltaX
        : event.deltaY;

      const loopWidth = getLoopWidth();
      if (dominantDelta < 0 && logoMarquee.scrollLeft <= 1 && loopWidth) {
        logoMarquee.scrollLeft = loopWidth;
      }

      logoMarquee.scrollLeft += dominantDelta;
      normalizeLoopScroll();
      setUserScrollingState();

      event.preventDefault();
    }, { passive: false });
  }

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

  const testimonialSlides = Array.from(document.querySelectorAll('.testimonial-slide'));
  const testimonialPrevBtn = document.querySelector('.testimonial-carousel-btn.prev');
  const testimonialNextBtn = document.querySelector('.testimonial-carousel-btn.next');

  if (testimonialSlides.length && testimonialPrevBtn && testimonialNextBtn) {
    let testimonialIndex = 0;
    let testimonialTimerId;

    const showTestimonialSlide = (nextIndex) => {
      testimonialSlides[testimonialIndex].classList.remove('active');
      testimonialIndex = (nextIndex + testimonialSlides.length) % testimonialSlides.length;
      testimonialSlides[testimonialIndex].classList.add('active');
    };

    const nextTestimonialSlide = () => showTestimonialSlide(testimonialIndex + 1);
    const prevTestimonialSlide = () => showTestimonialSlide(testimonialIndex - 1);

    const startTestimonialAuto = () => {
      testimonialTimerId = window.setInterval(nextTestimonialSlide, 5200);
    };

    const restartTestimonialAuto = () => {
      window.clearInterval(testimonialTimerId);
      startTestimonialAuto();
    };

    testimonialNextBtn.addEventListener('click', () => {
      nextTestimonialSlide();
      restartTestimonialAuto();
    });

    testimonialPrevBtn.addEventListener('click', () => {
      prevTestimonialSlide();
      restartTestimonialAuto();
    });

    startTestimonialAuto();
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

  const concentrationFilter = document.querySelector('[data-brother-filter="concentration"]');
  const classFilter = document.querySelector('[data-brother-filter="year"]');
  const brotherCards = Array.from(document.querySelectorAll('.filterable-brothers-grid .member-card'));

  if (concentrationFilter && classFilter && brotherCards.length) {
    const normalizeText = (value) => value.replace(/\s+/g, ' ').trim();

    const extractCardField = (card, fieldLabel) => {
      const infoRows = Array.from(card.querySelectorAll('p'));
      const row = infoRows.find((item) => item.textContent.toLowerCase().includes(`${fieldLabel.toLowerCase()}:`));
      if (!row) {
        return '';
      }

      const parts = row.textContent.split(':');
      return normalizeText(parts.slice(1).join(':'));
    };

    const cardsWithMeta = brotherCards.map((card) => ({
      card,
      concentration: extractCardField(card, 'Concentration'),
      year: extractCardField(card, 'Year')
    }));

    const uniqueConcentrations = Array.from(
      new Set(cardsWithMeta.map((item) => item.concentration).filter(Boolean))
    ).sort((a, b) => a.localeCompare(b));

    const uniqueYears = Array.from(
      new Set(cardsWithMeta.map((item) => item.year).filter(Boolean))
    ).sort((a, b) => {
      const yearA = Number((a.match(/\d{4}/) || [0])[0]);
      const yearB = Number((b.match(/\d{4}/) || [0])[0]);
      return yearA - yearB;
    });

    const appendOptions = (selectNode, values) => {
      values.forEach((value) => {
        const option = document.createElement('option');
        option.value = value;
        option.textContent = value;
        selectNode.appendChild(option);
      });
    };

    appendOptions(concentrationFilter, uniqueConcentrations);
    appendOptions(classFilter, uniqueYears);

    const applyBrotherFilters = () => {
      const selectedConcentration = concentrationFilter.value;
      const selectedYear = classFilter.value;

      cardsWithMeta.forEach((item) => {
        const matchesConcentration = !selectedConcentration || item.concentration === selectedConcentration;
        const matchesYear = !selectedYear || item.year === selectedYear;
        const isVisible = matchesConcentration && matchesYear;

        item.card.classList.toggle('is-hidden-by-filter', !isVisible);
      });
    };

    concentrationFilter.addEventListener('change', applyBrotherFilters);
    classFilter.addEventListener('change', applyBrotherFilters);
    applyBrotherFilters();
  }
});
