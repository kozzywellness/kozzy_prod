// About Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const section = document.querySelector(this.getAttribute('href'));
            section.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Animation for statistics when they come into view
    const stats = document.querySelectorAll('.stat-card');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: "0px"
    };

    const statsObserver = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    stats.forEach(stat => {
        stat.style.opacity = 0;
        stat.style.transform = 'translateY(20px)';
        stat.style.transition = 'all 0.5s ease-out';
        statsObserver.observe(stat);
    });

    // Value cards hover effect enhancement
    const valueCards = document.querySelectorAll('.value-card');
    valueCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 6px 12px rgba(0,0,0,0.1)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Mobile menu toggle
    const mobileMenuButton = document.createElement('button');
    mobileMenuButton.classList.add('mobile-menu-button');
    mobileMenuButton.innerHTML = '<i class="bx bx-menu"></i>';
    
    const nav = document.querySelector('nav');
    const navUl = nav.querySelector('ul');
    
    nav.insertBefore(mobileMenuButton, navUl);
    
    mobileMenuButton.addEventListener('click', () => {
        navUl.classList.toggle('show');
    });

    // Responsive image loading
    const storyImage = document.querySelector('.story-image img');
    if (storyImage) {
        if (window.innerWidth < 768) {
            storyImage.src = storyImage.src.replace('about-story.jpeg', 'about-story-mobile.jpeg');
        }
    }
});