document.addEventListener('DOMContentLoaded', () => {
  const parentBlock = document.querySelector('.parent_block');
  const childBlock = document.querySelector('.child_block');

  let x = 0, y = 0;
  const maxX = parentBlock.clientWidth - childBlock.clientWidth;
  const maxY = parentBlock.clientHeight - childBlock.clientHeight;

  function move() {
    childBlock.style.left = `${x}px`;
    childBlock.style.top = `${y}px`;

    if (x < maxX && y === 0) {
      x++;
    } else if (x === maxX && y < maxY) {
      y++;
    } else if (y === maxY && x > 0) {
      x--;
    } else if (x === 0 && y > 0) {
      y--;
    }

    if (!(x === 0 && y === 0)) {
      requestAnimationFrame(move);
    }
  }

  move();
});

document.addEventListener('DOMContentLoaded', () => {
  let count = 0;
  let intervalId = null;

  const display = document.querySelector('#seconds');
  const startBtn = document.querySelector('#start');
  const stopBtn = document.querySelector('#stop');
  const resetBtn = document.querySelector('#reset');

  function updateDisplay() {
    if (display) {
      display.textContent = count;
    }
  }
  function startCounting() {
    if (intervalId !== null) return;
    intervalId = setInterval(() => {
      count++;
      updateDisplay();
    }, 1000);
    startBtn.disabled = true;
  }
  function stopCounting() {
    if (intervalId !== null) {
      clearInterval(intervalId);
      intervalId = null;
      startBtn.disabled = false;
    }
  }
  function resetCounting() {
    stopCounting();
    count = 0;
    updateDisplay();
  }
  startBtn.addEventListener('click', startCounting);
  stopBtn.addEventListener('click', stopCounting);
  resetBtn.addEventListener('click', resetCounting);

  updateDisplay();
});