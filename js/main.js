/* =============================================
   main.js
   ============================================= */

/* ---- Navbar scroll + progress bar ---- */
const nav = document.getElementById('mainNav');
const progressBar = document.getElementById('progress-bar');

window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
    const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    progressBar.style.width = pct + '%';
}, { passive: true });

/* ---- Smooth scroll ---- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
        const target = document.querySelector(link.getAttribute('href'));
        if (!target) return;
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - nav.offsetHeight - 8;
        window.scrollTo({ top, behavior: 'smooth' });
        const bsCollapse = bootstrap.Collapse.getInstance(document.getElementById('navMenu'));
        if (bsCollapse) bsCollapse.hide();
    });
});

/* ---- Scroll reveal ---- */
const revealEls = document.querySelectorAll(
    '#sobre-mi, #habilidades, #proyectos, #trayectoria, #galeria, #contacto, ' +
    '.project-card, .skills-group, .timeline-item, .stat-card, .gallery-item, .about-card'
);
revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 80);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });
revealEls.forEach(el => revealObserver.observe(el));

/* ---- Skill bars ---- */
const skillSection = document.getElementById('habilidades');
let skillsAnimated = false;

const skillObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        document.querySelectorAll('.skill-item').forEach(item => {
            const level = item.dataset.level;
            const fill  = item.querySelector('.skill-fill');
            if (fill && level) setTimeout(() => { fill.style.width = level + '%'; }, 200);
        });
        skillObserver.disconnect();
    }
}, { threshold: 0.2 });
if (skillSection) skillObserver.observe(skillSection);

/* ---- Active nav link on scroll ---- */
const sections = document.querySelectorAll('section[id], header[id]');
const navLinks  = document.querySelectorAll('.navbar-nav .nav-link');

const activateLink = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + entry.target.id) {
                    link.classList.add('active');
                }
            });
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => activateLink.observe(s));

/* ---- Typing animation ---- */
const phrases = [
    'Ingeniero en Animacion y Efectos Visuales',
    'Especialidad en Diseno Interactivo',
    'Desarrollador de Assets 3D',
    'Motion Graphics & VFX'
];
let phraseIndex = 0, charIndex = 0, deleting = false;
const typingEl = document.getElementById('typing-text');

function type() {
    if (!typingEl) return;
    const current = phrases[phraseIndex];
    typingEl.textContent = deleting ? current.slice(0, charIndex--) : current.slice(0, charIndex++);
    if (!deleting && charIndex > current.length) { deleting = true; setTimeout(type, 1800); return; }
    if (deleting && charIndex < 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    setTimeout(type, deleting ? 40 : 65);
}
type();

/* ---- ContactForm styles (injected so the JSX stays style-free) ---- */
const cfStyles = document.createElement('style');
cfStyles.textContent = `
  .contact-form-wrap {
    max-width: 640px;
    margin: 0 auto;
    background: #161b22;
    border: 1px solid rgba(255,255,255,.06);
    border-radius: 20px;
    padding: 2.5rem;
  }
  .cf-label {
    display: block;
    font-size: .78rem;
    font-family: 'Space Mono', monospace;
    color: #8b949e;
    margin-bottom: .4rem;
    text-transform: uppercase;
    letter-spacing: .08em;
  }
  .cf-input {
    width: 100%;
    background: #0d1117;
    border: 1px solid rgba(255,255,255,.08);
    border-radius: 10px;
    padding: .7rem 1rem;
    color: #e6edf3;
    font-family: 'Space Grotesk', sans-serif;
    font-size: .95rem;
    outline: none;
    transition: border-color .2s, box-shadow .2s;
    resize: none;
  }
  .cf-input:focus {
    border-color: rgba(233,69,96,.6);
    box-shadow: 0 0 0 3px rgba(233,69,96,.12);
  }
  .cf-input--error { border-color: #e94560; }
  .cf-textarea { min-height: 130px; }
  .cf-error {
    display: block;
    font-size: .75rem;
    color: #ff7089;
    margin-top: .3rem;
    font-family: 'Space Mono', monospace;
  }
  .cf-submit {
    background: #e94560;
    color: #fff;
    border: none;
    width: 100%;
    padding: .85rem;
    border-radius: 10px;
    font-family: 'Space Mono', monospace;
    font-size: 1rem;
    font-weight: 700;
    letter-spacing: .02em;
    cursor: pointer;
    transition: background .2s, transform .15s, opacity .2s;
  }
  .cf-submit:hover:not(:disabled) { background: #c73652; transform: translateY(-2px); }
  .cf-submit:disabled { opacity: .7; cursor: not-allowed; }
  .cf-spinner {
    display: inline-block;
    width: 14px;
    height: 14px;
    border: 2px solid rgba(255,255,255,.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin .7s linear infinite;
    vertical-align: middle;
    margin-right: .5rem;
  }
  .contact-success-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    background: rgba(29,158,117,.15);
    border: 2px solid rgba(29,158,117,.4);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.8rem;
    color: #5DCAA5;
    margin: 0 auto;
  }
  .navbar-nav .nav-link.active { color: #e6edf3 !important; }
`;
document.head.appendChild(cfStyles);
