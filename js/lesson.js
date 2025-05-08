// PHONE CHECKER

const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')

const regExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/

phoneButton.onclick = () => {
    if (regExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color = 'red'
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

