// Bubble generation script
// Generates decorative bubbles in the left & right side columns based on CSS variables.

(function() {
  const leftContainer = document.querySelector('.bubbles-left');
  const rightContainer = document.querySelector('.bubbles-right');
  if (!leftContainer || !rightContainer) return;

  const rootStyles = getComputedStyle(document.documentElement);
  const count = parseInt(rootStyles.getPropertyValue('--bubble-count')) || 20;
  const minSize = parseInt(rootStyles.getPropertyValue('--bubble-min-size')) || 12;
  const maxSize = parseInt(rootStyles.getPropertyValue('--bubble-max-size')) || 100;
  const alpha = parseFloat(rootStyles.getPropertyValue('--bubble-alpha')) || 0.25;
  const hueBase = parseInt(rootStyles.getPropertyValue('--bubble-hue-base')) || 220;
  const sat = rootStyles.getPropertyValue('--bubble-sat') || '65%';
  const lightMin = parseInt(rootStyles.getPropertyValue('--bubble-light-min')) || 20;
  const lightMax = parseInt(rootStyles.getPropertyValue('--bubble-light-max')) || 40;

  function rand(min, max) {
    return Math.random() * (max - min) + min;
  }

  function createBubble(side) {
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const inner = document.createElement('div');
    inner.className = 'bubble-inner';
    bubble.appendChild(inner);

    const size = rand(minSize, maxSize);
    const scale = (size / maxSize).toFixed(3);

    const startX = rand(-15, 80); // start horizontal offset (% of container)
    const wobble = rand(-25, 25);
    const duration = rand(22, 48); // seconds
    const delay = -rand(0, duration); // negative to stagger
    const wobbleDuration = rand(6, 16);
    const wobbleDelay = rand(0, 6);

    const lightness = rand(lightMin, lightMax).toFixed(1);
    const color = `hsla(${hueBase + rand(-8,8)}, ${sat}, ${lightness}%, ${alpha})`;

    bubble.style.width = size + 'px';
    bubble.style.height = size + 'px';
    bubble.style.left = side === 'left' ? startX + '%' : 'auto';
    bubble.style.right = side === 'right' ? startX + '%' : 'auto';

    bubble.style.setProperty('--x-offset', startX + '%');
    bubble.style.setProperty('--x-wobble', wobble + '%');
    bubble.style.setProperty('--scale', scale);
    bubble.style.setProperty('--target-opacity', (0.25 + Math.random() * 0.35).toFixed(3));
    bubble.style.setProperty('--w1', (rand(-4,4)) + 'px');
    bubble.style.setProperty('--w2', (rand(-6,6)) + 'px');
    bubble.style.setProperty('--w3', (rand(-4,4)) + 'px');
    bubble.style.setProperty('--y1', (rand(-3,3)) + 'px');
    bubble.style.setProperty('--y2', (rand(-5,5)) + 'px');
    bubble.style.setProperty('--y3', (rand(-3,3)) + 'px');
    bubble.style.setProperty('--wobble-duration', wobbleDuration + 's');
    bubble.style.setProperty('--wobble-delay', wobbleDelay + 's');

    bubble.style.backgroundColor = color;
    bubble.style.animationDuration = duration + 's';
    bubble.style.animationDelay = delay + 's';

    return bubble;
  }

  function populate(container, side) {
    for (let i = 0; i < count; i++) {
      container.appendChild(createBubble(side));
    }
  }

  populate(leftContainer, 'left');
  populate(rightContainer, 'right');

  // Optional: periodic replacement to keep motion varied
  setInterval(() => {
    const containers = [leftContainer, rightContainer];
    containers.forEach(ct => {
      const bubbles = ct.querySelectorAll('.bubble');
      if (!bubbles.length) return;
      const replaceIndex = Math.floor(Math.random() * bubbles.length);
      const old = bubbles[replaceIndex];
      const side = ct === leftContainer ? 'left' : 'right';
      const fresh = createBubble(side);
      ct.replaceChild(fresh, old);
    });
  }, 8000);
})();
