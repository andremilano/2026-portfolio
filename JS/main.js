// ── Cherry Blossom Particles ──
(function () {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    let petals = [], W, H;
    function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
    window.addEventListener('resize', resize); resize();

    class Petal {
        constructor() { this.reset(true); }
        reset(init) {
            this.x = init ? Math.random() * W : -30;
            this.y = init ? Math.random() * H : -30;
            this.size = Math.random() * 3.2 + 1.2;
            this.speedX = Math.random() * 1.0 + 0.3;
            this.speedY = Math.random() * 0.45 + 0.15;
            this.wobble = Math.random() * Math.PI * 2;
            this.wobbleSpeed = Math.random() * 0.024 + 0.012;
            this.wobbleAmp = Math.random() * 1.2 + 0.5;
            this.opacity = Math.random() * 0.34 + 0.18;
            this.rotation = Math.random() * Math.PI * 2;
            this.rotSpeed = (Math.random() - 0.5) * 0.04;
            const pinks = [[228, 156, 168], [216, 138, 153], [243, 183, 193], [198, 118, 138]];
            this.color = pinks[Math.floor(Math.random() * pinks.length)];
        }
        update() {
            this.wobble += this.wobbleSpeed;
            this.x += this.speedX + Math.sin(this.wobble) * this.wobbleAmp;
            this.y += this.speedY;
            this.rotation += this.rotSpeed;
            if (this.x > W + 40 || this.y > H + 40) this.reset(false);
        }
        draw() {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.globalAlpha = this.opacity;
            const [r, g, b] = this.color;
            ctx.fillStyle = `rgb(${r},${g},${b})`;
            ctx.shadowColor = `rgba(${r},${g},${b},0.35)`;
            ctx.shadowBlur = 4;
            // two-lobe petal
            ctx.beginPath();
            ctx.ellipse(-this.size * 0.3, 0, this.size * 0.55, this.size * 0.27, -0.38, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.ellipse(this.size * 0.3, 0, this.size * 0.55, this.size * 0.27, 0.38, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        }
    }

    for (let i = 0; i < 55; i++) petals.push(new Petal());
    function animate() { ctx.clearRect(0, 0, W, H); petals.forEach(p => { p.update(); p.draw(); }); requestAnimationFrame(animate); }
    animate();
})();

// ── Scroll Reveal ──
(function () {
    const els = document.querySelectorAll('.reveal');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach((e, i) => { if (e.isIntersecting) { setTimeout(() => e.target.classList.add('visible'), i * 120); obs.unobserve(e.target); } });
    }, { threshold: 0.15 });
    els.forEach(el => obs.observe(el));
})();

// ── Skill Bars ──
(function () {
    const bars = document.querySelectorAll('.skill-bar-fill');
    const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('animate'); obs.unobserve(e.target); } });
    }, { threshold: 0.4 });
    bars.forEach(b => obs.observe(b));
})();

// ── Mobile Menu ──
function openMobileMenu() { document.getElementById('mobileMenu').classList.add('open'); }
function closeMobileMenu() { document.getElementById('mobileMenu').classList.remove('open'); }

// ── Nav shrink ──
(function () {
    const nav = document.querySelector('.nav-bar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 60) { nav.style.padding = '10px 32px'; nav.style.background = 'rgba(250,247,242,0.94)'; }
        else { nav.style.padding = '18px 32px'; nav.style.background = 'rgba(250,247,242,0.82)'; }
    });
})();

// ── Smooth scroll ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
        const t = document.querySelector(a.getAttribute('href'));
        if (t) { e.preventDefault(); window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 70, behavior: 'smooth' }); }
    });
});

const backToTopBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        backToTopBtn.classList.remove('hidden');
        backToTopBtn.classList.add('opacity-100');
    } else {
        backToTopBtn.classList.add('hidden');
        backToTopBtn.classList.remove('opacity-100');
    }
});
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});