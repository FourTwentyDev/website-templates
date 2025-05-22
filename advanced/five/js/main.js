// ===== VICE CITY RP - MAIN JAVASCRIPT ===== //

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeViceCity();
});

// ===== MAIN INITIALIZATION ===== //
function initializeViceCity() {
    // Initialize all components
    initLoadingScreen();
    initSmoothScrolling();
    initNavigation();
    initAnimations();
    initCounters();
    initTypingEffect();
    initMobileMenu();
    initScrollEffects();
    
    console.log('🌴 Vice City RP initialized successfully');
}

// ===== LOADING SCREEN ===== //
function initLoadingScreen() {
    const loadingScreen = document.querySelector('.loading-screen');
    const loadingProgress = document.querySelector('.loading-progress');
    
    if (!loadingScreen || !loadingProgress) return;
    
    // Simulate loading progress
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.random() * 15;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            
            // Hide loading screen after completion
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                
                // Remove from DOM after transition
                setTimeout(() => {
                    loadingScreen.remove();
                }, 500);
            }, 500);
        }
    }, 100);
}

// ===== SMOOTH SCROLLING WITH LENIS ===== //
function initSmoothScrolling() {
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);

        // Handle anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    lenis.scrollTo(target, {
                        offset: -80,
                        duration: 2
                    });
                }
            });
        });
    }
}

// ===== NAVIGATION ===== //
function initNavigation() {
    const nav = document.querySelector('[data-nav]');
    if (!nav) return;
    
    // Navbar scroll effect
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > 100) {
            nav.classList.add('scrolled');
            nav.style.background = 'rgba(5, 5, 8, 0.95)';
            nav.style.backdropFilter = 'blur(20px)';
        } else {
            nav.classList.remove('scrolled');
            nav.style.background = 'rgba(26, 26, 31, 0.8)';
            nav.style.backdropFilter = 'blur(10px)';
        }
        
        // Hide/show navbar on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 200) {
            nav.style.transform = 'translateY(-100%)';
        } else {
            nav.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
    
    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== MOBILE MENU ===== //
function initMobileMenu() {
    const mobileToggle = document.querySelector('[data-mobile-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    
    if (!mobileToggle || !mobileMenu) return;
    
    let isOpen = false;
    
    mobileToggle.addEventListener('click', () => {
        isOpen = !isOpen;
        
        if (isOpen) {
            mobileMenu.classList.add('active');
            mobileMenu.style.opacity = '1';
            mobileMenu.style.pointerEvents = 'all';
            document.body.style.overflow = 'hidden';
        } else {
            mobileMenu.classList.remove('active');
            mobileMenu.style.opacity = '0';
            mobileMenu.style.pointerEvents = 'none';
            document.body.style.overflow = '';
        }
    });
    
    // Close menu when clicking on links
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            isOpen = false;
            mobileMenu.classList.remove('active');
            mobileMenu.style.opacity = '0';
            mobileMenu.style.pointerEvents = 'none';
            document.body.style.overflow = '';
        });
    });
}

// ===== GSAP ANIMATIONS ===== //
function initAnimations() {
    if (typeof gsap === 'undefined') return;
    
    // Register ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);
    
    // Hero section animations
    const heroTimeline = gsap.timeline();
    heroTimeline
        .from('.vice-text', {
            duration: 1.5,
            y: 100,
            opacity: 0,
            ease: 'power3.out'
        })
        .from('.typing-text', {
            duration: 1,
            y: 50,
            opacity: 0,
            ease: 'power2.out'
        }, '-=0.5')
        .from('.vice-card', {
            duration: 1,
            y: 80,
            opacity: 0,
            stagger: 0.2,
            ease: 'power2.out'
        }, '-=0.3')
        .from('.vice-button-primary, .vice-button-outline', {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: 'back.out(1.7)'
        }, '-=0.2');
    
    // Floating elements animation
    gsap.to('.floating-elements > div', {
        y: -20,
        duration: 2,
        ease: 'power1.inOut',
        stagger: 0.5,
        repeat: -1,
        yoyo: true
    });
    
    // Section animations
    gsap.utils.toArray('section').forEach(section => {
        const cards = section.querySelectorAll('.vice-card, .vice-feature-card');
        
        if (cards.length > 0) {
            gsap.from(cards, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                },
                y: 100,
                opacity: 0,
                duration: 1,
                stagger: 0.2,
                ease: 'power2.out'
            });
        }
        
        // Title animations
        const title = section.querySelector('h2');
        if (title) {
            gsap.from(title, {
                scrollTrigger: {
                    trigger: section,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 1,
                ease: 'power2.out'
            });
        }
    });
    
    // Parallax effect for background images
    gsap.utils.toArray('[class*="bg-[url"]').forEach(element => {
        gsap.to(element, {
            scrollTrigger: {
                trigger: element,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            },
            yPercent: -50,
            ease: 'none'
        });
    });
}

// ===== COUNTER ANIMATIONS ===== //
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            current = target;
                            clearInterval(timer);
                        }
                        counter.textContent = Math.floor(current);
                    }, 16);
                    observer.unobserve(counter);
                }
            });
        });
        
        observer.observe(counter);
    });
}

// ===== TYPING EFFECT ===== //
function initTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.borderRight = '2px solid #FF0080';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            } else {
                // Blinking cursor effect
                setInterval(() => {
                    element.style.borderRight = element.style.borderRight === 'none' 
                        ? '2px solid #FF0080' 
                        : 'none';
                }, 750);
            }
        };
        
        // Start typing when element is visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(typeWriter, 500);
                    observer.unobserve(element);
                }
            });
        });
        
        observer.observe(element);
    });
}

// ===== SCROLL EFFECTS ===== //
function initScrollEffects() {
    // Parallax scrolling for floating elements
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.floating-elements > div');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.1);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
    
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll('.vice-card, .vice-feature-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        revealObserver.observe(element);
    });
}

// ===== INTERACTIVE EFFECTS ===== //
function initInteractiveEffects() {
    // Card hover effects
    document.querySelectorAll('.vice-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 20px 60px rgba(255, 0, 128, 0.3)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 10px 40px rgba(255, 0, 128, 0.2)';
        });
    });
    
    // Button ripple effect
    document.querySelectorAll('.vice-button, .vice-button-primary, .vice-button-outline').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
}

// ===== PERFORMANCE OPTIMIZATION ===== //
function optimizePerformance() {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
    // Throttle scroll events
    let ticking = false;
    function updateScrollEffects() {
        // Update scroll-based animations here
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}

// ===== UTILITY FUNCTIONS ===== //
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// ===== EASTER EGGS ===== //
function initEasterEggs() {
    // Konami code easter egg
    const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    let konamiIndex = 0;
    
    document.addEventListener('keydown', (e) => {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                activateViceMode();
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });
    
    function activateViceMode() {
        document.body.classList.add('vice-mode');
        
        // Add special effects
        const specialEffect = document.createElement('div');
        specialEffect.className = 'special-effect';
        specialEffect.innerHTML = '🌴 VICE MODE ACTIVATED 🌴';
        specialEffect.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 2rem;
            font-family: 'Orbitron', monospace;
            color: #FF0080;
            text-shadow: 0 0 20px #FF0080;
            z-index: 9999;
            animation: fadeInOut 3s ease-in-out;
        `;
        
        document.body.appendChild(specialEffect);
        
        setTimeout(() => {
            specialEffect.remove();
            document.body.classList.remove('vice-mode');
        }, 3000);
    }
}

// ===== ERROR HANDLING ===== //
window.addEventListener('error', (e) => {
    console.error('Vice City RP Error:', e.error);
});

// ===== RESIZE HANDLER ===== //
window.addEventListener('resize', debounce(() => {
    // Recalculate animations and layouts on resize
    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.refresh();
    }
}, 250));

// ===== INITIALIZE ADDITIONAL FEATURES ===== //
document.addEventListener('DOMContentLoaded', () => {
    initInteractiveEffects();
    optimizePerformance();
    initEasterEggs();
});

// ===== CSS ANIMATIONS VIA JAVASCRIPT ===== //
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    @keyframes fadeInOut {
        0%, 100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
    }
    
    .vice-mode {
        filter: hue-rotate(45deg) saturate(1.5);
    }
    
    .lazy {
        opacity: 0;
        transition: opacity 0.3s;
    }
`;
document.head.appendChild(style);

// ===== EXPORT FOR MODULE USAGE ===== //
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeViceCity,
        initLoadingScreen,
        initSmoothScrolling,
        initNavigation,
        initAnimations,
        initCounters,
        initTypingEffect,
        initMobileMenu,
        initScrollEffects
    };
}
