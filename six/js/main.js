// Initialize smooth scrolling with Lenis
const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2
});

// Integrate Lenis with RAF
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Progress bar animation
const progressBar = document.querySelector('.progress-bar');
gsap.to(progressBar, {
    scaleX: 1,
    ease: 'none',
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
    }
});

// Navigation background on scroll with throttle
const nav = document.querySelector('[data-nav]');
let lastScrollY = window.scrollY;
let ticking = false;

const updateNav = () => {
    const shouldBeScrolled = window.scrollY > 100;
    if (shouldBeScrolled !== nav.classList.contains('scrolled')) {
        nav.classList.toggle('scrolled', shouldBeScrolled);
    }
    ticking = false;
};

window.addEventListener('scroll', () => {
    lastScrollY = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateNav();
            ticking = false;
        });
        ticking = true;
    }
});

// Menu toggle with GSAP animation
const menuToggle = document.querySelector('.menu-toggle');
const menuOverlay = document.querySelector('[data-menu-overlay]');
const menuLinks = document.querySelectorAll('[data-menu-overlay] a');
let menuOpen = false;

// Create GSAP timeline for menu animation
const menuTl = gsap.timeline({
    paused: true,
    defaults: { duration: 0.5, ease: 'power3.inOut' }
});

// Setup menu animation with stagger effect
menuTl
    .to(menuOverlay, { 
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.4
    })
    .fromTo(menuLinks, {
        opacity: 0,
        x: -20,
        filter: 'blur(10px)'
    }, {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        stagger: 0.1
    }, '-=0.2');

// Toggle menu function with enhanced animation
const toggleMenu = (open) => {
    menuOpen = open;
    if (open) {
        menuToggle.innerHTML = '<i class="ri-close-line text-2xl"></i>';
        document.body.style.overflow = 'hidden';
        menuTl.timeScale(1).play();
    } else {
        menuToggle.innerHTML = '<i class="ri-menu-line text-2xl"></i>';
        document.body.style.overflow = '';
        menuTl.timeScale(1.5).reverse();
    }
};

// Menu event listeners
menuToggle.addEventListener('click', () => toggleMenu(!menuOpen));
menuLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
});

// Enhanced section reveal animations with glowing effect
const revealElements = document.querySelectorAll('section');
revealElements.forEach(element => {
    // Create a stagger effect for child elements
    const children = element.querySelectorAll('h2, h3, p, .grid > *, .hover-lift');
    
    gsap.fromTo(element, 
        {
            opacity: 0,
            y: 30,
            filter: 'blur(10px)'
        },
        {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Stagger child elements with glow effect
    if (children.length) {
        gsap.fromTo(children,
            {
                opacity: 0,
                y: 20,
                filter: 'blur(5px)'
            },
            {
                opacity: 1,
                y: 0,
                filter: 'blur(0px)',
                duration: 0.8,
                stagger: 0.1,
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: element,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    }
});

// Smooth image loading with fade effect
document.querySelectorAll('img').forEach(img => {
    img.classList.add('loading');
    if (img.complete) {
        img.classList.remove('loading');
        img.classList.add('loaded');
    } else {
        img.addEventListener('load', () => {
            img.classList.remove('loading');
            img.classList.add('loaded');
        });
    }
});

// Enhanced card hover animations with glow effect
document.querySelectorAll('.hover-lift').forEach(card => {
    const cardContent = card.querySelectorAll('h3, p, i');
    
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.4,
            ease: 'power2.out',
            boxShadow: '0 8px 30px rgba(0, 255, 156, 0.2)'
        });
        
        gsap.to(cardContent, {
            y: -4,
            duration: 0.4,
            ease: 'power2.out',
            stagger: 0.05,
            color: '#00FF9C'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.4,
            ease: 'power2.inOut',
            boxShadow: 'none'
        });
        
        gsap.to(cardContent, {
            y: 0,
            duration: 0.4,
            ease: 'power2.inOut',
            color: 'inherit'
        });
    });
});

// Smooth scrolling for anchor links with enhanced animation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = this.getAttribute('href') === '#home' ? 0 : -80;
            lenis.scrollTo(target, {
                offset: offset,
                duration: 1.5,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        }
    });
});

// Add hover-lift class to cards that don't have it
document.querySelectorAll('.team-card, .feature-card').forEach(card => {
    if (!card.classList.contains('hover-lift')) {
        card.classList.add('hover-lift');
    }
});

// Prevent FOUC (Flash of Unstyled Content)
document.documentElement.classList.add('loaded');

// Grid background parallax effect with mouse movement
const gridElements = document.querySelectorAll('.bg-grid');
gridElements.forEach(grid => {
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        gsap.to(grid, {
            duration: 1,
            x: mouseX * 30,
            y: mouseY * 30,
            rotationY: mouseX * 10,
            rotationX: -mouseY * 10,
            ease: 'power2.out'
        });
    });
});
