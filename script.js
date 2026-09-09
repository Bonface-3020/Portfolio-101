/* ══════════════════════════════════════════
   SIDEBAR MOBILE
══════════════════════════════════════════ */
function toggleSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sb-overlay');
  const toggleBtn = document.getElementById('sb-toggle');
  
  if (!sidebar || !overlay) return;

  const isOpen = sidebar.classList.toggle('open');
  overlay.classList.toggle('show');
  
  // Update toggle button icon
  if (toggleBtn) {
    const icon = toggleBtn.querySelector('i');
    if (icon) {
      icon.className = isOpen ? 'bi bi-x' : 'bi bi-list';
    }
  }
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sb-overlay');
  const toggleBtn = document.getElementById('sb-toggle');
  
  if (sidebar) sidebar.classList.remove('open');
  if (overlay) overlay.classList.remove('show');
  
  // Reset toggle button icon
  if (toggleBtn) {
    const icon = toggleBtn.querySelector('i');
    if (icon) icon.className = 'bi bi-list';
  }
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
async function submitForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  
  const firstName = document.getElementById('firstName').value;
  const lastName = document.getElementById('lastName').value;
  const email = document.getElementById('emailAddr').value;
  const subject = document.getElementById('subject').value;
  const budget = document.getElementById('budgetRange').value;
  const message = document.getElementById('message').value;

  if (!firstName || !email || !message) {
    alert("Please fill in your name, email, and message.");
    return;
  }

  // Web3Forms API Call
  // REPLACE 'YOUR_ACCESS_KEY_HERE' WITH YOUR ACTUAL KEY FROM web3forms.com
  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: 'e382758d-e67c-4943-8a9b-f3f1ba6b725b', 
        name: `${firstName} ${lastName}`,
        email: email,
        subject: subject || 'New Portfolio Contact',
        message: `Budget Range: ${budget}\n\n${message}`
      })
    });
    
    if (response.status === 200) {
      if (form) form.style.display = 'none';
      if (success) success.style.display = 'block';
    } else {
      alert("Oops! Something went wrong. Please check your Access Key.");
    }
  } catch (error) {
    console.error(error);
    alert("Network error. Please try again.");
  }
}
function resetForm() {
  const form = document.getElementById('contact-form');
  const success = document.getElementById('form-success');
  if (form) form.style.display = 'block';
  if (success) success.style.display = 'none';
}

/* ══════════════════════════════════════════
   DEV.TO BLOG INTEGRATION
══════════════════════════════════════════ */
const DEVTO_USERNAME = 'alpha3020';

async function fetchDevToArticles() {
  const grid = document.getElementById('blog-grid');
  if (!grid) return;

  try {
    const res = await fetch(`https://dev.to/api/articles?username=${DEVTO_USERNAME}`);
    const articles = await res.json();
    
    if (articles.length === 0) {
      grid.innerHTML = `<div class="col-12 text-center" style="color:var(--muted)">No articles found for ${DEVTO_USERNAME}.</div>`;
      return;
    }

    grid.innerHTML = ''; 
    
    articles.forEach((article, index) => {
      const delay = index * 80;
      const date = new Date(article.published_at).toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
      const cover = article.cover_image || 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&q=80';
      const tag = article.tag_list[0] || 'Article';
      
      grid.innerHTML += `
        <div class="col-md-6 col-xl-4" data-aos="fade-up" data-aos-delay="${delay}">
          <div class="project-card">
            <div class="card-img-wrap" style="height: 160px;">
              <img src="${cover}" alt="${article.title}"/>
              <div class="card-img-overlay"></div>
              <span class="card-category">${tag}</span>
            </div>
            <div class="card-body-custom">
              <h4 class="card-title-custom">${article.title}</h4>
              <p class="card-desc">${article.description}</p>
              <div class="card-tags mt-auto pt-3">
                <span class="tag" style="border: none; color: var(--muted);"><i class="bi bi-calendar3 me-1"></i> ${date}</span>
              </div>
            </div>
            <div class="card-actions">
              <a href="article.html#id=${article.id}" class="btn-card-primary" style="display:inline-block; text-decoration:none; text-align:center;">Read Article <i class="bi bi-arrow-right"></i></a>
            </div>
          </div>
        </div>
      `;
    });
  } catch (error) {
    grid.innerHTML = `<div class="col-12 text-center" style="color:var(--red)">Failed to load articles. Please try again later.</div>`;
  }
}

async function fetchSingleArticle() {
  const titleEl = document.getElementById('article-title');
  const metaEl = document.getElementById('article-meta');
  const coverEl = document.getElementById('article-cover');
  const bodyEl = document.getElementById('article-body');
  
  if (!titleEl || !bodyEl) return;

  const hash = window.location.hash;
  let id = null;
  if (hash.startsWith('#id=')) {
    id = hash.replace('#id=', '');
  }

  if (!id) {
    titleEl.textContent = "Article Not Found";
    metaEl.textContent = "Error";
    bodyEl.innerHTML = "<p>No article ID provided.</p>";
    return;
  }

  try {
    const res = await fetch(`https://dev.to/api/articles/${id}`);
    const article = await res.json();

    if (article.error) throw new Error("Not Found");

    titleEl.textContent = article.title;
    
    const date = new Date(article.published_at).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const tag = (article.tags && Array.isArray(article.tags) && article.tags.length > 0) ? article.tags[0] : 'Article';
    metaEl.innerHTML = `${tag} &bull; ${date}`;

    if (article.cover_image) {
      coverEl.src = article.cover_image;
      coverEl.style.display = 'block';
    }

    bodyEl.innerHTML = article.body_html;

  } catch (error) {
    titleEl.textContent = "Article Not Found";
    metaEl.textContent = "Error";
    bodyEl.innerHTML = "<p>Could not load the article. It may have been deleted.</p>";
  }
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

  // Dev.to Integrations
  fetchDevToArticles();
  fetchSingleArticle();

  // Close sidebar on link click (mobile)
  const navLinks = document.querySelectorAll('.sb-nav a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 991) {
        closeSidebar();
      }
    });
  });
});
