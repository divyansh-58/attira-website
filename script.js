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
  btn.addEventListener('click', () => {
    categoryButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.category;
    productCards.forEach(card => {
      card.style.display = (cat === 'all' || card.dataset.category === cat) ? 'block' : 'none';
    });
  });
});

// Cart system
let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartItemsDiv = document.getElementById('cart-items');
const addCartBtns = document.querySelectorAll('.add-cart');

function updateCart() {
  if (!cartItemsDiv) return;
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }
  let html = '';
  let total = 0;
  cart.forEach((item, index) => {
    total += item.price;
    html += `<div class="cart-item">${item.name} - ₹${item.price} 
               <button class="remove-btn" data-index="${index}">X</button>
             </div>`;
  });
  html += `<p><strong>Total: ₹${total}</strong></p><button id="checkout-btn">Checkout</button>`;
  cartItemsDiv.innerHTML = html;

  document.querySelectorAll('.remove-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      cart.splice(btn.dataset.index, 1);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
    });
  });

  document.getElementById('checkout-btn').addEventListener('click', () => {
    alert('Checkout successful! Total: ₹' + total);
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(...cart);
    localStorage.setItem('orders', JSON.stringify(orders));
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
  });
}
if (addCartBtns) {
  addCartBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.product-card');
      const name = card.querySelector('h3').innerText;
      const price = parseInt(card.querySelector('p').innerText.replace(/[^0-9]/g, ''));
      cart.push({ name, price });
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCart();
    });
  });
}
updateCart();

// Account system
const loginBtn = document.getElementById('login-btn');
const signupBtn = document.getElementById('signup-btn');
if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    document.getElementById('login-form').style.display = 'none';
    document.getElementById('login-success').style.display = 'block';
    showOrders();
  });
}
if (signupBtn) {
  signupBtn.addEventListener('click', () => {
    alert('Signup successful! You can now log in.');
  });
}
function showOrders() {
  const ordersDiv = document.getElementById('orders');
  const orderList = document.getElementById('order-list');
  if (!ordersDiv || !orderList) return;
  ordersDiv.style.display = 'block';
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orderList.innerHTML = '';
  orders.forEach(o => {
    orderList.innerHTML += `<li>${o.name} - ₹${o.price}</li>`;
  });
}

// Search functionality
const searchBar = document.getElementById('search-bar');
if (searchBar) {
  searchBar.addEventListener('input', () => {
    const term = searchBar.value.toLowerCase();
    productCards.forEach(card => {
      const name = card.querySelector('h3').innerText.toLowerCase();
      card.style.display = name.includes(term) ? 'block' : 'none';
    });
  });
}
