const container = document.querySelector("#product-container")
const loader = document.querySelector("#loader")
const errorContainer = document.querySelector("#products-error")
const API_URL = "https://v2.api.noroff.dev/rainy-days"

async function fetchAndCreateProducts() {
    showLoader()
    try {
        const params = new URLSearchParams(window.location.search)
        const id = params.get("id")

        if (!id) {
            errorContainer.textContent = "No product ID provided!"
            errorContainer.hidden = false
            container.innerHTML = ""
            return
        }
        
        const responce = await fetch(`${API_URL}/${id}`)
        const data = await responce.json()

        /*await new Promise(res => setTimeout(res, 2000)) /* check loader*/

        const product = data.data

        const productDiv = document.createElement("div")
        const image = document.createElement("img")
        const title = document.createElement("h2")
        const price = document.createElement("p")
        const description = document.createElement("p")
        const form = document.createElement("form")
        const sizeLabel = document.createElement("label")
        const sizeSelect = document.createElement("select")
        const addButton = document.createElement("button")

        productDiv.className = 'product-details'
        image.className = 'product-image'
        title.className = 'product-title'
        price.className = 'product-price'
        description.className = 'product-description'
        form.className = 'product-form'
        sizeLabel.textContent = 'Size: '
        addButton.className = 'cta-button'

        image.src = product.image.url
        image.alt = product.image.alt
        title.textContent = product.title

        price.textContent = `$${product.price}`
        if (product.onSale) {
            price.innerHTML = `<span class="old-price">$${product.price}</span> $${product.discountedPrice}`;
        } else {
            price.textContent = `$${product.price}`
        }

        description.textContent = product.description

        sizeSelect.name = "size";
        product.sizes.forEach(size => {
            const option = document.createElement("option")
            option.value = size
            option.textContent = size
            sizeSelect.appendChild(option)
        })

        addButton.type = "submit";
        addButton.textContent = "Add to cart"

        form.addEventListener("submit", (e) => {
            e.preventDefault()
            const selectedSize = sizeSelect.value
            addToCart(product, selectedSize)
            alert( `1 x ${product.title} (Size: ${selectedSize}) added to cart`)
        })
      
        sizeLabel.appendChild(sizeSelect)
        form.appendChild(sizeLabel);
        form.appendChild(addButton)

        productDiv.appendChild(image)
        productDiv.appendChild(title)
        productDiv.appendChild(price)
        productDiv.appendChild(description)
        productDiv.appendChild(form)

        container.appendChild(productDiv)

    } catch (error) {
        console.error("Failed to fetch product", error)
        errorContainer.textContent = "Failed to load product. Try again later."
        errorContainer.hidden = false
        container.innerHTML = ""
    } finally {
    hideLoader()
  }
  
}
function addToCart(product, size) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push({
    id: product.id,
    title: product.title,
    size: size,
    price: product.onSale ? product.discountedPrice : product.price,
    image: product.image
  });
  localStorage.setItem("cart", JSON.stringify(cart));
}
function showLoader() {
  loader.style.display = "block";
  container.style.display = "none";
}

function hideLoader() {
  loader.style.display = "none";
  container.style.display = "grid";
}

fetchAndCreateProducts()