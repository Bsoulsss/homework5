// document.addEventListener('DOMContentLoaded', () => {
//   const parentBlock = document.querySelector('.parent_block');
//   const childBlock = document.querySelector('.child_block');
//
//   let x = 0, y = 0;
//   const maxX = parentBlock.clientWidth - childBlock.clientWidth;
//   const maxY = parentBlock.clientHeight - childBlock.clientHeight;
//
//   function move() {
//     childBlock.style.left = `${x}px`;
//     childBlock.style.top = `${y}px`;
//
//     if (x < maxX && y === 0) {
//       x++;
//     } else if (x === maxX && y < maxY) {
//       y++;
//     } else if (y === maxY && x > 0) {
//       x--;
//     } else if (x === 0 && y > 0) {
//       y--;
//     }
//
//     if (!(x === 0 && y === 0)) {
//       requestAnimationFrame(move);
//     }
//   }
//
//   move();
// });
//
// document.addEventListener('DOMContentLoaded', () => {
//   let count = 0;
//   let intervalId = null;
//
//   const display = document.querySelector('#seconds');
//   const startBtn = document.querySelector('#start');
//   const stopBtn = document.querySelector('#stop');
//   const resetBtn = document.querySelector('#reset');
//
//   function updateDisplay() {
//     if (display) {
//       display.textContent = count;
//     }
//   }
//   function startCounting() {
//     if (intervalId !== null) return;
//     intervalId = setInterval(() => {
//       count++;
//       updateDisplay();
//     }, 1000);
//     startBtn.disabled = true;
//   }
//   function stopCounting() {
//     if (intervalId !== null) {
//       clearInterval(intervalId);
//       intervalId = null;
//       startBtn.disabled = false;
//     }
//   }
//   function resetCounting() {
//     stopCounting();
//     count = 0;
//     updateDisplay();
//   }
//   startBtn.addEventListener('click', startCounting);
//   stopBtn.addEventListener('click', stopCounting);
//   resetBtn.addEventListener('click', resetCounting);
//
//   updateDisplay();
// });

// дз3
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.querySelector('.modal');
  const modalClose = document.querySelector('.modal_close');
  const btnGet = document.getElementById('btn-get');

  function showModal() {
    modal.classList.add('show');
    modal.classList.remove('hide');
    document.body.style.overflow = 'hidden';
  }

  function hideModal() {
    modal.classList.add('hide');
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  if (btnGet) {
    btnGet.addEventListener('click', showModal);
  }

  if (modalClose) {
    modalClose.addEventListener('click', hideModal);
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      hideModal();
    }
  });

  setTimeout(showModal, 10000);

  function handleScrollToEnd() {
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
      showModal();
      window.removeEventListener('scroll', handleScrollToEnd);
    }
  }

  window.addEventListener('scroll', handleScrollToEnd);
});
