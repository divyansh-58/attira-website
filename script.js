// Menu toggle
const menuToggle = document.querySelector('.menu-toggle');
const navUL = document.querySelector('nav ul');
if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navUL.classList.toggle('show');
  });
}

// Product modal
const modal = document.getElementById('product-modal');
const modalTitle = document.getElementById('modal-title');
const modalDesc = document.getElementById('modal-desc');
const modalPrice = document.getElementById('modal-price');
const closeModal = document.getElementById('close-modal');

document.querySelectorAll('.product-card img').forEach(cardImg => {
  cardImg.addEventListener('click', () => {
    const card = cardImg.closest('.product-card');
    modalTitle.innerText = card.querySelector('h3').innerText;
    modalDesc.innerText = card.querySelector('p').innerText;
    modalPrice.innerText = card.querySelector('p').innerText.match(/₹[0-9,]+/)[0];
    modal.classList.add('show');
  });
});
if (closeModal) {
  closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
  });
}

// Category filtering
const categoryButtons = document.querySelectorAll('.category-btn');
const productCards = document.querySelectorAll('.product-card');
categoryButtons.forEach(btn => {
  btn.addEvent
