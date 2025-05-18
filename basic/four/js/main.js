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

// Setup menu animation
menuTl
    .to(menuOverlay, { 
        opacity: 1,
        pointerEvents: 'auto',
        duration: 0.4
    })
    .fromTo(menuLinks, {
        opacity: 0,
        y: 20
    }, {
        opacity: 1,
        y: 0,
        stagger: 0.1
    }, '-=0.2');

// Toggle menu function
const toggleMenu = (open) => {
    menuOpen = open;
    if (open) {
        menuToggle.innerHTML = '<i class="ri-close-line text-2xl"></i>';
        document.body.style.overflow = 'hidden';
        menuTl.play();
    } else {
        menuToggle.innerHTML = '<i class="ri-menu-line text-2xl"></i>';
        document.body.style.overflow = '';
        menuTl.reverse();
    }
};

// Menu event listeners
menuToggle.addEventListener('click', () => toggleMenu(!menuOpen));
menuLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
});

// Smooth reveal animations
const revealElements = document.querySelectorAll('section');
revealElements.forEach(element => {
    gsap.fromTo(element, 
        {
            opacity: 0,
            y: 20
        },
        {
            opacity: 1,
            y: 0,
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
});

// Smooth image loading
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

// Card hover animations using GSAP
document.querySelectorAll('.hover-lift').forEach(card => {
    card.addEventListener('mouseenter', () => {
        gsap.to(card, {
            y: -4,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    card.addEventListener('mouseleave', () => {
        gsap.to(card, {
            y: 0,
            duration: 0.3,
            ease: 'power2.out'
        });
    });
});

// Handle smooth scrolling for anchor links with adjusted offset
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Adjust offset based on if it's the home section
            const offset = this.getAttribute('href') === '#home' ? 0 : -80;
            lenis.scrollTo(target, {
                offset: offset,
                duration: 1.2,
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

// Dark mode toggle (if needed)
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const toggleDarkMode = e => {
    document.documentElement.classList.toggle('dark', e.matches);
};
prefersDark.addListener(toggleDarkMode);
toggleDarkMode(prefersDark);

// Prevent FOUC (Flash of Unstyled Content)
document.documentElement.classList.add('loaded');
