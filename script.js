/* ══════════════════════════════════════════
   SIDEBAR MOBILE
══════════════════════════════════════════ */
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sb-overlay');
  if (sidebar) sidebar.classList.toggle('open');
  if (overlay) overlay.classList.toggle('show');
}
function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sb-overlay');
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('show');
}

/* ══════════════════════════════════════════
   TYPED TEXT ANIMATION
══════════════════════════════════════════ */
const roles = ['Full-Stack Developer', 'UI/UX Designer', 'Creative Coder', 'Open Source Contributor'];
let roleIdx = 0, charIdx = 0, isDeleting = false;

function typeRole() {
  const el = document.getElementById('typed-text');
  if (!el) return;
  const current = roles[roleIdx];
  if (isDeleting) {
    el.textContent = current.substring(0, charIdx--);
    if (charIdx < 0) { isDeleting = false; roleIdx = (roleIdx + 1) % roles.length; setTimeout(typeRole, 400); return; }
  } else {
    el.textContent = current.substring(0, charIdx++);
    if (charIdx > current.length) { isDeleting = true; setTimeout(typeRole, 1800); return; }
  }
  setTimeout(typeRole, isDeleting ? 50 : 90);
}

/* ══════════════════════════════════════════
   COUNTER ANIMATION
══════════════════════════════════════════ */
function animateCounters() {
  const stats = document.querySelectorAll('.stat-num[data-target]');
  if (stats.length === 0) return;
  stats.forEach(el => {
    const target = +el.dataset.target;
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) { el.textContent = target + '+'; clearInterval(timer); return; }
      el.textContent = Math.floor(current);
    }, 24);
  });
}

/* ══════════════════════════════════════════
   PROJECT FILTER
══════════════════════════════════════════ */
function filterProjects(btn, cat) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.project-item').forEach(item => {
    item.style.display = (cat === 'all' || item.dataset.cat === cat) ? '' : 'none';
  });
}

/* ══════════════════════════════════════════
   CONTACT FORM
══════════════════════════════════════════ */
function submitForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (form) form.style.display = 'none';
  if (success) success.style.display = 'block';
}
function resetForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (form) form.style.display = 'block';
  if (success) success.style.display = 'none';
}

/* ══════════════════════════════════════════
   INITIALIZATION
══════════════════════════════════════════ */
document.addEventListener('DOMContentLoaded', () => {
  // Particles
  if (document.getElementById('particles-js')) {
    particlesJS('particles-js', {
      particles: {
        number: { value: 55, density: { enable: true, value_area: 900 } },
        color: { value: ['#c9a84c','#c0001a','#f5f0e8'] },
        shape: { type: 'circle' },
        opacity: { value: 0.35, random: true, anim: { enable: true, speed: .5, opacity_min: 0.05 } },
        size: { value: 2.5, random: true },
        line_linked: { enable: true, distance: 130, color: '#c9a84c', opacity: 0.1, width: 1 },
        move: { enable: true, speed: 0.6, direction: 'none', random: true, out_mode: 'out' }
      },
      interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'grab' }, onclick: { enable: true, mode: 'push' } },
        modes: { grab: { distance: 160, line_linked: { opacity: 0.35 } }, push: { particles_nb: 2 } }
      },
      retina_detect: true
    });
  }

  // Typed Text
  if (document.getElementById('typed-text')) {
    setTimeout(typeRole, 1500);
  }

  // Counters
  if (document.querySelectorAll('.stat-num[data-target]').length > 0) {
    setTimeout(animateCounters, 1800);
  }

  // AOS
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 800, once: true, offset: 60 });
  }
});
