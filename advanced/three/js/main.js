// Initialize smooth scrolling
const lenis = new Lenis({
    duration: 0.8,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    orientation: 'vertical',
    smoothWheel: true,
    smoothTouch: false,
    touchMultiplier: 2
});

gsap.registerPlugin(ScrollTrigger);

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Navigation
const nav = document.querySelector('[data-nav]');
const menuToggle = document.querySelector('.menu-toggle');
const menuOverlay = document.querySelector('[data-menu-overlay]');

lenis.on('scroll', ({ scroll }) => {
    nav.classList.toggle('scrolled', scroll > 50);
});

menuToggle.addEventListener('click', () => {
    menuOverlay.classList.toggle('active');
    document.body.style.overflow = menuOverlay.classList.contains('active') ? 'hidden' : '';
});

// Smooth scroll to sections
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        menuOverlay.classList.remove('active');
        document.body.style.overflow = '';
        
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            lenis.scrollTo(target, {
                offset: -100,
                duration: 1.2
            });
        }
    });
});

// Subtle scroll animations
const scrollElements = document.querySelectorAll('[data-scroll]');

scrollElements.forEach(element => {
    gsap.from(element, {
        scrollTrigger: {
            trigger: element,
            start: 'top 85%',
        },
        y: 10,
        opacity: 0,
        duration: 0.4,
        ease: 'power1.out'
    });
});

// Minimal text animations
const typingTexts = document.querySelectorAll('.typing-text');
const cleanTexts = document.querySelectorAll('.clean-text');

[...typingTexts, ...cleanTexts].forEach(text => {
    gsap.from(text, {
        scrollTrigger: {
            trigger: text,
            start: 'top 85%',
        },
        y: 10,
        opacity: 0,
        duration: 0.4,
        ease: 'power1.out'
    });
});

// Clean loading screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    setTimeout(() => {
        loadingScreen.style.display = 'none';
    }, 1500);
});

// Section fade in
document.querySelectorAll('section').forEach(section => {
    gsap.from(section.children, {
        scrollTrigger: {
            trigger: section,
            start: 'top 85%',
        },
        y: 10,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power1.out'
    });
});
