/**
 * MAIN INTERACTION & ANIMATION SUITE — HASHIM BAJWA PORTFOLIO
 * High-End Micro-Interactions, 3D Tilt Physics, Ambient Canvas & Scroll Progression
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollProgress();
  initCursorSpotlight();
  initAmbientParticleCanvas();
  initPortraitTilt();
  initNavigation();
  initScrollSpyAndReveals();
  initMagneticButtons();
  initEnquiryForm();
  initCurrentYear();
});

/* --------------------------------------------------------------------------
   1. Scroll Progress Bar
   -------------------------------------------------------------------------- */
function initScrollProgress() {
  let progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) {
    progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress-bar';
    document.body.appendChild(progressBar);
  }

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   2. Dynamic Cursor Ambient Spotlight
   -------------------------------------------------------------------------- */
function initCursorSpotlight() {
  let spotlight = document.querySelector('.cursor-ambient-glow');
  if (!spotlight) {
    spotlight = document.createElement('div');
    spotlight.className = 'cursor-ambient-glow';
    document.body.appendChild(spotlight);
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentX = mouseX;
  let currentY = mouseY;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  }, { passive: true });

  function renderSpotlight() {
    // Smooth interpolation (lerp)
    currentX += (mouseX - currentX) * 0.1;
    currentY += (mouseY - currentY) * 0.1;

    document.documentElement.style.setProperty('--mouse-x', `${currentX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${currentY}px`);

    requestAnimationFrame(renderSpotlight);
  }

  renderSpotlight();
}

/* --------------------------------------------------------------------------
   3. Ambient Floating Particles / Golden Stardust Canvas
   -------------------------------------------------------------------------- */
function initAmbientParticleCanvas() {
  // Check if reduced motion is requested
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.createElement('canvas');
  canvas.id = 'ambient-particle-canvas';
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext('2d');
  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particleCount = Math.min(Math.floor(width / 35), 45);
  const particles = [];

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      radius: Math.random() * 1.5 + 0.5,
      alpha: Math.random() * 0.4 + 0.1,
      targetAlpha: Math.random() * 0.5 + 0.1
    });
  }

  function renderParticles() {
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;

      // Draw Particle
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(229, 195, 126, ${p.alpha})`;
      ctx.fill();

      // Connect near particles with delicate gold filament lines
      for (let j = i + 1; j < particles.length; j++) {
        const p2 = particles[j];
        const dx = p.x - p2.x;
        const dy = p.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(229, 195, 126, ${(1 - dist / 110) * 0.08})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(renderParticles);
  }

  renderParticles();
}

/* --------------------------------------------------------------------------
   4. 3D Perspective Tilt on Portrait & Hero Card
   -------------------------------------------------------------------------- */
function initPortraitTilt() {
  const card = document.querySelector('.portrait-card');
  const wrapper = document.querySelector('.hero-portrait-wrapper');
  if (!card || !wrapper) return;

  let bounds;

  function onMouseEnter() {
    bounds = wrapper.getBoundingClientRect();
  }

  function onMouseMove(e) {
    if (!bounds) bounds = wrapper.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const leftX = mouseX - bounds.x;
    const topY = mouseY - bounds.y;
    const center = {
      x: leftX - bounds.width / 2,
      y: topY - bounds.height / 2
    };

    const distance = Math.sqrt(center.x ** 2 + center.y ** 2);

    card.style.transform = `
      perspective(1000px)
      rotate3d(
        ${-center.y / 100},
        ${center.x / 100},
        0,
        ${Math.log(distance) * 2.2}deg
      )
      translateY(-4px)
    `;
  }

  function onMouseLeave() {
    card.style.transform = 'perspective(1000px) rotate3d(0, 0, 0, 0deg) translateY(0)';
  }

  wrapper.addEventListener('mouseenter', onMouseEnter);
  wrapper.addEventListener('mousemove', onMouseMove);
  wrapper.addEventListener('mouseleave', onMouseLeave);
}

/* --------------------------------------------------------------------------
   5. Magnetic Physics on Action Buttons
   -------------------------------------------------------------------------- */
function initMagneticButtons() {
  const buttons = document.querySelectorAll('.btn-primary');
  buttons.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px) translateY(-2px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0px, 0px) translateY(0)';
    });
  });
}

/* --------------------------------------------------------------------------
   6. Navigation & Mobile Drawer
   -------------------------------------------------------------------------- */
function initNavigation() {
  const header = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }, { passive: true });

  function closeDrawer() {
    if (!mobileDrawer || !mobileToggle) return;
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileDrawer.classList.remove('open');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function openDrawer() {
    if (!mobileDrawer || !mobileToggle) return;
    mobileToggle.setAttribute('aria-expanded', 'true');
    mobileDrawer.classList.add('open');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', (e) => {
      e.stopPropagation();
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      if (isExpanded) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        closeDrawer();
      });
    });

    // Close on Escape Key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    });

    // Close on Outside Click
    document.addEventListener('click', (e) => {
      if (
        mobileDrawer.classList.contains('open') &&
        !mobileDrawer.contains(e.target) &&
        !mobileToggle.contains(e.target)
      ) {
        closeDrawer();
      }
    });

    // Reset when resizing to desktop
    window.addEventListener('resize', () => {
      if (window.innerWidth >= 1024 && mobileDrawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }
}

/* --------------------------------------------------------------------------
   7. Scroll-Spy & Reveal Animations
   -------------------------------------------------------------------------- */
function initScrollSpyAndReveals() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.1
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    revealElements.forEach(el => el.classList.add('is-revealed'));
  }

  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link[href^="#"]');

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}

/* --------------------------------------------------------------------------
   8. Structured Enquiry Form Handler
   -------------------------------------------------------------------------- */
function initEnquiryForm() {
  const form = document.getElementById('consultation-enquiry-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = form.querySelector('#form-name')?.value.trim();
    const email = form.querySelector('#form-email')?.value.trim();
    const selectedEnquiry = form.querySelector('input[name="enquiry-type"]:checked')?.value || 'General Consultation';

    if (!name || !email) {
      showToast('Please complete all required fields (Name & Email).', 'warning');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Transmitting Enquiry...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
      form.reset();
      showToast(`Thank you, ${name}. Your enquiry regarding "${selectedEnquiry}" has been received. I will respond to ${email} promptly.`, 'success');
    }, 850);
  });
}

/* --------------------------------------------------------------------------
   9. Toast Notification System
   -------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
  let toast = document.querySelector('.toast-notice');
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notice';
    toast.setAttribute('role', 'alert');
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <span style="color: var(--color-gold); font-size: 1.1rem;">◆</span>
    <span>${message}</span>
  `;

  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
}

/* --------------------------------------------------------------------------
   10. Current Year in Footer
   -------------------------------------------------------------------------- */
function initCurrentYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
