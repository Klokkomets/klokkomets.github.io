// Данные товаров
const products = [
    {
        id: 1,
        name: "Греческие мифы",
        description: "Боги Олимпа, герои и эпические сказания Древней Греции.",
        price: 1499,
        category: "books",
        image: "img/W_G.jpg",
        badge: "Бестселлер"
    },
    {
        id: 2,
        name: "Скандинавские мифы",
        description: "Мир богов, героев и чудовищ, где в тени Иггдрасиля плетутся нити судьбы.",
        price: 1499,
        category: "books",
        image: "img/W_V.webp",
        badge: "Новинка"
    },
    {
        id: 3,
        name: "Египетские мифы",
        description: "Боги Нила, фараоны и загробная жизнь Древнего Египта.",
        price: 1499,
        category: "books",
        image: "img/W_E.jpg"
    },
    {
        id: 4,
        name: "Славянские мифы",
        description: "Мир древних преданий, где в шелесте лесов и журчании рек звучат голоса богов и духов.",
        price: 1499,
        category: "books",
        image: "img/W_S.jpg",
        badge: "Хит продаж"
    },
    {
        id: 5,
        name: "Японские мифы",
        description: "Аматэрасу, Цукуёми, Сусаноо, неотразимая Нагицунэ и множество таинсвеных Ёкаев.",
        price: 1499,
        category: "books",
        image: "img/W_J.jpg"
    },
    {
        id: 6,
        name: "Мифы Китая",
        description: "Небесные боги, мудрые драконы и герои‑полубоги творящие судьбу мира.",
        price: 1499,
        category: "books",
        image: "img/W_C.jpg"
    },
    {
        id: 7,
        name: "Ожерелье с глазом Гора",
        description: "Золотое ожерелье с символом Уаджет - глазом бога Гора..",
        price: 25599,
        category: "jewelry",
        image: "img/W_Glaz_gora.webp",
        badge: "Новинка"
    },
    {
        id: 8,
        name: "Статуэтка Анубиса",
        description: "Сборник самых известных мифов и легенд Древнего Египта.",
        price: 7299,
        category: "figurines", // art
        image: "img/W_Anybis_S.webp"
    }
];

// Корзина
let cart = [];

// DOM элементы
const productsContainer = document.getElementById('products-container');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const emptyCartMessage = document.getElementById('empty-cart-message');
const checkoutBtn = document.getElementById('checkout-btn');
const searchInput = document.getElementById('search-input');
const categoryButtons = document.querySelectorAll('.category-btn');
const cartIcon = document.getElementById('cart-icon');
const cartCount = document.getElementById('cart-count');
const cartCountBig = document.getElementById('cart-count-big');

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', function () {
    displayProducts(products);
    updateCart();

    // Обработчики событий для фильтрации
    searchInput.addEventListener('input', filterProducts);

    categoryButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Убираем активный класс у всех кнопок
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Добавляем активный класс текущей кнопке
            this.classList.add('active');
            filterProducts();
        });
    });

    // Обработчик для кнопки оформления заказа
    checkoutBtn.addEventListener('click', function () {
        if (cart.length > 0) {
            alert('Спасибо за заказ! Общая сумма: ' + getCartTotal() + ' руб.');
            cart = [];
            updateCart();
        } else {
            alert('Ваша корзина пуста!');
        }
    });

    // Плавная прокрутка к корзине
    cartIcon.addEventListener('click', function () {
        document.getElementById('cart').scrollIntoView({ behavior: 'smooth' });
    });
});

// Отображение товаров
function displayProducts(productsToDisplay) {
    productsContainer.innerHTML = '';

    if (productsToDisplay.length === 0) {
        productsContainer.innerHTML = '<p style="grid-column: 1 / -1; text-align: center; padding: 2rem;">Товары не найдены</p>';
        return;
    }

    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        productCard.innerHTML = `
                    <div class="product-image">
                        <img src="${product.image}" alt="${product.name}">
                        ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ''}
                    </div>
                    <div class="product-info">
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-description">${product.description}</p>
                        <div class="product-price">${product.price} руб.</div>
                        <button class="add-to-cart" data-id="${product.id}">
                            <i class="fas fa-cart-plus"></i> Добавить в корзину
                        </button>
                    </div>
                `;

        productsContainer.appendChild(productCard);
    });

    // Добавляем обработчики событий для кнопок "Добавить в корзину"
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
}

// Фильтрация товаров
function filterProducts() {
    const searchTerm = searchInput.value.toLowerCase();
    const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');

    const filteredProducts = products.filter(product => {
        const matchesSearch = product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm);
        const matchesCategory = activeCategory === 'all' || product.category === activeCategory;

        return matchesSearch && matchesCategory;
    });

    displayProducts(filteredProducts);
}

// Добавление товара в корзину
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (product) {
        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        updateCart();
        showNotification(`${product.name} добавлен в корзину!`);

        // Анимация иконки корзины
        cartIcon.classList.add('pulse');
        setTimeout(() => {
            cartIcon.classList.remove('pulse');
        }, 500);
    }
}

// Удаление товара из корзины
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

// Изменение количества товара в корзине
function updateQuantity(productId, newQuantity) {
    if (newQuantity < 1) {
        removeFromCart(productId);
        return;
    }

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity = newQuantity;
        updateCart();
    }
}

// Обновление отображения корзины
function updateCart() {
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        emptyCartMessage.style.display = 'block';
        cartTotalElement.textContent = 'Итого: 0 руб.';
        cartCount.textContent = '0';
        cartCountBig.textContent = '0';
        return;
    }

    emptyCartMessage.style.display = 'none';

    cart.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.className = 'cart-item';

        cartItemElement.innerHTML = `
                    <div class="cart-item-info">
                        <div class="cart-item-image">
                            <img src="${item.image}" alt="${item.name}">
                        </div>
                        <div class="cart-item-details">
                            <h4>${item.name}</h4>
                            <div class="cart-item-price">${item.price} руб.</div>
                        </div>
                    </div>
                    <div class="cart-item-controls">
                        <div class="cart-item-quantity">
                            <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="quantity-btn increase" data-id="${item.id}">+</button>
                        </div>
                        <button class="remove-item" data-id="${item.id}">Удалить</button>
                    </div>
                `;

        cartItemsContainer.appendChild(cartItemElement);
    });

    // Добавляем обработчики событий для кнопок в корзине
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                updateQuantity(productId, cartItem.quantity - 1);
            }
        });
    });

    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            const cartItem = cart.find(item => item.id === productId);
            if (cartItem) {
                updateQuantity(productId, cartItem.quantity + 1);
            }
        });
    });

    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', function () {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromCart(productId);
        });
    });

    // Обновляем общую сумму и счетчик
    const total = getCartTotal();
    cartTotalElement.textContent = `Итого: ${total} руб.`;

    const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
    cartCount.textContent = itemCount;
    cartCountBig.textContent = itemCount;
}

// Получение общей суммы корзины
function getCartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Показать уведомление
function showNotification(message) {
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.bottom = '20px';
    notification.style.right = '20px';
    notification.style.backgroundColor = 'var(--secondary)';
    notification.style.color = 'white';
    notification.style.padding = '1rem 1.5rem';
    notification.style.borderRadius = '8px';
    notification.style.zIndex = '1000';
    notification.style.boxShadow = '0 4px 12px rgba(0,0,0,0.2)';
    notification.style.fontWeight = '500';

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transition = 'opacity 0.5s';
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}