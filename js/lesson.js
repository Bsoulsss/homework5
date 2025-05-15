// // PHONE CHECKER
//
// const phoneInput = document.querySelector('#phone_input')
// const phoneButton = document.querySelector('#phone_button')
// const phoneResult = document.querySelector('#phone_result')
//
// const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/
//
// phoneButton.onclick = () => {
//     if (regExp.test(phoneInput.value)) {
//         phoneResult.innerHTML = 'OK'
//         phoneResult.style.color = 'green'
//     } else {
//         phoneResult.innerHTML = 'NOT OK'
//         phoneResult.style.color = 'red'
//     }
// }
//
// document.addEventListener('DOMContentLoaded', () => {
//   const contentBlocks = document.querySelectorAll('.tab_content_block');
//   const tabButtons = document.querySelectorAll('.tab_content_item');
//   let currentIndex = 0;
//   let intervalId;
//
//   function activateTab(index) {
//     contentBlocks.forEach(block => block.classList.remove('tab_content_block_active'));
//     tabButtons.forEach(btn => btn.classList.remove('tab_content_item_active'));
//
//     contentBlocks[index].classList.add('tab_content_block_active');
//     tabButtons[index].classList.add('tab_content_item_active');
//   }
//
//
//   tabButtons.forEach((btn, idx) => {
//     btn.addEventListener('click', () => {
//       currentIndex = idx;
//       activateTab(currentIndex);
//       resetAutoSwitch();
//     });
//   });
//
//   function autoSwitch() {
//     currentIndex = (currentIndex + 1) % contentBlocks.length;
//     activateTab(currentIndex);
//   }
//
//   function resetAutoSwitch() {
//     clearInterval(intervalId);
//     intervalId = setInterval(autoSwitch, 3000);
//   }
//
//   activateTab(currentIndex);
//   resetAutoSwitch();
// });
//

// дз5

const somInput = document.querySelector('#som');
const usdInput = document.querySelector('#usd');
const eurInput = document.querySelector('#eur');

fetch('../data/CONVERTER.json')
  .then(response => response.json())
  .then(data => {
    const usdRate = data.usd;
    const eurRate = data.eur;

    let isTyping = false;

    somInput.addEventListener('input', () => {
      if (isTyping) return;
      isTyping = true;

      const som = parseFloat(somInput.value);
      if (!isNaN(som)) {
        usdInput.value = (som / usdRate).toFixed(2);
        eurInput.value = (som / eurRate).toFixed(2);
      } else {
        usdInput.value = '';
        eurInput.value = '';
      }

      isTyping = false;
    });

    usdInput.addEventListener('input', () => {
      if (isTyping) return;
      isTyping = true;

      const usd = parseFloat(usdInput.value);
      if (!isNaN(usd)) {
        const som = usd * usdRate;
        somInput.value = som.toFixed(2);
        eurInput.value = (som / eurRate).toFixed(2);
      } else {
        somInput.value = '';
        eurInput.value = '';
      }

      isTyping = false;
    });

    eurInput.addEventListener('input', () => {
      if (isTyping) return;
      isTyping = true;

      const eur = parseFloat(eurInput.value);
      if (!isNaN(eur)) {
        const som = eur * eurRate;
        somInput.value = som.toFixed(2);
        usdInput.value = (som / usdRate).toFixed(2);
      } else {
        somInput.value = '';
        usdInput.value = '';
      }

      isTyping = false;
    });
  })
  .catch(error => {
    console.error('Ошибка загрузки курсов валют:', error);
  });
