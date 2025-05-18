// Initialize smooth scrolling with Lenis
const lenis = new Lenis({
    duration: 0.8,
    smoothWheel: true,
    wheelMultiplier: 0.8,
    touchMultiplier: 1.5,
    infinite: false,
    lerp: 0.03,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothTouch: true
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Progress bar animation with R6S style
const progressBar = document.querySelector('.progress-bar');
gsap.to(progressBar, {
    scaleX: 1,
    ease: 'power2.out',
    scrollTrigger: {
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3
    }
});

// Navigation background on scroll with tactical fade
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

// Menu toggle with R6S-style animation
const menuToggle = document.querySelector('.menu-toggle');
const menuOverlay = document.querySelector('[data-menu-overlay]');
const menuLinks = document.querySelectorAll('[data-menu-overlay] a');
let menuOpen = false;

// Create GSAP timeline for tactical menu animation
const menuTl = gsap.timeline({
    paused: true,
    defaults: { duration: 0.4, ease: 'power2.inOut' }
});

// Setup menu animation with R6S-inspired effects
menuTl
    .to(menuOverlay, { 
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.3
    })
    .fromTo(menuLinks, {
        opacity: 0,
        x: -30,
        filter: 'blur(10px)',
        clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)'
    }, {
        opacity: 1,
        x: 0,
        filter: 'blur(0px)',
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
        stagger: 0.05
    }, '-=0.2');

// Toggle menu function with enhanced tactical animation
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

// Enhanced section reveal animations with R6S-style effects
const revealElements = document.querySelectorAll('section');
revealElements.forEach(element => {
    const children = element.querySelectorAll('h2, h3, p, .grid > *, .hover-lift');
    
    gsap.fromTo(element, 
        {
            opacity: 0,
            y: 30,
            clipPath: 'polygon(0 0, 100% 0, 100% 0, 100% 0, 100% 0)'
        },
        {
            opacity: 1,
            y: 0,
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
                trigger: element,
                start: 'top 80%',
                end: 'top 50%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Tactical stagger effect for child elements
    if (children.length) {
        gsap.fromTo(children,
            {
                opacity: 0,
                y: 20,
                clipPath: 'polygon(0 0, 100% 0, 100% 0, 100% 0, 100% 0)'
            },
            {
                opacity: 1,
                y: 0,
                clipPath: 'polygon(0 0, 100% 0, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
                duration: 0.6,
                stagger: 0.05,
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

// Tactical image loading effect
document.querySelectorAll('img').forEach(img => {
    img.classList.add('loading');
    if (img.complete) {
        img.classList.remove('loading');
        img.classList.add('loaded');
    } else {
        img.addEventListener('load', () => {
            img.classList.remove('loading');
            img.classList.add('loaded');
            gsap.fromTo(img, 
                {
                    clipPath: 'polygon(0 0, 100% 0, 100% 0, 100% 0, 100% 0)'
                },
                {
                    clipPath: 'polygon(0 0, 100% 0, 100% 100%, 15px 100%, 0 calc(100% - 15px))',
                    duration: 0.6,
                    ease: 'power2.out'
                }
            );
        });
    }
});

// Enhanced card hover animations with R6S effects
document.querySelectorAll('.hover-lift').forEach(card => {
    const cardContent = card.querySelectorAll('h3, p, i');
    
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -8,
            scale: 1.02,
            duration: 0.3,
            ease: 'power2.out',
            boxShadow: '0 8px 30px rgba(255, 70, 85, 0.2)'
        });
        
        gsap.to(cardContent, {
            y: -4,
            duration: 0.3,
            ease: 'power2.out',
            stagger: 0.05,
            color: '#FF4655'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: 'power2.inOut',
            boxShadow: 'none'
        });
        
        gsap.to(cardContent, {
            y: 0,
            duration: 0.3,
            ease: 'power2.inOut',
            color: 'inherit'
        });
    });
});

// Tactical smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = this.getAttribute('href') === '#home' ? 0 : -80;
            lenis.scrollTo(target, {
                offset: offset,
                duration: 0.8,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
            });
        }
    });
});

// Add tactical hover effect class
document.querySelectorAll('.team-card, .feature-card').forEach(card => {
    if (!card.classList.contains('hover-lift')) {
        card.classList.add('hover-lift', 'tactical-border');
    }
});

// Prevent FOUC
document.documentElement.classList.add('loaded');

// Enhanced grid background parallax with R6S style
const gridElements = document.querySelectorAll('.bg-grid');
gridElements.forEach(grid => {
    window.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        gsap.to(grid, {
            duration: 0.8,
            x: mouseX * 20,
            y: mouseY * 20,
            rotationY: mouseX * 5,
            rotationX: -mouseY * 5,
            ease: 'power2.out'
        });
    });
});

// Add tactical overlay effect to sections
document.querySelectorAll('section').forEach(section => {
    if (!section.classList.contains('tactical-overlay')) {
        section.classList.add('tactical-overlay');
    }
});
