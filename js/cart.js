class Cart {
    constructor() {
        this.items = this.loadCart();
        this.updateCartDisplay();
    }

    // Load cart from localStorage
    loadCart() {
        const savedCart = localStorage.getItem('mythopediaCart');
        return savedCart ? JSON.parse(savedCart) : [];
    }

    // Save cart to localStorage
    saveCart() {
        localStorage.setItem('mythopediaCart', JSON.stringify(this.items));
    }

    // Add item to cart
    addItem(productId) {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        const existingItem = this.items.find(item => item.id === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            this.items.push({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                mythology: product.mythology,
                quantity: 1
            });
        }

        this.saveCart();
        this.updateCartDisplay();
        this.showNotification('Товар добавлен в корзину!');
    }

    // Remove item from cart
    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveCart();
        this.updateCartDisplay();
    }

    // Update item quantity
    updateQuantity(productId, newQuantity) {
        if (newQuantity < 1) {
            this.removeItem(productId);
            return;
        }

        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = newQuantity;
            this.saveCart();
            this.updateCartDisplay();
        }
    }

    // Clear cart
    clearCart() {
        this.items = [];
        this.saveCart();
        this.updateCartDisplay();
        this.showNotification('Корзина очищена');
    }

    // Calculate total price
    getTotalPrice() {
        return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
    }

    // Get total items count
    getTotalItems() {
        return this.items.reduce((total, item) => total + item.quantity, 0);
    }

    // Update cart display
    updateCartDisplay() {
        const cartCount = document.querySelector('.cart-count');
        const cartItems = document.getElementById('cartItems');
        const cartTotal = document.getElementById('cartTotal');

        // Update cart count
        cartCount.textContent = this.getTotalItems();

        // Update cart items
        cartItems.innerHTML = '';
        
        if (this.items.length === 0) {
            cartItems.innerHTML = '<p>Корзина пуста</p>';
        } else {
            this.items.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-info">
                        <h4>${item.name}</h4>
                        <div class="cart-item-price">${item.price} руб. × ${item.quantity}</div>
                    </div>
                    <div class="cart-item-controls">
                        <div class="cart-item-quantity">
                            <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        </div>
                        <button class="remove-btn" onclick="cart.removeItem(${item.id})">Удалить</button>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });
        }

        // Update total
        cartTotal.textContent = this.getTotalPrice();
    }

    // Show notification
    showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: #27ae60;
            color: white;
            padding: 1rem 2rem;
            border-radius: 5px;
            z-index: 3000;
            animation: slideIn 0.3s ease;
        `;
        notification.textContent = message;

        document.body.appendChild(notification);

        // Remove after 3 seconds
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }

    // Checkout
    checkout() {
        if (this.items.length === 0) {
            alert('Корзина пуста!');
            return;
        }

        const total = this.getTotalPrice();
        if (confirm(`Оформить заказ на сумму ${total} руб.?`)) {
            alert('Заказ успешно оформлен! Спасибо за покупку!');
            this.clearCart();
            this.closeCart();
        }
    }

    // Open cart modal
    openCart() {
        document.getElementById('cartModal').style.display = 'block';
    }

    // Close cart modal
    closeCart() {
        document.getElementById('cartModal').style.display = 'none';
    }
}

// Initialize cart
const cart = new Cart();

// Global functions for HTML onclick events
function addToCart(productId) {
    cart.addItem(productId);
}

function openCart() {
    cart.openCart();
}

function closeCart() {
    cart.closeCart();
}

function checkout() {
    cart.checkout();
}

function clearCart() {
    if (confirm('Очистить корзину?')) {
        cart.clearCart();
    }
}