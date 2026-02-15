// Delta Sigma Pi Gamma Upsilon Chapter - Landing Page Interactivity

document.addEventListener('DOMContentLoaded', function () {
  // Example: Smooth scroll for CTA button
  const ctaBtn = document.querySelector('.cta-btn');
  if (ctaBtn) {
    ctaBtn.addEventListener('click', function (e) {
      const joinSection = document.getElementById('join');
      if (joinSection) {
        e.preventDefault();
        joinSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
    // Animate CTA button on load
    ctaBtn.style.transform = 'scale(0.95)';
    setTimeout(() => {
      ctaBtn.style.transition = 'transform 0.5s cubic-bezier(.68,-0.55,.27,1.55)';
      ctaBtn.style.transform = 'scale(1.08)';
      setTimeout(() => {
        ctaBtn.style.transform = 'scale(1)';
      }, 400);
    }, 300);
  }

  // Scroll reveal for features
  const features = document.querySelectorAll('.feature');
  const revealOptions = {
    threshold: 0.15
  };
  const revealOnScroll = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = 1;
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, revealOptions);
  features.forEach(feature => {
    feature.style.opacity = 0;
    feature.style.transform = 'translateY(40px)';
    revealOnScroll.observe(feature);
  });
  // Accessibility: focus style for CTA
  if (ctaBtn) {
    ctaBtn.addEventListener('focus', function () {
      ctaBtn.style.boxShadow = '0 0 0 3px #FFD70055';
    });
    ctaBtn.addEventListener('blur', function () {
      ctaBtn.style.boxShadow = '';
    });
  }
});
