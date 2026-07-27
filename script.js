/* ====================================================
   DP LAB - JavaScript
==================================================== */


// ============ MENÚ MÓVIL ============
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('is-open');
});

document.querySelectorAll('.nav__link').forEach((link) => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('is-open');
  });
});


// ============ NAV CON SOMBRA AL SCROLLEAR ============
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 8) {
    nav.classList.add('is-scrolled');
  } else {
    nav.classList.remove('is-scrolled');
  }
}, { passive: true });


// ============ ANIMACIONES DE REVELADO ============
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.10, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal').forEach((el) => {
  revealObserver.observe(el);
});


// ============ CONTADORES ANIMADOS ============
const counters = document.querySelectorAll('.counter');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = parseInt(el.dataset.target, 10);
    const suffix = el.dataset.suffix || '';
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: 0.5 });

counters.forEach((el) => counterObserver.observe(el));


// ============ TERMINAL ANIMADO ============
const terminalBody = document.getElementById('terminalBody');

const lines = [
  { text: '$ workflow start lead-routing.json',                 cls: 'prompt' },
  { text: '> Esperando evento...',                              cls: 'info' },
  { text: '> Evento recibido: nuevo lead desde formulario',     cls: 'highlight' },
  { text: '✓ Email validado (success)',                         cls: 'success' },
  { text: '✓ Datos enriquecidos via Apollo API',                cls: 'success' },
  { text: '✓ Lead score calculado: 87/100',                     cls: 'success' },
  { text: '> Asignando a SDR disponible: Carlos M.',            cls: 'highlight' },
  { text: '✓ Notificación enviada a #leads-new (Slack)',        cls: 'success' },
  { text: '✓ Recordatorio creado en Calendar (15 min)',         cls: 'success' },
  { text: '✓ Lead registrado en CRM (Pipedrive)',               cls: 'success' },
  { text: '> Tiempo total: 3.4s',                                cls: 'info' },
  { text: '$ Esperando próximo evento...',                      cls: 'prompt' },
];

let typingIndex = 0;
let charIndex = 0;
let currentLineEl = null;

function clearTerminal() {
  terminalBody.innerHTML = '';
  typingIndex = 0;
  charIndex = 0;
}

function startCursor() {
  const cursor = document.createElement('span');
  cursor.className = 'terminal__cursor';
  terminalBody.appendChild(cursor);
}

function removeCursor() {
  const cursor = terminalBody.querySelector('.terminal__cursor');
  if (cursor) cursor.remove();
}

function typeLine() {
  if (typingIndex >= lines.length) {
    setTimeout(() => {
      clearTerminal();
      typeLine();
    }, 3000);
    return;
  }

  const lineData = lines[typingIndex];

  if (charIndex === 0) {
    removeCursor();
    currentLineEl = document.createElement('span');
    currentLineEl.className = 'terminal__line terminal__' + lineData.cls;
    terminalBody.appendChild(currentLineEl);
  }

  if (charIndex < lineData.text.length) {
    currentLineEl.textContent += lineData.text.charAt(charIndex);
    charIndex++;
    const speed = lineData.text.charAt(charIndex - 1) === ' ' ? 12 : 18 + Math.random() * 14;
    setTimeout(typeLine, speed);
  } else {
    terminalBody.appendChild(document.createElement('br'));
    typingIndex++;
    charIndex = 0;
    const pause = lineData.cls === 'prompt' ? 600 : 280;
    setTimeout(() => {
      startCursor();
      setTimeout(typeLine, pause);
    }, pause);
  }
}

const terminalObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      typeLine();
      terminalObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

if (terminalBody) {
  terminalObserver.observe(terminalBody);
}


// ============ CALCULADORA ============
const hoursInput = document.getElementById('hoursInput');
const costInput = document.getElementById('costInput');
const peopleInput = document.getElementById('peopleInput');

const hoursValue = document.getElementById('hoursValue');
const costValue = document.getElementById('costValue');
const peopleValue = document.getElementById('peopleValue');

const monthlyCostEl = document.getElementById('monthlyCost');
const yearlyCostEl = document.getElementById('yearlyCost');
const savingsEl = document.getElementById('savings');
const roiEl = document.getElementById('roi');

function formatMoney(n) {
  return '$ ' + Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function calc() {
  const hours = parseInt(hoursInput.value, 10);
  const cost = parseInt(costInput.value, 10);
  const people = parseInt(peopleInput.value, 10);

  const monthly = hours * cost * people * 4.33;
  const yearly = monthly * 12;
  const savings = yearly * 0.8;
  const investment = 4500000;
  const roiMonths = monthly > 0 ? Math.max(1, Math.round(investment / (monthly * 0.8))) : 99;

  hoursValue.textContent = hours + ' hs';
  costValue.textContent = '$ ' + cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  peopleValue.textContent = people;

  monthlyCostEl.textContent = formatMoney(monthly);
  yearlyCostEl.textContent = formatMoney(yearly);
  savingsEl.textContent = formatMoney(savings) + ' / año';

  if (roiMonths >= 12) {
    roiEl.textContent = '~' + Math.round(roiMonths / 12 * 10) / 10 + ' años';
  } else {
    roiEl.textContent = roiMonths === 1 ? 'Menos de 1 mes' : '~' + roiMonths + ' meses';
  }
}

if (hoursInput && costInput && peopleInput) {
  hoursInput.addEventListener('input', calc);
  costInput.addEventListener('input', calc);
  peopleInput.addEventListener('input', calc);
  calc();
}


// ============ FORMULARIO ============
const CONTACT_WEBHOOK_URL = 'https://dpwebhookn8n.dprocesslab.com/webhook/contact-form';

async function handleSubmit(form) {
  const data = {
    name: form.name.value,
    company: form.company.value,
    email: form.email.value,
    message: form.message.value,
  };

  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn.textContent;
  submitBtn.disabled = true;
  submitBtn.textContent = 'Enviando...';

  try {
    const response = await fetch(CONTACT_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (!response.ok) throw new Error('HTTP ' + response.status);

    alert('¡Gracias ' + data.name + '! Te contactamos en menos de 4 horas hábiles.');
    form.reset();
  } catch (error) {
    console.error('Error enviando formulario:', error);
    alert('Hubo un problema al enviar tu mensaje. Por favor intenta de nuevo en unos minutos o escríbenos directo a projects@dprocesslab.com');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalText;
  }
}
