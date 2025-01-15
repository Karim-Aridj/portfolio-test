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
            console.log('Form submitted:', Object.fromEntries(formData));
            this.reset();
        });
    }

    // Initialize animations
    animateStats();
});
