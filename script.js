const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

let cartItems = sessionStorage.getItem("cartItems")
  ? JSON.parse(sessionStorage.getItem("cartItems"))
  : [];

// DOM elements
const productList = document.getElementById("product-list");
const clearCartBtn = document.getElementById("clear-cart-btn");
const cartList = document.getElementById("cart-list");
const addToCartBtn = document.querySelectorAll(".add-to-cart-btn");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}" onclick="addToCart(${product.id})">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";
  cartItems.map((item) => {
    cartList.innerHTML += `<li>${item.name} - $${item.price}<button class="add-to-cart-btn" data-id="${item.id}" onclick="removeFromCart(${item.id})">Remove from Cart</button></li>`;
  });
}

// Add item to cart
function addToCart(productId) {
  let item = products.find((product) => product.id === productId);
  if (item) {
    cartItems.push(item);
    sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
    cartItems = cartItems.filter((item) => item.id !== parseInt(productId));
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCart();
}

// Clear cart
function clearCart() {
  cartItems = [];
  sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
  renderCart();
}

clearCartBtn.addEventListener("click", () => {
  clearCart();
});

// Initial render
renderProducts();
renderCart();