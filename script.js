document.addEventListener('DOMContentLoaded', () => {
    
    // 1. SELECT ELEMENTS
    const cartButtons = document.querySelectorAll('.add-to-cart-btn');
    const cartIcon = document.getElementById('cart-icon');
    const cartCount = document.getElementById('cart-count');
    const modal = document.getElementById('cart-modal');
    const modalMessage = document.getElementById('modal-message');
    const closeModalBtn = document.getElementById('close-modal-btn'); // This selects the OK button

    // 2. ANIMATION FUNCTION (Fly to Cart)
    const animateFlyToCart = (startBtn) => {
        if (!cartIcon) return;

        // Create the flying dot
        const flyer = document.createElement('div');
        flyer.style.position = 'fixed';
        flyer.style.width = '16px';
        flyer.style.height = '16px';
        flyer.style.backgroundColor = '#ea580c'; // Orange
        flyer.style.borderRadius = '50%';
        flyer.style.zIndex = '9999';
        flyer.style.pointerEvents = 'none'; 
        
        const start = startBtn.getBoundingClientRect();
        const end = cartIcon.getBoundingClientRect();
        
        flyer.style.left = (start.left + start.width / 2) + 'px';
        flyer.style.top = (start.top + start.height / 2) + 'px';
        
        document.body.appendChild(flyer);
        
        const animation = flyer.animate([
            { left: (start.left + start.width/2) + 'px', top: (start.top + start.height/2) + 'px', transform: 'scale(1)', opacity: 1 },
            { left: (end.left + end.width/2) + 'px', top: (end.top + end.height/2) + 'px', transform: 'scale(0.5)', opacity: 0.5 }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.2, 1, 0.3, 1)'
        });
        
        animation.onfinish = () => {
            flyer.remove();
            // Update the cart count number
            if(cartCount) {
                let num = parseInt(cartCount.innerText) || 0;
                cartCount.innerText = num + 1;
            }
        };
    };

    // 3. MODAL FUNCTIONS
    if (modal) {
        const showModal = (productName) => {
            if(modalMessage) modalMessage.textContent = `${productName} has been added to your cart!`;
            modal.classList.remove('hidden');
        };

        const hideModal = () => {
            modal.classList.add('hidden');
        };

        // 4. ATTACH CLICK LISTENERS TO "ADD TO CART" BUTTONS
        cartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                // Run Animation First
                animateFlyToCart(button);
                
                // Show Modal after 800ms (when animation finishes)
                const productName = button.getAttribute('data-product-name');
                setTimeout(() => {
                    showModal(productName);
                }, 800);
            });
        });

        // 5. LOGIC FOR THE "OK" BUTTON
        // This closes the popup and scrolls you back to the products grid
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', () => {
                // A. Hide the popup
                hideModal();
                
                // B. Scroll back to the products section
                const productsSection = document.getElementById('products');
                if (productsSection) {
                    productsSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // Close modal if user clicks outside the white box
        modal.addEventListener('click', (e) => {
            if (e.target === modal) hideModal();
        });
    }

    // 6. OTHER FORMS (Contact & Checkout)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Message Sent!");
        });
    }

    const checkoutForm = document.getElementById('checkout-form');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert("Payment Successful!");
            window.location.href = "index.html";
        });
    }
});