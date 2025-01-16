document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 200
    });

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

    // Initialize animations
    animateStats();
});
