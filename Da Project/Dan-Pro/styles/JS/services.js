// Services Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Service card interactions
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        // Add hover effects
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 8px 16px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
        });

        // Service button click handlers
        const button = card.querySelector('.service-btn');
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const service = this.parentElement.querySelector('h3').textContent;
            handleServiceSelection(service);
        });
    });

    // Service selection handler
    function handleServiceSelection(service) {
        switch(service) {
            case 'AI-Powered Digital Companion':
                window.location.href = '/chat.html';
                break;
            case 'Communities':
                window.location.href = '/communities.html';
                break;
            case 'Self help-tools':
                window.location.href = '/tools.html';
                break;
            case 'Professional Therapy':
                window.location.href = '/book-therapy.html';
                break;
        }
    }

    // Pricing toggle functionality
    const pricingCards = document.querySelectorAll('.price-card');
    pricingCards.forEach(card => {
        card.addEventListener('click', function() {
            // Remove 'selected' class from all cards
            pricingCards.forEach(c => c.classList.remove('selected'));
            // Add 'selected' class to clicked card
            this.classList.add('selected');
        });

        // Price card buttons
        const priceButton = card.querySelector('button');
        priceButton.addEventListener('click', function(e) {
            e.stopPropagation();
            const plan = this.closest('.price-card').querySelector('h3').textContent;
            handlePriceSelection(plan);
        });
    });

    // Price selection handler
    function handlePriceSelection(plan) {
        const planDetails = {
            'Basic': { price: 'Free', features: ['AI Companion', 'Basic Community Access'] },
            'Premium': { price: '$15/month', features: ['Unlimited AI Usage', 'Full Community Access', '1 Therapy Session'] },
            'Professional': { price: '$30/month', features: ['All Premium Features', '3 Therapy Sessions', 'Priority Support'] }
        };

        // Store selection in session storage
        sessionStorage.setItem('selectedPlan', JSON.stringify(planDetails[plan]));
        window.location.href = '/signup.html';
    }

    // Mobile menu functionality
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-button');
    mobileMenuButton.innerHTML = '<i class="bx bx-menu"></i>';
    
    const nav = document.querySelector('nav');
    const navUl = nav.querySelector('ul');
    
    nav.insertBefore(mobileMenuButton, navUl);
    
    mobileMenuButton.addEventListener('click', () => {
        navUl.classList.toggle('show');
    });

    // Lazy loading for service images
    const serviceImages = document.querySelectorAll('.service-card img');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    serviceImages.forEach(img => imageObserver.observe(img));
});