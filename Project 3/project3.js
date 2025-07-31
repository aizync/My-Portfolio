document.addEventListener('DOMContentLoaded', function () {
    // Product data
    const products = [
        { id: 1, name: "iPhone 13 Pro Max", price: 299999, category: "phones", image: "images/product1.jpg" },
        { id: 2, name: "Apple Buds Pro 2", price: 49999, category: "earphones", image: "images/product2.jpg" },
        { id: 3, name: "Apple Buds 1", price: 39999, category: "earphones", image: "images/product3.jpg" },
        { id: 4, name: "Xiaomi Headphones Pro", price: 19999, category: "earphones", image: "images/product4.jpg" },
        { id: 5, name: "Apple Watch 2", price: 89999, category: "watches", image: "images/product5.jpg" },
        { id: 6, name: "Mi Power Bank", price: 4999, category: "powerbanks", image: "images/product6.jpg" },
        { id: 7, name: "Samsung Galaxy S23", price: 249999, category: "phones", image: "images/samsung-galaxy-s23-new.jpg" },
        { id: 8, name: "Google Pixel 7", price: 189999, category: "phones", image: "images/pixel-phone.jpg" },
        { id: 9, name: "Sony WH-1000XM5", price: 79999, category: "earphones", image: "images/headphones-sony.jpg" },
        { id: 10, name: "Apple Watch Series 8", price: 69999, category: "watches", image: "images/apple-watch.jpg" },
        { id: 11, name: "Fitbit Versa 4", price: 45999, category: "watches", image: "images/fitness-watch.jpg" },
        { id: 12, name: "Anker Wireless Charger", price: 8999, category: "powerbanks", image: "images/wireless-charger.jpg" }
    ];

    let cart = [];
    let cartTotal = 0;

    // Initialize dark mode
    function initDarkMode() {
        const darkModeToggle = document.createElement('div');
        darkModeToggle.innerHTML = `
            <div id="dark-mode-toggle">
                <i class="fas fa-moon"></i>
            </div>
        `;
        document.body.insertBefore(darkModeToggle, document.body.firstChild);

        const toggle = document.getElementById('dark-mode-toggle');
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const icon = toggle.querySelector('i');
            icon.classList.toggle('fa-moon');
            icon.classList.toggle('fa-sun');
        });
    }

    // Initialize search functionality
    function initSearch() {
        const searchInput = document.getElementById('search-products');
        searchInput.addEventListener('input', filterProducts);
    }

    // Initialize category filtering
    function initCategoryFilters() {
        const categoryButtons = document.querySelectorAll('.category-btn');

        categoryButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons
                categoryButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                button.classList.add('active');

                const selectedCategory = button.dataset.category;
                filterProductsByCategory(selectedCategory);
            });
        });
    }

    // Filter products by category
    function filterProductsByCategory(category) {
        const searchTerm = document.getElementById('search-products').value.toLowerCase();

        document.querySelectorAll('.product-card').forEach(product => {
            const productName = product.querySelector('h3').textContent.toLowerCase();
            const productCategory = product.dataset.category;

            const matchesSearch = productName.includes(searchTerm);
            const matchesCategory = category === 'all' || productCategory === category;

            if (matchesSearch && matchesCategory) {
                product.style.display = 'block';
                product.classList.add('animate-in');
            } else {
                product.style.display = 'none';
                product.classList.remove('animate-in');
            }
        });

        // Update category counts
        updateCategoryCounts();
    }

    // Update category counts
    function updateCategoryCounts() {
        const categories = ['all', 'phones', 'earphones', 'watches', 'powerbanks'];

        categories.forEach(category => {
            const countElement = document.getElementById(`count-${category}`);
            if (countElement) {
                if (category === 'all') {
                    countElement.textContent = products.length;
                } else {
                    const count = products.filter(product => product.category === category).length;
                    countElement.textContent = count;
                }
            }
        });
    }

    // Filter products based on search
    function filterProducts() {
        const activeButton = document.querySelector('.category-btn.active');
        const selectedCategory = activeButton ? activeButton.dataset.category : 'all';
        filterProductsByCategory(selectedCategory);
    }

    // Cart functionality
    function initCart() {
        const addToCartButtons = document.querySelectorAll('.add-to-cart');

        addToCartButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productCard = button.closest('.product-card');
                const productId = parseInt(productCard.dataset.id);
                const product = products.find(p => p.id === productId);

                cart.push(product);
                cartTotal += product.price;
                updateCartDisplay();
                showNotification(`${product.name} added to cart!`);
            });
        });
    }

    function updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        const cartTotalElement = document.getElementById('cart-total');

        cartCount.textContent = cart.length;
        cartTotalElement.textContent = `Rs. ${cartTotal.toLocaleString()}`;
    }

    // Product modal
    function initProductModals() {
        const productCards = document.querySelectorAll('.product-card');

        productCards.forEach(card => {
            card.addEventListener('click', (e) => {
                if (!e.target.classList.contains('add-to-cart')) {
                    const productId = parseInt(card.dataset.id);
                    const product = products.find(p => p.id === productId);
                    showProductModal(product);
                }
            });
        });
    }

    function showProductModal(product) {
        const modal = document.createElement('div');
        modal.className = 'product-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <span class="close-modal">&times;</span>
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p class="price">Rs. ${product.price.toLocaleString()}</p>
                <p class="description">Experience the latest in technology with this amazing product. 
                   Features high-quality build and excellent performance.</p>
                <button class="add-to-cart-modal">Add to Cart</button>
            </div>
        `;

        document.body.appendChild(modal);
        setTimeout(() => modal.classList.add('show'), 10);

        const closeBtn = modal.querySelector('.close-modal');
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        });

        const addToCartBtn = modal.querySelector('.add-to-cart-modal');
        addToCartBtn.addEventListener('click', () => {
            cart.push(product);
            cartTotal += product.price;
            updateCartDisplay();
            showNotification(`${product.name} added to cart!`);
        });
    }

    // Notification system
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.classList.add('show');
            setTimeout(() => {
                notification.classList.remove('show');
                setTimeout(() => {
                    notification.remove();
                }, 300);
            }, 2000);
        }, 100);
    }

    // Initialize everything
    initDarkMode();
    initSearch();
    initCategoryFilters();
    initCart();
    initProductModals();
    updateCategoryCounts();
});
