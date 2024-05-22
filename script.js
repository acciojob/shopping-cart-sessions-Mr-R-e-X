const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

let cart = sessionStorage.getItem("cart")
  ? JSON.parse(sessionStorage.getItem("cart"))
  : [];

// DOM elements
const productList = document.getElementById("product-list");
const clearCartBtn = document.getElementById("clear-cart-btn");
const cartList = document.getElementById("cart-list");

// Render product list
function renderProducts() {
  productList.innerHTML = ""; // Clear the product list before rendering
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}" onclick="addToCart(${product.id})">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = ""; // Clear the cart list before rendering
  cart.forEach((item) => {
    const li = document.createElement("li");
    li.innerHTML = `${item.name} - $${item.price} <button class="remove-from-cart-btn" data-id="${item.id}" onclick="removeFromCart(${item.id})">Remove from Cart</button>`;
    cartList.appendChild(li);
  });
}

// Add item to cart
function addToCart(productId) {
  const item = products.find((product) => product.id === parseInt(productId));
  if (item) {
    cart.push(item);
    sessionStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== parseInt(productId));
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

// Clear cart
function clearCart() {
  cart = [];
  sessionStorage.setItem("cart", JSON.stringify(cart));
  renderCart();
}

clearCartBtn.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
