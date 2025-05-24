// NoPixel Inspired Professional Theme - JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeScrollAnimations();
    initializeCounters();
    initializeNavigation();
    initializeProfessionalEffects();
    initializeAccessibility();
});

// Scroll-triggered animations using GSAP
function initializeScrollAnimations() {
    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Hero section animations
    gsap.timeline()
        .from('.hero-badge', { duration: 0.8, y: 30, opacity: 0, ease: 'power2.out' })
        .from('.hero-title', { duration: 1, y: 50, opacity: 0, ease: 'power2.out' }, '-=0.4')
        .from('.hero-subtitle', { duration: 0.8, y: 30, opacity: 0, ease: 'power2.out' }, '-=0.6')
        .from('.hero-buttons', { duration: 0.8, y: 30, opacity: 0, ease: 'power2.out' }, '-=0.4')
        .from('.hero-stats', { duration: 0.8, y: 30, opacity: 0, ease: 'power2.out' }, '-=0.2');

    // Section reveal animations
    gsap.utils.toArray('section').forEach((section, index) => {
        if (index === 0) return; // Skip hero section
        
        gsap.fromTo(section.querySelector('h2'), 
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Card animations
    gsap.utils.toArray('.card-hover').forEach((card, index) => {
        gsap.fromTo(card,
            { y: 30, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: index * 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Department cards stagger animation
    gsap.utils.toArray('.department-card').forEach((card, index) => {
        gsap.fromTo(card,
            { y: 40, opacity: 0, scale: 0.95 },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.7,
                delay: index * 0.15,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Staff cards professional entrance
    gsap.utils.toArray('.staff-card').forEach((card, index) => {
        gsap.fromTo(card,
            { y: 50, opacity: 0, rotationY: 15 },
            {
                y: 0,
                opacity: 1,
                rotationY: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

// Animated counters for statistics
function initializeCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => animateCounter(counter, target, duration),
            once: true
        });
    });
}

function animateCounter(element, target, duration) {
    let start = 0;
    const increment = target / (duration / 16); // 60fps
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Enhanced navigation functionality
function initializeNavigation() {
    const nav = document.querySelector('nav');
    let lastScrollY = window.scrollY;
    
    // Professional navbar behavior
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.classList.add('nav-scrolled');
        } else {
            nav.classList.remove('nav-scrolled');
        }
        
        // Hide/show navbar on scroll (professional behavior)
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Professional visual effects
function initializeProfessionalEffects() {
    // Professional button hover effects
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('mouseenter', function() {
            gsap.to(this, { scale: 1.05, duration: 0.3, ease: 'power2.out' });
        });
        
        button.addEventListener('mouseleave', function() {
            gsap.to(this, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
    });

    // Professional card interactions
    document.querySelectorAll('.card-hover').forEach(card => {
        card.addEventListener('mouseenter', function() {
            gsap.to(this, { 
                y: -8, 
                boxShadow: '0 20px 40px rgba(30, 58, 138, 0.15)',
                duration: 0.3, 
                ease: 'power2.out' 
            });
        });
        
        card.addEventListener('mouseleave', function() {
            gsap.to(this, { 
                y: 0, 
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                duration: 0.3, 
                ease: 'power2.out' 
            });
        });
    });

    // Professional avatar hover effects
    document.querySelectorAll('.avatar-professional').forEach(avatar => {
        avatar.addEventListener('mouseenter', function() {
            gsap.to(this, { scale: 1.1, duration: 0.3, ease: 'power2.out' });
        });
        
        avatar.addEventListener('mouseleave', function() {
            gsap.to(this, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
    });

    // Professional loading states for buttons
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.textContent.includes('Apply') || this.textContent.includes('Join')) {
                e.preventDefault();
                showProfessionalLoading(this);
            }
        });
    });
}

function showProfessionalLoading(button) {
    const originalText = button.innerHTML;
    button.innerHTML = '<div class="loading-professional"></div> Processing...';
    button.disabled = true;
    
    setTimeout(() => {
        button.innerHTML = originalText;
        button.disabled = false;
    }, 2000);
}

// Accessibility enhancements
function initializeAccessibility() {
    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Focus management for mobile menu
    const mobileMenuButton = document.querySelector('[data-mobile-menu-button]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.setAttribute('aria-hidden', isExpanded);
        });
    }

    // Reduced motion support
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        gsap.globalTimeline.timeScale(0.01);
    }

    // High contrast mode detection
    if (window.matchMedia('(prefers-contrast: high)').matches) {
        document.body.classList.add('high-contrast');
    }
}

// Professional form validation (if forms are added)
function validateProfessionalForm(form) {
    const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showFieldError(input, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(input);
        }
    });
    
    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error text-red-600 text-sm mt-1';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    field.classList.add('border-red-500');
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.classList.remove('border-red-500');
}

// Professional scroll progress indicator
function initializeScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: linear-gradient(90deg, #1e3a8a, #3b82f6);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Professional intersection observer for performance
function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    document.querySelectorAll('section, .card-hover').forEach(el => {
        observer.observe(el);
    });
}

// Professional error handling
window.addEventListener('error', function(e) {
    console.error('Professional template error:', e.error);
    // Could send to analytics or error reporting service
});

// Professional performance monitoring
function initializePerformanceMonitoring() {
    if ('performance' in window) {
        window.addEventListener('load', () => {
            const perfData = performance.getEntriesByType('navigation')[0];
            console.log('Professional template load time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
        });
    }
}

// Initialize additional features
document.addEventListener('DOMContentLoaded', function() {
    initializeScrollProgress();
    initializeIntersectionObserver();
    initializePerformanceMonitoring();
});

// Professional theme utilities
const ProfessionalTheme = {
    // Utility functions for the professional theme
    showNotification: function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type} fixed top-4 right-4 bg-white border border-gray-200 rounded-lg p-4 shadow-lg z-50`;
        notification.innerHTML = `
            <div class="flex items-center space-x-3">
                <i class="ri-information-line text-blue-600"></i>
                <span>${message}</span>
                <button class="ml-auto text-gray-400 hover:text-gray-600">
                    <i class="ri-close-line"></i>
                </button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.remove();
        }, 5000);
        
        // Manual close
        notification.querySelector('button').addEventListener('click', () => {
            notification.remove();
        });
    },
    
    // Professional modal system
    showModal: function(content, title = '') {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="modal-content bg-white rounded-2xl p-8 max-w-md w-full mx-4 shadow-2xl">
                ${title ? `<h3 class="text-2xl font-bold text-np-dark mb-4">${title}</h3>` : ''}
                <div class="modal-body">${content}</div>
                <div class="modal-actions mt-6 flex justify-end space-x-3">
                    <button class="modal-close px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">Close</button>
                </div>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Close handlers
        modal.querySelector('.modal-close').addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });
        
        // Escape key handler
        const escapeHandler = (e) => {
            if (e.key === 'Escape') {
                modal.remove();
                document.removeEventListener('keydown', escapeHandler);
            }
        };
        document.addEventListener('keydown', escapeHandler);
    }
};

// Export for global use
window.ProfessionalTheme = ProfessionalTheme;
