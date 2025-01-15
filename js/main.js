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

    // Form handling
    const contactForm = document.getElementById('contact-form');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
    });

    // Animate stats on scroll
    const animateStats = () => {
        const stats = document.querySelectorAll('.stat .number');
        stats.forEach(stat => {
            const value = parseInt(stat.textContent);
            let current = 0;
            const increment = value / 60;
            const updateCount = () => {
                if(current < value) {
                    current += increment;
                    stat.textContent = Math.round(current) + '%';
                    requestAnimationFrame(updateCount);
                }
            };
            updateCount();
        });
    };

    // Initialize animations
    animateStats();
});
