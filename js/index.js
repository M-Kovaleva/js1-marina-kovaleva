
const container = document.querySelector("#container")
const loader = document.querySelector("#loader")
const form = document.querySelector("#filters-form")
const resetBtn = document.querySelector("#filters-reset")
const errorContainer = document.querySelector("#products-error")
const API_URL = "https://v2.api.noroff.dev/rainy-days"


let allProducts = []

async function fetchAndCreateProducts() {
  showLoader()
  try{
    const responce = await fetch(API_URL)
    const data = await responce.json()
    //await new Promise(res => setTimeout(res, 2000)) // Check loader
    allProducts = data.data

    renderProducts(allProducts)
  } catch (error) {
    errorContainer.textContent = "Failed to load items. Try again later."
    errorContainer.hidden = false;
    } 
    finally {
    hideLoader()
    }
}

function renderProducts(products) {
  container.innerHTML = ""
  
  products.forEach(product =>{
    const card = document.createElement("div")
    const image = document.createElement("img")
    const content = document.createElement("div")
    const title = document.createElement("h2")
    const price = document.createElement("p")
    const anchor = document.createElement("a")
    

    card.className = 'card'
    image.className = 'card-image'
    content.className = 'card-content"'
    title.className = 'card-title'
    price.className = 'card-price'

    image.src = product.image.url
    image.alt = product.image.alt
    title.textContent = product.title
    price.textContent = product.price
    
    //Sale
    if (product.onSale) {
      price.innerHTML = `<span class="old-price">$${product.price}</span> $${product.discountedPrice}`;
    } 
    else {
      price.textContent = `$${product.price}`;
    }


      anchor.href = `product.html?id=${product.id}`
    

      content.appendChild(title)
      content.appendChild(price)
      card.appendChild(image)
      card.appendChild(content)
      anchor.appendChild(card)


      container.appendChild(anchor)
    })
  }    
    

//Filter
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const gender = document.querySelector("#filter-gender").value;
  const filteredProducts = allProducts.filter(
    (item) => !gender || item.gender === gender
  );

  renderProducts(filteredProducts);
});


resetBtn.addEventListener("click", () => {
  renderProducts(allProducts);
});

//Loader
function showLoader() {
  loader.style.display = "block";
  container.style.display = "none";
}

function hideLoader() {
  loader.style.display = "none";
  container.style.display = "grid";
}

//Scroll
const catalogBtn = document.querySelector(".cta-button");
const productsSection = document.querySelector("#products");

if (productsSection) {
  catalogBtn.addEventListener("click", () => {
    productsSection.scrollIntoView({ behavior: "smooth" });
  });
}

fetchAndCreateProducts()


