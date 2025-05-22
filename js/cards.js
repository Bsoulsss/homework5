const cardsGrid = document.getElementById('cardsGrid');

// Функция для создания карточки
function createCard(title, body) {
    console.log('Creating card with title:', title);
    const card = document.createElement('div');
    card.className = 'card';
    
    card.innerHTML = `
        <img src="https://picsum.photos/300/200" alt="Random image" class="card-image">
        <h3 class="card-title">${title}</h3>
        <p class="card-description">${body}</p>
    `;
    
    return card;
}

// Функция для отображения состояния загрузки
function showLoading() {
    console.log('Showing loading state...');
    cardsGrid.innerHTML = '<div class="loading">Loading...</div>';
}

// Функция для отображения ошибки
function showError(message) {
    console.error('Error occurred:', message);
    cardsGrid.innerHTML = `<div class="error">Error: ${message}</div>`;
}

async function fetchCards() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.slice(0, 5); // Get only first 5 cards
    } catch (error) {
        console.error('Error fetching cards:', error);
        return [];
    }
}

async function displayCards() {
    try {
        const cards = await fetchCards();
        const container = document.getElementById('cards-container');
        
        cards.forEach(card => {
            const cardElement = document.createElement('div');
            cardElement.className = 'card';
            cardElement.innerHTML = `
                <img src="https://picsum.photos/300/200" alt="Card image">
                <h3>${card.title}</h3>
                <p>${card.body}</p>
            `;
            container.appendChild(cardElement);
        });
    } catch (error) {
        console.error('Error displaying cards:', error);
    }
}

// Запускаем функцию при загрузке страницы
document.addEventListener('DOMContentLoaded', displayCards); 