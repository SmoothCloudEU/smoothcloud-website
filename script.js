(function(){
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
  const form = document.querySelector('.notify-form');
  const feedback = document.querySelector('.form-feedback');
  if (form && feedback) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const email = form.email.value.trim();
      if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
        feedback.textContent = 'Bitte eine gültige E-Mail eingeben.';
        feedback.style.color = '#ff8d8d';
        return;
      }
      feedback.textContent = 'Danke! Wir melden uns bald.';
      feedback.style.color = '#7aa2ff';
      form.reset();
    });
  }
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;
  const leftContainer = document.querySelector('.bubbles-left');
  const rightContainer = document.querySelector('.bubbles-right');
  const bubbleCount = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--bubble-count'), 10) || 20;
  function rand(min, max) { return Math.random() * (max - min) + min; }
  function createBubble(sideContainer, side) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const cs = getComputedStyle(document.documentElement);
    const minSize = parseFloat(cs.getPropertyValue('--bubble-min-size')) || 14;
    const maxSize = parseFloat(cs.getPropertyValue('--bubble-max-size')) || 110;
    const size = rand(minSize, maxSize);
    const hueBase = parseFloat(cs.getPropertyValue('--bubble-hue-base')) || 218;
    const hue = hueBase + rand(-6, 10);
    const lightMin = parseFloat(cs.getPropertyValue('--bubble-light-min')) || 18;
    const lightMax = parseFloat(cs.getPropertyValue('--bubble-light-max')) || 38;
    const light = rand(lightMin, lightMax);
    const sat = cs.getPropertyValue('--bubble-sat') || '65%';
    const alpha = parseFloat(cs.getPropertyValue('--bubble-alpha')) || 0.28;
    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = side === 'left' ? rand(-15, 55) + '%' : rand(45, 115) + '%';
    bubble.style.bottom = rand(-5, 25) + '%';
    const scale = rand(0.85, 1.25);
    const duration = rand(18, 42);
    const delay = rand(-duration * 0.9, 4);
    const wobbleDuration = rand(6, 14);
    const wobbleDelay = rand(-wobbleDuration, wobbleDuration);
    const xOffset = side === 'left' ? rand(-25, 10) + '%' : rand(-10, 25) + '%';
    const wobbleX = rand(4, 18) * (Math.random() > 0.5 ? 1 : -1);
    const targetOpacity = size < 30 ? 0.22 : size < 60 ? 0.28 : 0.34;
    bubble.style.setProperty('--target-opacity', targetOpacity);
    bubble.style.setProperty('--scale', scale.toFixed(3));
    bubble.style.setProperty('--x-offset', xOffset);
    bubble.style.setProperty('--x-wobble', wobbleX + '%');
    bubble.style.setProperty('--wobble-duration', wobbleDuration + 's');
    bubble.style.setProperty('--wobble-delay', wobbleDelay + 's');
    bubble.style.setProperty('--w1', (rand(-14,14)) + 'px');
    bubble.style.setProperty('--w2', (rand(-18,18)) + 'px');
    bubble.style.setProperty('--w3', (rand(-14,14)) + 'px');
    bubble.style.setProperty('--y1', (rand(-6,6)) + 'px');
    bubble.style.setProperty('--y2', (rand(-10,10)) + 'px');
    bubble.style.setProperty('--y3', (rand(-6,6)) + 'px');
    const gradientColor = `hsla(${hue} ${sat} ${light}% / ${alpha})`;
    bubble.style.backgroundColor = gradientColor;
    bubble.style.animationDuration = duration + 's';
    bubble.style.animationDelay = delay + 's';
    const inner = document.createElement('div');
    inner.className = 'bubble-inner';
    inner.setAttribute('role', 'presentation');
    bubble.appendChild(inner);
    sideContainer.appendChild(bubble);
    bubble.addEventListener('animationend', (ev) => {
      if (ev.animationName === 'bubble-rise') {
        bubble.style.animation = 'none';
        const newSize = rand(minSize, maxSize);
        bubble.style.width = bubble.style.height = newSize + 'px';
        bubble.style.setProperty('--target-opacity', newSize < 30 ? 0.22 : newSize < 60 ? 0.28 : 0.34);
        bubble.style.setProperty('--scale', rand(0.85,1.25).toFixed(3));
        bubble.style.left = side === 'left' ? rand(-15, 55) + '%' : rand(45, 115) + '%';
        bubble.style.bottom = rand(-5, 25) + '%';
        const nWobbleDur = rand(6,14);
        inner.style.animationDuration = nWobbleDur + 's';
        inner.style.animationDelay = rand(-nWobbleDur, nWobbleDur) + 's';
        const nDur = rand(18,42);
        const nDelay = rand(-nDur * 0.9, 2);
        const nxOffset = side === 'left' ? rand(-25, 10) + '%' : rand(-10, 25) + '%';
        const nWobbleX = rand(4, 18) * (Math.random() > 0.5 ? 1 : -1);
        bubble.style.setProperty('--x-offset', nxOffset);
        bubble.style.setProperty('--x-wobble', nWobbleX + '%');
        bubble.style.animation = `bubble-rise linear forwards, bubble-fade-in 1400ms ease forwards`;
        bubble.style.animationDuration = `${nDur}s, 1400ms`;
        bubble.style.animationDelay = `${nDelay}s, ${nDelay}s`;
      }
    }, { passive: true });
  }
  const half = Math.floor(bubbleCount / 2);
  for (let i = 0; i < bubbleCount; i++) {
    const side = i < half ? 'left' : 'right';
    createBubble(side === 'left' ? leftContainer : rightContainer, side);
  }
})();