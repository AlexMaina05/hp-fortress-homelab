/* ============================================
   HP FORTRESS - INTERACTIVE JAVASCRIPT
   Advanced Interactions & Animations
   ============================================ */

(function() {
    'use strict';

    // ============================================
    // STATE MANAGEMENT
    // ============================================
    const state = {
        isScrolled: false,
        mobileMenuOpen: false,
        stats: {
            cpu: 42,
            ram: 68,
            storage: 55
        }
    };

    // ============================================
    // DOM ELEMENTS
    // ============================================
    const elements = {
        header: document.querySelector('header'),
        mobileMenuToggle: document.querySelector('. mobile-menu-toggle'),
        navLinks: document.querySelector('.nav-links'),
        sections: document.querySelectorAll('. section'),
        metricFills: document.querySelectorAll('. metric-fill'),
        currentTime: document.getElementById('current-time'),
        statBoxes: document.querySelectorAll('.stat-box')
    };

    // ============================================
    // INITIALIZATION
    // ============================================
    function init() {
        setupEventListeners();
        setupIntersectionObserver();
        startClock();
        animateStats();
        initSmoothScroll();
        console.log('🏰 HP Fortress Dashboard Initialized');
    }

    // ============================================
    // EVENT LISTENERS
    // ============================================
    function setupEventListeners() {
        // Scroll event with throttling
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) {
                window.cancelAnimationFrame(scrollTimeout);
            }
            scrollTimeout = window.requestAnimationFrame(handleScroll);
        });

        // Mobile menu toggle
        if (elements.mobileMenuToggle) {
            elements.mobileMenuToggle.addEventListener('click', toggleMobileMenu);
        }

        // Close mobile menu on link click
        if (elements.navLinks) {
            const links = elements.navLinks.querySelectorAll('a');
            links.forEach(link => {
                link. addEventListener('click', () => {
                    if (state.mobileMenuOpen) {
                        toggleMobileMenu();
                    }
                });
            });
        }

        // Keyboard navigation
        document.addEventListener('keydown', handleKeyboard);

        // Resize handler with debouncing
        let resizeTimeout;
        window. addEventListener('resize', () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(handleResize, 250);
        });
    }

    // ============================================
    // SCROLL HANDLING
    // ============================================
    function handleScroll() {
        const scrollY = window.pageYOffset;
        const newScrollState = scrollY > 100;

        if (newScrollState !== state.isScrolled) {
            state. isScrolled = newScrollState;
            
            if (elements.header) {
                if (state.isScrolled) {
                    elements.header.classList.add('scrolled');
                } else {
                    elements.header. classList.remove('scrolled');
                }
            }
        }

        // Parallax effect for hero section
        const hero = document.querySelector('.hero');
        if (hero && scrollY < window.innerHeight) {
            const serverDashboard = document.querySelector('.server-dashboard');
            if (serverDashboard) {
                serverDashboard.style. transform = `translateY(${scrollY * 0.1}px)`;
            }
        }
    }

    // ============================================
    // MOBILE MENU
    // ============================================
    function toggleMobileMenu() {
        state.mobileMenuOpen = ! state.mobileMenuOpen;
        
        if (elements.navLinks) {
            if (state.mobileMenuOpen) {
                elements.navLinks. style.display = 'flex';
                elements.navLinks.style. position = 'absolute';
                elements.navLinks. style.top = '100%';
                elements.navLinks.style.left = '0';
                elements.navLinks.style.right = '0';
                elements. navLinks.style.flexDirection = 'column';
                elements. navLinks.style.background = 'var(--bg-secondary)';
                elements.navLinks.style.padding = 'var(--spacing-lg)';
                elements.navLinks.style.borderTop = '1px solid var(--border-color)';
                elements.navLinks.style.gap = 'var(--spacing-sm)';
                elements.navLinks.style.animation = 'slideDown 0.3s ease';
            } else {
                elements. navLinks.style.display = 'none';
            }
        }

        // Animate hamburger icon
        if (elements.mobileMenuToggle) {
            const spans = elements.mobileMenuToggle.querySelectorAll('span');
            if (state.mobileMenuOpen) {
                spans[0].style.transform = 'rotate(45deg) translateY(10px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        }
    }

    // ============================================
    // INTERSECTION OBSERVER (Scroll Animations)
    // ============================================
    function setupIntersectionObserver() {
        const observerOptions = {
            threshold:  0.15,
            rootMargin: '0px 0px -100px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    
                    // Animate stat boxes when they come into view
                    if (entry.target.classList.contains('stats-section')) {
                        animateStatBoxes();
                    }
                    
                    // Animate feature cards with stagger
                    if (entry.target.querySelector('.feature-grid')) {
                        animateFeatureCards(entry.target);
                    }
                    
                    observer.unobserve(entry. target);
                }
            });
        }, observerOptions);

        elements.sections.forEach(section => {
            observer.observe(section);
        });
    }

    // ============================================
    // ANIMATIONS
    // ============================================
    function animateStats() {
        // Animate metric bars with realistic fluctuation
        if (elements.metricFills. length > 0) {
            setInterval(() => {
                elements.metricFills.forEach((fill, index) => {
                    const baseValues = [42, 68, 55]; // CPU, RAM, Storage
                    const variation = Math.random() * 10 - 5; // ±5%
                    const newValue = Math.max(20, Math.min(95, baseValues[index] + variation));
                    
                    fill.style.width = `${newValue}%`;
                    
                    // Update value text
                    const metricValue = fill.closest('.metric').querySelector('.metric-value');
                    if (metricValue) {
                        metricValue.textContent = `${Math.round(newValue)}%`;
                    }
                });
            }, 3000);
        }
    }

    function animateStatBoxes() {
        if (elements.statBoxes.length > 0) {
            elements.statBoxes.forEach((box, index) => {
                setTimeout(() => {
                    box. style.opacity = '0';
                    box.style. transform = 'translateY(20px)';
                    box.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                    
                    setTimeout(() => {
                        box. style.opacity = '1';
                        box.style.transform = 'translateY(0)';
                    }, 50);
                }, index * 100);
            });
        }
    }

    function animateFeatureCards(container) {
        const cards = container.querySelectorAll('.feature-card, .arch-card-modern, .challenge-item');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card. style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style. transform = 'translateY(0)';
                }, 50);
            }, index * 150);
        });
    }

    // ============================================
    // REAL-TIME CLOCK
    // ============================================
    function startClock() {
        if (! elements.currentTime) return;

        function updateClock() {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now. getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            elements.currentTime.textContent = `${hours}:${minutes}: ${seconds}`;
        }

        updateClock();
        setInterval(updateClock, 1000);
    }

    // ============================================
    // SMOOTH SCROLL
    // ============================================
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip empty hash
                if (href === '#') return;
                
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    const headerHeight = elements.header ?  elements.header.offsetHeight : 80;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, href);
                }
            });
        });
    }

    // ============================================
    // KEYBOARD NAVIGATION
    // ============================================
    function handleKeyboard(e) {
        // ESC to close mobile menu
        if (e.key === 'Escape' && state.mobileMenuOpen) {
            toggleMobileMenu();
        }
    }

    // ============================================
    // RESIZE HANDLER
    // ============================================
    function handleResize() {
        // Reset mobile menu on desktop resize
        if (window.innerWidth > 768 && state.mobileMenuOpen) {
            toggleMobileMenu();
            if (elements.navLinks) {
                elements.navLinks.style. display = 'flex';
                elements.navLinks.style.position = 'static';
                elements.navLinks. style.flexDirection = 'row';
                elements.navLinks. style.background = 'transparent';
                elements.navLinks.style.padding = '0';
                elements.navLinks.style.border = 'none';
            }
        }
    }

    // ============================================
    // SERVER STATUS SIMULATION
    // ============================================
    function simulateServerStatus() {
        const serverUnits = document.querySelectorAll('. server-unit');
        
        // Simulate occasional service restart (for demo purposes)
        setInterval(() => {
            const randomUnit = serverUnits[Math.floor(Math.random() * serverUnits.length)];
            const led = randomUnit.querySelector('.unit-led');
            
            if (led && Math.random() > 0.95) { // 5% chance every interval
                // Temporarily deactivate
                led.classList.remove('active');
                
                // Reactivate after 2 seconds
                setTimeout(() => {
                    led.classList. add('active');
                }, 2000);
            }
        }, 10000);
    }

    // ============================================
    // PERFORMANCE MONITORING
    // ============================================
    function logPerformance() {
        if ('performance' in window) {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                        console.log('🚀 Page Load Performance: ');
                        console.log(`   DOM Content Loaded: ${Math.round(perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart)}ms`);
                        console.log(`   Full Page Load: ${Math.round(perfData.loadEventEnd - perfData.loadEventStart)}ms`);
                    }
                }, 0);
            });
        }
    }

    // ============================================
    // EASTER EGG:  KONAMI CODE
    // ============================================
    function initKonamiCode() {
        const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
        let konamiIndex = 0;

        document.addEventListener('keydown', (e) => {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    activateEasterEgg();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }

    function activateEasterEgg() {
        const body = document.body;
        body.style.animation = 'rainbow 2s linear infinite';
        
        // Add rainbow animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);

        // Show message
        const message = document.createElement('div');
        message.textContent = '🎉 FORTRESS MODE ACTIVATED! 🏰';
        message.style. cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background:  var(--accent-gradient);
            color: white;
            padding: 2rem 3rem;
            border-radius: 20px;
            font-size: 2rem;
            font-weight:  900;
            z-index: 10000;
            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
            animation: pulse 0.5s ease infinite;
        `;
        document.body.appendChild(message);

        // Remove after 3 seconds
        setTimeout(() => {
            body.style.animation = '';
            message.remove();
            style.remove();
        }, 3000);
    }

    // ============================================
    // ADD FADE-IN CSS ANIMATION
    // ============================================
    function injectFadeInStyles() {
        const style = document.createElement('style');
        style.textContent = `
            . section {
                opacity: 0;
                transform: translateY(30px);
                transition: opacity 0.8s ease, transform 0.8s ease;
            }
            
            .section.fade-in {
                opacity: 1;
                transform: translateY(0);
            }

            @keyframes slideDown {
                from {
                    opacity: 0;
                    transform: translateY(-20px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }

            @keyframes pulse {
                0%, 100% { transform: translate(-50%, -50%) scale(1); }
                50% { transform: translate(-50%, -50%) scale(1.05); }
            }
        `;
        document.head.appendChild(style);
    }

    // ============================================
    // ACCESSIBILITY ENHANCEMENTS
    // ============================================
    function enhanceAccessibility() {
        // Add ARIA labels to interactive elements
        const buttons = document.querySelectorAll('button: not([aria-label])');
        buttons.forEach(btn => {
            if (! btn.getAttribute('aria-label')) {
                btn.setAttribute('aria-label', btn.textContent || 'Button');
            }
        });

        // Add skip to main content link
        const skipLink = document.createElement('a');
        skipLink.href = '#main';
        skipLink.textContent = 'Skip to main content';
        skipLink.className = 'skip-link';
        skipLink.style.cssText = `
            position: absolute;
            top: -100px;
            left: 0;
            background: var(--accent-primary);
            color: white;
            padding: 1rem 2rem;
            z-index: 10000;
            transition: top 0.3s;
        `;
        skipLink.addEventListener('focus', () => {
            skipLink.style.top = '0';
        });
        skipLink.addEventListener('blur', () => {
            skipLink.style.top = '-100px';
        });
        document.body.insertBefore(skipLink, document. body.firstChild);

        // Add main ID if not present
        const main = document.querySelector('main');
        if (main && !main.id) {
            main.id = 'main';
        }
    }

    // ============================================
    // EXTERNAL LINKS HANDLER
    // ============================================
    function handleExternalLinks() {
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        externalLinks. forEach(link => {
            // Add external link indicator
            if (!link.querySelector('.external-icon')) {
                const icon = document.createElement('span');
                icon.className = 'external-icon';
                icon.innerHTML = ' ↗';
                icon.style.fontSize = '0.875em';
                link.appendChild(icon);
            }
            
            // Add rel attributes for security
            if (link.target === '_blank') {
                link. rel = 'noopener noreferrer';
            }
        });
    }

    // ============================================
    // COPY TO CLIPBOARD FUNCTIONALITY
    // ============================================
    function initCopyButtons() {
        const codeBlocks = document.querySelectorAll('pre');
        codeBlocks.forEach(block => {
            const button = document. createElement('button');
            button. textContent = 'Copy';
            button.className = 'copy-button';
            button.style. cssText = `
                position: absolute;
                top: 0. 5rem;
                right: 0.5rem;
                padding: 0.5rem 1rem;
                background: var(--accent-primary);
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.875rem;
                opacity: 0;
                transition: opacity 0.3s;
            `;
            
            block.style.position = 'relative';
            block.appendChild(button);
            
            block.addEventListener('mouseenter', () => {
                button.style.opacity = '1';
            });
            
            block.addEventListener('mouseleave', () => {
                button.style.opacity = '0';
            });
            
            button.addEventListener('click', async () => {
                const code = block.textContent;
                try {
                    await navigator. clipboard.writeText(code);
                    button.textContent = '✓ Copied!';
                    setTimeout(() => {
                        button.textContent = 'Copy';
                    }, 2000);
                } catch (err) {
                    console.error('Failed to copy:', err);
                }
            });
        });
    }

    // ============================================
    // INITIALIZE EVERYTHING
    // ============================================
    if (document.readyState === 'loading') {
        document. addEventListener('DOMContentLoaded', () => {
            init();
            injectFadeInStyles();
            simulateServerStatus();
            logPerformance();
            initKonamiCode();
            enhanceAccessibility();
            handleExternalLinks();
            initCopyButtons();
        });
    } else {
        init();
        injectFadeInStyles();
        simulateServerStatus();
        logPerformance();
        initKonamiCode();
        enhanceAccessibility();
        handleExternalLinks();
        initCopyButtons();
    }

})();

// ============================================
// ANALYTICS & TRACKING (Optional)
// ============================================
// Uncomment and configure if using analytics
/*
function trackPageView() {
    if (typeof gtag !== 'undefined') {
        gtag('config', 'YOUR-GA-ID', {
            page_path: window.location.pathname
        });
    }
}

function trackEvent(category, action, label) {
    if (typeof gtag !== 'undefined') {
        gtag('event', action, {
            event_category: category,
            event_label: label
        });
    }
}

// Track button clicks
document.querySelectorAll('. btn').forEach(btn => {
    btn.addEventListener('click', function() {
        trackEvent('Button', 'Click', this.textContent);
    });
});
*/
