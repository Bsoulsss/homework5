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
// document.addEventListener('DOMContentLoaded', () => {
//   const modal = document.querySelector('.modal');
//   const modalClose = document.querySelector('.modal_close');
//   const btnGet = document.getElementById('btn-get');
//
//   function showModal() {
//     modal.classList.add('show');
//     modal.classList.remove('hide');
//     document.body.style.overflow = 'hidden';
//   }
//
//   function hideModal() {
//     modal.classList.add('hide');
//     modal.classList.remove('show');
//     document.body.style.overflow = '';
//   }
//
//   if (btnGet) {
//     btnGet.addEventListener('click', showModal);
//   }
//
//   if (modalClose) {
//     modalClose.addEventListener('click', hideModal);
//   }
//
//   modal.addEventListener('click', (e) => {
//     if (e.target === modal) {
//       hideModal();
//     }
//   });
//
//   setTimeout(showModal, 10000);
//
//   function handleScrollToEnd() {
//     if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight) {
//       showModal();
//       window.removeEventListener('scroll', handleScrollToEnd);
//     }
//   }
//
//   window.addEventListener('scroll', handleScrollToEnd);
// });


// дз4

fetch('../data/characters.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Ошибка загрузки файла characters.json');
    }
    return response.json();
  })
  .then(data => {
    const container = document.querySelector('#characters-container');
    if (!container) {
      console.error('Контейнер с id "characters-container" не найден');
      return;
    }

    data.forEach(character => {
      const card = document.createElement('div');
      card.classList.add('character-card');

      const name = document.createElement('h3');
      name.textContent = character.name;

      const age = document.createElement('p');
      age.textContent =  `Age: ${character.age}`;

      const house = document.createElement('p');
      house.textContent = `House: ${character.house}`;

      const image = document.createElement('img');
      image.src = `../images/${character.image}`;
      image.alt = `${character.name}`;

      card.appendChild(name);
      card.appendChild(age);
      card.appendChild(house);
      card.appendChild(image);

      container.appendChild(card);
    });
  })
  .catch(error => console.error('Ошибка при получении персонажей:', error));



const xhr = new XMLHttpRequest();
xhr.open('GET', '../data/any.json', true);

xhr.onload = function () {
  if (xhr.status === 200) {
    const data = JSON.parse(xhr.responseText);
    console.log('Данные из any.json:', data);
  } else {
    console.error('Ошибка при запросе any.json:', xhr.statusText);
  }
};

xhr.onerror = function () {
  console.error('Сетевая ошибка при запросе any.json');
};

xhr.send();