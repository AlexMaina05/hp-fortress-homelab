// HP Fortress - Interactive Scripts

document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll animation to sections
    const observerOptions = {
        threshold:  0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target. classList.add('fade-in');
                observer.unobserve(entry. target);
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('. section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Header background on scroll
    const header = document.querySelector('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(10, 14, 39, 0.95)';
            header.style.backdropFilter = 'blur(20px)';
        } else {
            header.style.background = 'rgba(10, 14, 39, 0.98)';
            header.style. backdropFilter = 'blur(10px)';
        }
        
        lastScroll = currentScroll;
    });

    // Simulate server status updates (optional - for demo purposes)
    const statusDots = document.querySelectorAll('. status-dot');
    
    // All services are active by default
    // You can integrate with actual monitoring APIs here
    
    console.log('HP Fortress Dashboard Loaded ✅');
});

// Add fade-in animation class
const style = document.createElement('style');
style.textContent = `
    .section {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    .section.fade-in {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);
