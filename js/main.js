// main.js
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Animate stats on scroll
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat .number');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const stat = entry.target;
                    const value = parseInt(stat.getAttribute('data-value'));
                    let current = 0;
                    const increment = value / 60;
                    const updateCount = () => {
                        if(current < value) {
                            current += increment;
                            stat.textContent = Math.round(current) + '%';
                            requestAnimationFrame(updateCount);
                        } else {
                            stat.textContent = value + '%';
                        }
                    };
                    updateCount();
                    observer.unobserve(stat);
                }
            });
        }, {threshold: 0.5});

        stats.forEach(stat => {
            const value = stat.textContent;
            stat.setAttribute('data-value', value.replace('%', ''));
            stat.textContent = '0%';
            observer.observe(stat);
        });
    };

    // Form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const formData = new FormData(this);
            // Add your form submission logic here
            console.log('Form submitted:', Object.fromEntries(formData));
            this.reset();
        });
    }

    // Mobile menu toggle
    const createMobileMenu = () => {
        const navbar = document.querySelector('.navbar');
        const burger = document.createElement('div');
        burger.className = 'burger';
        burger.innerHTML = '☰';
        burger.style.cursor = 'pointer';
        burger.style.fontSize = '1.5rem';
        burger.style.color = 'white';
        
        burger.addEventListener('click', () => {
            document.querySelector('.nav-links').classList.toggle('show');
        });
        
        navbar.appendChild(burger);
    };

    // Initialize all animations and functionality
    animateStats();
    createMobileMenu();
});
