// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    // Initialize tilt effect for cards
    const tiltElements = document.querySelectorAll('[data-tilt]');
    tiltElements.forEach(element => {
        VanillaTilt.init(element, {
            max: element.getAttribute('data-tilt-max') || 5,
            speed: 400,
            glare: true,
            'max-glare': 0.2,
            scale: 1.02
        });
    });

    // GSAP Animations
    // Reveal text animations
    const revealTexts = document.querySelectorAll('.reveal-text, .reveal-text-delay');
    revealTexts.forEach(text => {
        gsap.from(text, {
            scrollTrigger: {
                trigger: text,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        });
    });

    // Feature cards animation
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });

    // Team cards animation
    const teamCards = document.querySelectorAll('.team-card');
    teamCards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            },
            y: 100,
            opacity: 0,
            duration: 1,
            delay: index * 0.2,
            ease: 'power3.out'
        });
    });

    // Navigation active state with smooth transitions
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    const nav = document.querySelector('nav');

    // Add hover effect to nav
    nav.addEventListener('mouseenter', () => {
        gsap.to(nav, {
            width: '16rem',
            duration: 0.2,
            ease: 'power3.out'
        });
    });

    nav.addEventListener('mouseleave', () => {
        gsap.to(nav, {
            width: nav.classList.contains('md:w-24') ? '6rem' : '5rem',
            duration: 0.2,
            ease: 'power3.inOut'
        });
    });

    const observerOptions = {
        root: null,
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                navLinks.forEach(link => {
                    if (link.getAttribute('data-section') === targetId) {
                        gsap.to(link, {
                            backgroundColor: 'rgb(224 242 254 / 0.5)',
                            color: 'rgb(2 132 199)',
                            duration: 0.15,
                            ease: 'power3.out'
                        });
                        link.classList.add('active');
                    } else {
                        gsap.to(link, {
                            backgroundColor: 'transparent',
                            color: 'rgb(156 163 175)',
                            duration: 0.15,
                            ease: 'power3.out'
                        });
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Add hover animations for nav links
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            if (!link.classList.contains('active')) {
                gsap.to(link, {
                    backgroundColor: 'rgb(243 244 246 / 0.5)',
                    scale: 1.05,
                    duration: 0.15,
                    ease: 'power3.out'
                });
            }
        });

        link.addEventListener('mouseleave', () => {
            if (!link.classList.contains('active')) {
                gsap.to(link, {
                    backgroundColor: 'transparent',
                    scale: 1,
                    duration: 0.15,
                    ease: 'power3.out'
                });
            }
        });
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target,
                        offsetY: 0
                    },
                    ease: 'power3.inOut'
                });
            }
        });
    });

    // Parallax effect for hero section
    const heroSection = document.querySelector('#home');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.5;
            heroSection.style.backgroundPositionY = `${rate}px`;
        });
    }

    // Gradient animation for buttons
    const gradientElements = document.querySelectorAll('.animate-gradient');
    gradientElements.forEach(element => {
        element.style.backgroundSize = '200% 200%';
    });
});
