// Main application
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initApp();
});

function initApp() {
    // Display all products initially
    displayProducts();
    
    // Initialize filter buttons
    initFilters();
    
    // Initialize cart event listeners
    initCartEvents();
    
    // Add smooth scrolling
    initSmoothScroll();
}

function initCartEvents() {
    // Cart button
    document.getElementById('cartBtn').addEventListener('click', openCart);
    
    // Close cart button
    document.getElementById('closeCart').addEventListener('click', closeCart);
    
    // Checkout button
    document.getElementById('checkoutBtn').addEventListener('click', checkout);
    
    // Clear cart button
    document.getElementById('clearCartBtn').addEventListener('click', clearCart);
    
    // Close cart when clicking outside
    document.getElementById('cartModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeCart();
        }
    });
}

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function scrollToProducts() {
    const productsSection = document.getElementById('products');
    const headerHeight = document.querySelector('.header').offsetHeight;
    const targetPosition = productsSection.offsetTop - headerHeight;
    
    window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
    });
}

// Add some animations
function addAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe product cards
    document.querySelectorAll('.product-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', addAnimations);