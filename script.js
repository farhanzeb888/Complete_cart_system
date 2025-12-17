// DOM ELEMENTS
const basketCart = document.getElementById("basket");
const basketItems = document.getElementById("basketItems");
const overlay = document.getElementById("overlay");
const closeCart = document.getElementById("closeCart");
const addToCartBtns = document.querySelectorAll(".add-to-cart");
const cartCount = document.querySelector(".cart-count");
const cartContent = document.getElementById("cartContent");
const cartTotal = document.getElementById("cartTotal");
const checkoutBtn = document.getElementById('checkoutBtn');

let cart = [];

// OPEN CART
basketCart.onclick = function () {
  basketItems.classList.add("showcart");
  overlay.classList.add("active");
};

// CLOSE CART
closeCart.onclick = function () {
  basketItems.classList.remove("showcart");
  overlay.classList.remove("active");
};

// CLICK ON OVERLAY TO CLOSE CART
overlay.onclick = function () {
  basketItems.classList.remove("showcart");
  overlay.classList.remove("active");
};

// ADD TO CART
addToCartBtns.forEach((button) => {
  button.onclick = function () {
    const name = this.dataset.name;
    const price = parseFloat(this.dataset.price);
    const img = this.dataset.img;

    const itemExist = cart.some((item) => item.name === name);
    if (itemExist) {
      this.textContent = "Already in cart";
      this.style.background = "red";
      setTimeout(() => {
        this.textContent = "Add To Cart";
        this.style.background = "";
      }, 1000);
      return;
    }

    cart.push({ name, price, img, id: Date.now(), qty: 1 });
    updateCart();

    this.textContent = "Added!";
    setTimeout(() => {
      this.textContent = "Add To Cart";
    }, 1000);
  };
});

// UPDATE CART
function updateCart() {
  cartCount.textContent = cart.length;

  if (cart.length === 0) {
    cartContent.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <p>Your cart is empty</p>
      </div>`;
    cartTotal.textContent = `$0.00`;
    return;
  }

  cartContent.innerHTML = cart
    .map(
      (item) => `
    <div class="cart-item" data-id="${item.id}">
      <div class="cart-img">
        <img src="${item.img}">
      </div>
      <div class="item-details">
        <div class="item-name">${item.name}</div>
        <div class="item-price">$${(item.price * item.qty).toFixed(2)}</div>
      </div>
      <div class="input">
        <span class="decrease-btn">➖</span>
        <input type="number" class="count-label" value="${item.qty}" min="1">
        <span class="increase-btn">➕</span>
      </div>
      <button class="remove-item">Remove</button>
    </div>`
    )
    .join("");

  // ADD EVENTS FOR INCREASE / DECREASE / REMOVE
  cartContent.querySelectorAll(".increase-btn").forEach((btn) => {
    btn.onclick = function () {
      const parent = this.closest(".cart-item");
      const id = Number(parent.dataset.id);
      const item = cart.find((i) => i.id === id);
      item.qty++;
      updateCart();
    };
  });

 cartContent.querySelectorAll(".decrease-btn").forEach((btn) => {
  btn.onclick = function () {
    const parent = this.closest(".cart-item");
    const id = Number(parent.dataset.id);
    const item = cart.find((i) => i.id === id);

    item.qty--;

    if (item.qty <= 0) {
      removeItem(id); // auto remove when qty becomes 0
      return;
    }

    updateCart();
  };
});

  cartContent.querySelectorAll(".count-label").forEach((input) => {
    input.onchange = function () {
      const parent = this.closest(".cart-item");
      const id = Number(parent.dataset.id);
      const item = cart.find((i) => i.id === id);
      item.qty = Number(this.value) > 0 ? Number(this.value) : 1;
      updateCart();
    };
  });

  cartContent.querySelectorAll(".remove-item").forEach((btn) => {
    btn.onclick = function () {
      const parent = this.closest(".cart-item");
      const id = Number(parent.dataset.id);
      removeItem(id);
    };
  });

  // UPDATE CART TOTAL
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartTotal.textContent = `$${total.toFixed(2)}`;
}

// REMOVE ITEM
function removeItem(id) {
  cart = cart.filter((item) => item.id !== id);
  updateCart();
}
checkoutBtn.addEventListener('click' , ()=>{
  alert('Order in process ');
})
updateCart();
