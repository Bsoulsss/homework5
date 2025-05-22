// PHONE CHECKER

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    console.log('Phone validation started:', phoneInput.value);
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
        console.log('Phone number is valid');
    } else {
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color = 'red'
        console.log('Phone number is invalid');
    }
}

document.addEventListener('DOMContentLoaded', () => {
  const contentBlocks = document.querySelectorAll('.tab_content_block');
  const tabButtons = document.querySelectorAll('.tab_content_item');
  let currentIndex = 0;
  let intervalId;

  function activateTab(index) {
    contentBlocks.forEach(block => block.classList.remove('tab_content_block_active'));
    tabButtons.forEach(btn => btn.classList.remove('tab_content_item_active'));

    contentBlocks[index].classList.add('tab_content_block_active');
    tabButtons[index].classList.add('tab_content_item_active');
  }

  tabButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      currentIndex = idx;
      activateTab(currentIndex);
      resetAutoSwitch();
    });
  });

  function autoSwitch() {
    currentIndex = (currentIndex + 1) % contentBlocks.length;
    activateTab(currentIndex);
  }

  function resetAutoSwitch() {
    clearInterval(intervalId);
    intervalId = setInterval(autoSwitch, 3000);
  }

  activateTab(currentIndex);
  resetAutoSwitch();
});

// дз3
document.addEventListener('DOMContentLoaded', () => {
  const contentBlocks = document.querySelectorAll('.tab_content_block');
  const tabButtons = document.querySelectorAll('.tab_content_item');
  let currentIndex = 0;
  let intervalId;

  function activateTab(index) {
    contentBlocks.forEach(block => block.classList.remove('tab_content_block_active'));
    tabButtons.forEach(btn => btn.classList.remove('tab_content_item_active'));
    contentBlocks[index].classList.add('tab_content_block_active');
    tabButtons[index].classList.add('tab_content_item_active');
  }

  tabButtons.forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      currentIndex = idx;
      activateTab(currentIndex);
      resetAutoSwitch();
    });
  });

  function autoSwitch() {
    currentIndex = (currentIndex + 1) % contentBlocks.length;
    activateTab(currentIndex);
  }

  function resetAutoSwitch() {
    clearInterval(intervalId);
    intervalId = setInterval(autoSwitch, 3000);
  }

  activateTab(currentIndex);
  resetAutoSwitch();
});

// дз5
const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

async function loadConverterData() {
    console.log('Starting to load currency converter data...');
    try {
        const response = await fetch('../data/CONVERTER.json');
        if (!response.ok) throw new Error('Ошибка загрузки курсов валют');
        
        const data = await response.json();
        console.log('Currency rates loaded:', data);
        const usdRate = data.usd;
        const eurRate = data.eur;

        let isTyping = false;

        somInput.addEventListener('input', () => {
            if (isTyping) return;
            isTyping = true;

            const som = parseFloat(somInput.value);
            console.log('Converting from SOM:', som);
            if (!isNaN(som)) {
                const usd = (som / usdRate).toFixed(2);
                const eur = (som / eurRate).toFixed(2);
                usdInput.value = usd;
                eurInput.value = eur;
                console.log('Converted to USD:', usd, 'EUR:', eur);
            } else {
                usdInput.value = '';
                eurInput.value = '';
                console.log('Invalid SOM input');
            }

            isTyping = false;
        });

        usdInput.addEventListener('input', () => {
            if (isTyping) return;
            isTyping = true;

            const usd = parseFloat(usdInput.value);
            console.log('Converting from USD:', usd);
            if (!isNaN(usd)) {
                const som = usd * usdRate;
                const eur = (som / eurRate).toFixed(2);
                somInput.value = som.toFixed(2);
                eurInput.value = eur;
                console.log('Converted to SOM:', som, 'EUR:', eur);
            } else {
                somInput.value = '';
                eurInput.value = '';
                console.log('Invalid USD input');
            }

            isTyping = false;
        });

        eurInput.addEventListener('input', () => {
            if (isTyping) return;
            isTyping = true;

            const eur = parseFloat(eurInput.value);
            console.log('Converting from EUR:', eur);
            if (!isNaN(eur)) {
                const som = eur * eurRate;
                const usd = (som / usdRate).toFixed(2);
                somInput.value = som.toFixed(2);
                usdInput.value = usd;
                console.log('Converted to SOM:', som, 'USD:', usd);
            } else {
                somInput.value = '';
                usdInput.value = '';
                console.log('Invalid EUR input');
            }

            isTyping = false;
        });
    } catch (error) {
        console.error('Ошибка загрузки курсов валют:', error);
    }
}

loadConverterData();

// дз6
document.addEventListener('DOMContentLoaded', async () => {
    console.log('DOM loaded, initializing todo functionality...');
    const card = document.querySelector('.card');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    let todoId = 1;
    const maxTodos = 200;

    const fetchTodo = async (id) => {
        console.log('Fetching todo with ID:', id);
        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`);
            if (!response.ok) throw new Error('Ошибка загрузки');

            const { title, id: todoId, completed } = await response.json();
            console.log('Todo data received:', { id: todoId, title, completed });

            card.innerHTML = `
                <h4>${todoId}</h4>
                <p><strong></strong> ${title}</p>
                <p><strong></strong> <span style="color: ${completed ? 'green' : 'red'}">${completed ? 'Да' : 'Нет'}</span></p>
            `;
        } catch (error) {
            console.error('Error fetching todo:', error);
            card.innerHTML = `<p>Ошибка при загрузке данных</p>`;
        }
    };

    btnNext.addEventListener('click', () => {
        todoId = todoId >= maxTodos ? 1 : todoId + 1;
        console.log('Next button clicked, new todoId:', todoId);
        fetchTodo(todoId);
    });

    btnPrev.addEventListener('click', () => {
        todoId = todoId <= 1 ? maxTodos : todoId - 1;
        console.log('Previous button clicked, new todoId:', todoId);
        fetchTodo(todoId);
    });

    await fetchTodo(todoId);

    try {
        console.log('Fetching all posts...');
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) throw new Error('Ошибка загрузки постов');
        
        const data = await response.json();
        console.log('All posts received:', data.length, 'posts');
    } catch (error) {
        console.error('Error fetching posts:', error);
    }
});
