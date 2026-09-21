// ===== PURPLE ARROW CURSOR =====
const cursorCanvas = document.getElementById('cursor-canvas');
if (cursorCanvas) {
  cursorCanvas.style.cssText = 'position:fixed;inset:0;pointer-events:none;z-index:99999;';
  cursorCanvas.width = window.innerWidth;
  cursorCanvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    cursorCanvas.width = window.innerWidth;
    cursorCanvas.height = window.innerHeight;
  });
  const cctx = cursorCanvas.getContext('2d');
  let cx = -100, cy = -100;
  document.addEventListener('mousemove', e => { cx = e.clientX; cy = e.clientY; });
  function drawCursor() {
    cctx.clearRect(0, 0, cursorCanvas.width, cursorCanvas.height);
    cctx.save();
    cctx.translate(cx, cy);
    cctx.beginPath();
    cctx.moveTo(0, 0);
    cctx.lineTo(0, 20);
    cctx.lineTo(4.5, 15.5);
    cctx.lineTo(8, 22);
    cctx.lineTo(10, 21);
    cctx.lineTo(6.5, 14.5);
    cctx.lineTo(12, 14);
    cctx.closePath();
    cctx.fillStyle = '#a855f7';
    cctx.fill();
    cctx.strokeStyle = '#1a0030';
    cctx.lineWidth = 1;
    cctx.stroke();
    cctx.restore();
    requestAnimationFrame(drawCursor);
  }
  drawCursor();
}

// ===== PARTICLES =====
const canvas = document.getElementById('particles-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let W = canvas.width = window.innerWidth;
  let H = canvas.height = window.innerHeight;
  window.addEventListener('resize', () => {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  });
  const PARTICLE_COUNT = 70;
  const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
    x: Math.random() * W,
    y: Math.random() * H,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    r: Math.random() * 1.5 + 0.5
  }));
  function drawParticles() {
    ctx.clearRect(0, 0, W, H);
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
      if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0,255,157,0.5)';
      ctx.fill();
      for (let j = i + 1; j < particles.length; j++) {
        const q = particles[j];
        const dx = p.x - q.x, dy = p.y - q.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.strokeStyle = `rgba(0,255,157,${0.15 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(drawParticles);
  }
  drawParticles();
}

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });
revealEls.forEach(el => observer.observe(el));

// ===== GLITCH =====
const glitchEls = document.querySelectorAll('.glitch');
function triggerGlitch() {
  glitchEls.forEach(el => {
    el.classList.add('glitching');
    setTimeout(() => el.classList.remove('glitching'), 200);
  });
  setTimeout(triggerGlitch, 2500 + Math.random() * 3000);
}
if (glitchEls.length) triggerGlitch();

// ===== TYPEWRITER NAV =====
const phrases = ['M.AMAYA', 'M4t30A', 'ETHICAL HACKER', 'LINUX USER', 'M.AMAYA'];
let phraseIdx = 0, charIdx = 0, deleting = false;
const tw = document.getElementById('typewriter');
function typeWriter() {
  const current = phrases[phraseIdx];
  if (!deleting) {
    charIdx++;
    tw.textContent = current.slice(0, charIdx);
    if (charIdx === current.length) {
      deleting = true;
      setTimeout(typeWriter, 1800);
      return;
    }
    setTimeout(typeWriter, 100);
  } else {
    charIdx--;
    tw.textContent = current.slice(0, charIdx);
    if (charIdx === 0) {
      deleting = false;
      phraseIdx = (phraseIdx + 1) % phrases.length;
      setTimeout(typeWriter, 400);
      return;
    }
    setTimeout(typeWriter, 55);
  }
}
if (tw) typeWriter();

// ===== EASTER EGG: SUDO SU =====
const secretCode = 'sudo su';
let sudoBuffer = '';
document.addEventListener('keydown', e => {
  const overlay = document.getElementById('sudo-overlay');
  if (!overlay) return;
  if (overlay.classList.contains('active')) {
    if (e.key === 'Escape') closeSudo();
    return;
  }
  if (e.key.length === 1) sudoBuffer += e.key;
  if (sudoBuffer.length > secretCode.length) sudoBuffer = sudoBuffer.slice(-secretCode.length);
  if (sudoBuffer === secretCode) { sudoBuffer = ''; triggerSudo(); }
});

function triggerSudo() {
  const overlay = document.getElementById('sudo-overlay');
  const body = document.getElementById('sudo-body');
  body.innerHTML = '';
  overlay.classList.add('active');
  const lines = [
    { text: '$ sudo su', cls: 'dim' },
    { text: '[sudo] password for mateo: ********', cls: '' },
    { text: 'Verificando credenciales...', cls: 'dim' },
    { text: '> Analizando sistema...', cls: '' },
    { text: '> Escaneando puertos...', cls: '' },
    { text: '> Bypasseando firewall...', cls: 'cyan' },
    { text: '> Escalando privilegios...', cls: 'cyan' },
    { text: '██████████████████ 100%', cls: '' },
    { text: '', cls: '' },
    { text: '╔═══════════════════════════╗', cls: 'white' },
    { text: '║   ✓  ACCESO CONCEDIDO     ║', cls: 'white' },
    { text: '╚═══════════════════════════╝', cls: 'white' },
    { text: '', cls: '' },
    { text: 'Bienvenido, root.', cls: 'cyan' },
    { text: 'root@m4t30a:~# _', cls: 'sudo-blink' },
  ];
  let delay = 0;
  lines.forEach((line, i) => {
    setTimeout(() => {
      const el = document.createElement('div');
      el.className = 'sudo-line ' + (line.cls || '');
      el.textContent = line.text;
      body.appendChild(el);
      body.scrollTop = body.scrollHeight;
    }, delay);
    delay += i < 2 ? 400 : i < 8 ? 280 : 120;
  });
}
function closeSudo() {
  document.getElementById('sudo-overlay').classList.remove('active');
}
