const productsContainer = document.getElementById('products-container');
const searchInput = document.getElementById('search');
const themeBtn = document.getElementById('theme-btn');
const cartCounter = document.getElementById('cart-counter');

let products = [];
let cart = [];

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        productsContainer.innerHTML = '<p>Failed to load products. Please try again later.</p>';
    }
}

function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = '';
    
    if (productsToDisplay.length === 0) {
        productsContainer.innerHTML = '<p>No products found.</p>';
        return;
    }
    
    productsToDisplay.forEach(product => {
        const productEl = document.createElement('div');
        productEl.className = 'product';
        productEl.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <div class="product-info">
                <h3 class="product-title">${product.title}</h3>
                <p class="product-price">$${product.price}</p>
                <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        productsContainer.appendChild(productEl);
    });
}

function handleSearch() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm)
    );
    displayProducts(filteredProducts);
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCounter();
        alert(`${product.title} added to cart!`);
    }
}

function updateCartCounter() {
    cartCounter.textContent = `Cart: ${cart.length}`;
}

function toggleTheme() {
    document.body.classList.toggle('dark');
    themeBtn.textContent = document.body.classList.contains('dark') 
        ? 'Light Mode' 
        : 'Dark Mode';
}

function setupEventListeners() {
    searchInput.addEventListener('input', handleSearch);
    
    themeBtn.addEventListener('click', toggleTheme);
    
    productsContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.dataset.id);
            addToCart(productId);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
    setupEventListeners();
});