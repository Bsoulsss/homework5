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
