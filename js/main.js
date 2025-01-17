document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true,
        offset: 200
    });

    // Testimonial slider functionality
    const testimonials = document.querySelectorAll('.testimonial');
    const dotsContainer = document.querySelector('.testimonial-dots');
    let currentTestimonial = 0;

    // Create dots for testimonials
    testimonials.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => showTestimonial(index));
        dotsContainer.appendChild(dot);
    });

    function showTestimonial(index) {
        testimonials.forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
        testimonials[index].classList.add('active');
        document.querySelectorAll('.dot')[index].classList.add('active');
    }

    // Auto-rotate testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);

    // Initialize first testimonial
    showTestimonial(0);

    // Smooth scrolling for navigation
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Stats animation
    const stats = document.querySelectorAll('.stat');
    
    const observerOptions = {
        threshold: 0.5
    };

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const stat = entry.target;
                const value = parseInt(stat.querySelector('.number').dataset.value);
                animateValue(stat.querySelector('.number'), 0, value, 2000);
                statsObserver.unobserve(stat);
            }
        });
    }, observerOptions);

    stats.forEach(stat => statsObserver.observe(stat));

    function animateValue(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const value = Math.floor(progress * (end - start) + start);
            element.textContent = `${value}%`;
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Image expansion functionality
    function expandImage(image) {
        const expandedDiv = document.createElement('div');
        expandedDiv.className = 'expanded-image';
        
        const expandedImg = document.createElement('img');
        expandedImg.src = image.src;
        
        expandedDiv.appendChild(expandedImg);
        document.body.appendChild(expandedDiv);
        
        // Prevent body scrolling when image is expanded
        document.body.style.overflow = 'hidden';
        
        expandedDiv.onclick = function() {
            document.body.removeChild(expandedDiv);
            document.body.style.overflow = 'auto';
        }

        // Close on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                document.body.removeChild(expandedDiv);
                document.body.style.overflow = 'auto';
            }
        });
    }

    // Add click handler to all metrics images
    document.querySelectorAll('.metrics-image').forEach(img => {
        img.addEventListener('click', function() {
            expandImage(this);
        });
    });

    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            navbar.classList.remove('scroll-up');
            return;
        }

        if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
            // Scroll Down
            navbar.classList.remove('scroll-up');
            navbar.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
            // Scroll Up
            navbar.classList.remove('scroll-down');
            navbar.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });
});

// Make expandImage function globally available
window.expandImage = function(image) {
    const expandedDiv = document.createElement('div');
    expandedDiv.className = 'expanded-image';
    
    const expandedImg = document.createElement('img');
    expandedImg.src = image.src;
    
    expandedDiv.appendChild(expandedImg);
    document.body.appendChild(expandedDiv);
    
    document.body.style.overflow = 'hidden';
    
    expandedDiv.onclick = function() {
        document.body.removeChild(expandedDiv);
        document.body.style.overflow = 'auto';
    }
};
