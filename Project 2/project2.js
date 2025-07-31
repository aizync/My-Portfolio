document.addEventListener('DOMContentLoaded', function() {
    // Initialize cart
    let cart = [];
    let cartTotal = 0;

    // Dark mode toggle
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

    // Search/filter functionality
    function initSearch() {
        const searchInput = document.getElementById('menu-search');
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const menuItems = document.querySelectorAll('.item');
            
            menuItems.forEach(item => {
                const text = item.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // Cart functionality
    function initCart() {
        const addButtons = document.querySelectorAll('.add-to-cart');
        
        addButtons.forEach(button => {
            button.addEventListener('click', () => {
                const item = button.closest('.item');
                const itemName = item.querySelector('h3').textContent;
                const itemPrice = parseFloat(item.querySelector('.price').textContent.replace('Rs. ', ''));
                
                cart.push({ name: itemName, price: itemPrice });
                cartTotal += itemPrice;
                
                updateCartDisplay();
                showNotification(`${itemName} added to cart!`);
            });
        });
    }

    function updateCartDisplay() {
        const cartCount = document.getElementById('cart-count');
        const cartTotalElement = document.getElementById('cart-total');
        
        cartCount.textContent = cart.length;
        cartTotalElement.textContent = `Rs. ${cartTotal}`;
    }

    // Reservation form validation
    function initReservationForm() {
        const form = document.getElementById('reservation-form');
        
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const name = document.getElementById('name').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;
            
            if (!name || !date || !time || !guests) {
                showNotification('Please fill in all fields', 'error');
                return;
            }
            
            showNotification('Reservation submitted successfully!', 'success');
            form.reset();
        });
    }

    // Notification system
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
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

    // Animate menu items on scroll
    function initScrollAnimation() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.item').forEach(item => {
            item.classList.add('animate-on-scroll');
            observer.observe(item);
        });
    }

    // Initialize all features
    initDarkMode();
    initSearch();
    initCart();
    initReservationForm();
    initScrollAnimation();
});
