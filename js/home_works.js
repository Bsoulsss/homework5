document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing email validation...');
  const gmailInput = document.getElementById('gmail_input');
  const gmailButton = document.getElementById('gmail_button');
  const gmailResult = document.getElementById('gmail_result');

  const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;

  gmailButton.addEventListener('click', () => {
    const value = gmailInput.value.trim();
    console.log('Validating email:', value);

    if (gmailRegex.test(value)) {
      gmailResult.textContent = 'Почта валидна ✅';
      gmailResult.style.color = 'lime';
      console.log('Email is valid');
    } else {
      gmailResult.textContent = 'Некорректная почта ❌';
      gmailResult.style.color = 'red';
      console.log('Email is invalid');
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing block movement...');
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

  console.log('Starting block movement animation');
  move();
});


// дз2
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing counter...');
  let count = 0;
  let intervalId = null;

  const display = document.querySelector('#seconds');
  const startBtn = document.querySelector('#start');
  const stopBtn = document.querySelector('#stop');
  const resetBtn = document.querySelector('#reset');

  function updateDisplay() {
    if (display) {
      display.textContent = count;
      console.log('Counter updated:', count);
    }
  }
  function startCounting() {
    if (intervalId !== null) return;
    console.log('Starting counter');
    intervalId = setInterval(() => {
      count++;
      updateDisplay();
    }, 1000);
    startBtn.disabled = true;
  }
  function stopCounting() {
    if (intervalId !== null) {
      console.log('Stopping counter');
      clearInterval(intervalId);
      intervalId = null;
      startBtn.disabled = false;
    }
  }
  function resetCounting() {
    console.log('Resetting counter');
    stopCounting();
    count = 0;
    updateDisplay();
  }
  startBtn.addEventListener('click', startCounting);
  stopBtn.addEventListener('click', stopCounting);
  resetBtn.addEventListener('click', resetCounting);

  updateDisplay();
});

// дз4
async function loadCharacters() {
    console.log('Starting to load characters...');
    try {
        const response = await fetch('../data/characters.json');
        if (!response.ok) {
            throw new Error('Ошибка загрузки файла characters.json');
        }

        const data = await response.json();
        console.log('Characters data received:', data);
        
        const container = document.querySelector('#characters-container');
        
        if (!container) {
            throw new Error('Контейнер с id "characters-container" не найден');
        }

        data.forEach((character, index) => {
            console.log(`Creating character card ${index + 1}:`, character.name);
            const card = document.createElement('div');
            card.classList.add('character-card');

            const name = document.createElement('h3');
            name.textContent = character.name;

            const age = document.createElement('p');
            age.textContent = `Age: ${character.age}`;

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
        console.log('All character cards have been created');
    } catch (error) {
        console.error('Ошибка при получении персонажей:', error);
    }
}

loadCharacters();

// Замена XMLHttpRequest на fetch с async/await
async function loadAnyData() {
    console.log('Starting to load any.json data...');
    try {
        const response = await fetch('../data/any.json');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Data from any.json received:', data);
    } catch (error) {
        console.error('Ошибка при запросе any.json:', error);
    }
}

loadAnyData();