const cartItemsContainer = document.querySelector("#cart-items");
const cartCount = document.querySelector("#cart-count");
const cartTotal = document.querySelector("#cart-total");
const cartEmpty = document.querySelector("#cart-empty");
const loader = document.querySelector("#loader");
const cartError = document.querySelector("#cart-error");
const checkoutButton = document.querySelector("#checkout-button"); // Place order button

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function renderCart() {
  showLoader();
  try {
    const cart = getCart();
    cartItemsContainer.replaceChildren();

    if (cart.length === 0) {
      cartEmpty.hidden = false;
      cartCount.textContent = "0";
      cartTotal.textContent = "0";
      hideLoader();
      return;
    }

    cartEmpty.hidden = true;
    let total = 0;
    let count = 0;

    cart.forEach((item, index) => {
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";

      const img = document.createElement("img");
      img.src = item.image.url;
      img.alt = item.image.alt;
      img.className = "cart-item-image";

      const title = document.createElement("h3");
      title.textContent = item.title;

      const size = document.createElement("p");
      size.textContent = `Size: ${item.size}`;

      const price = document.createElement("p");
      price.textContent = `$${item.price}`;

      const removeBtn = document.createElement("active");
      removeBtn.textContent = "Remove";
      removeBtn.className = "remove-link";
      removeBtn.addEventListener("click", () => {
        removeFromCart(index);
      });

      itemDiv.append(img, title, size, price, removeBtn);
      cartItemsContainer.appendChild(itemDiv);

      total += item.price;
      count += 1;
    });

    cartCount.textContent = count;
    cartTotal.textContent = total.toFixed(2);
  } catch (err) {
    console.error("Error rendering cart", err);
  } finally {
    hideLoader();
  }
}


function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  renderCart();
}

function showLoader() {
  loader.style.display = "block";
}

function hideLoader() {
  loader.style.display = "none";
}
// clean cart 
checkoutButton.addEventListener("click", () => {
  localStorage.removeItem("cart");   
});


renderCart();