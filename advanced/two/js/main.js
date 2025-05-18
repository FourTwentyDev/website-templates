// Initialize smooth scrolling with Lenis
const lenis = new Lenis({
    duration: 0.8,
    smoothWheel: true,
    wheelMultiplier: 0.8,
    touchMultiplier: 1.5,
    infinite: false,
    lerp: 0.1
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Custom Cursor
const cursor = document.querySelector('.tactical-cursor');
const cursorDot = document.querySelector('.tactical-cursor-dot');
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;
let cursorDotX = 0;
let cursorDotY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Cursor hover effects
document.querySelectorAll('a, button, .tactical-card, .feature-card').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1.5) rotate(45deg)';
        cursor.style.borderColor = '#FF6B00';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(0.5) rotate(45deg)';
    });

    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1) rotate(45deg)';
        cursor.style.borderColor = '#FF6B00';
        cursorDot.style.transform = 'translate(-50%, -50%) scale(1) rotate(45deg)';
    });
});

// Animate cursor
function animateCursor() {
    const easingFactor = 0.15;
    
    cursorX += (mouseX - cursorX) * easingFactor;
    cursorY += (mouseY - cursorY) * easingFactor;
    
    cursorDotX += (mouseX - cursorDotX) * 0.3;
    cursorDotY += (mouseY - cursorDotY) * 0.3;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    
    cursorDot.style.left = cursorDotX + 'px';
    cursorDot.style.top = cursorDotY + 'px';

    requestAnimationFrame(animateCursor);
}

animateCursor();

// Loading Screen
window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    gsap.to(loadingScreen, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
            loadingScreen.style.display = 'none';
            initializeAnimations();
        }
    });
});

// Initialize all animations
function initializeAnimations() {
    // Tactical Grid Parallax with military-style movement
    document.querySelectorAll('.tactical-grid').forEach(grid => {
        window.addEventListener('mousemove', (e) => {
            const mouseX = (e.clientX / window.innerWidth - 0.5) * 10; // Reduced movement
            const mouseY = (e.clientY / window.innerHeight - 0.5) * 10;
            
            gsap.to(grid, {
                x: mouseX,
                y: mouseY,
                duration: 1.5, // Slower, more deliberate movement
                ease: 'power2.out'
            });
        });
    });

    // Glitch Text Effect
    document.querySelectorAll('.glitch-text').forEach(text => {
        text.setAttribute('data-text', text.textContent);
    });

    // Reveal Animations with tactical timing
    gsap.utils.toArray('section').forEach((section, index) => {
        gsap.fromTo(section,
            {
                opacity: 0,
                y: 30
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.1, // Staggered reveal
                ease: 'power2.out',
                scrollTrigger: {
                    trigger: section,
                    start: 'top 80%',
                    end: 'top 50%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Tactical Cards Animation with military precision
    gsap.utils.toArray('.tactical-card').forEach(card => {
        const cardContent = card.querySelectorAll('h3, p, i, img');
        
        ScrollTrigger.create({
            trigger: card,
            start: 'top 80%',
            onEnter: () => {
                gsap.fromTo(cardContent,
                    {
                        opacity: 0,
                        y: 20
                    },
                    {
                        opacity: 1,
                        y: 0,
                        duration: 0.4, // Faster, more precise animations
                        stagger: 0.05,
                        ease: 'power1.out'
                    }
                );
            }
        });
    });

    // Feature Cards Parallax with tactical response
    document.querySelectorAll('.feature-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPercent = (x / rect.width - 0.5) * 10; // Reduced movement
            const yPercent = (y / rect.height - 0.5) * 10;

            gsap.to(card.querySelector('img'), {
                x: xPercent,
                y: yPercent,
                duration: 0.5,
                ease: 'power1.out' // Sharper response
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card.querySelector('img'), {
                x: 0,
                y: 0,
                duration: 0.3, // Faster reset
                ease: 'power1.out'
            });
        });
    });
}

// Navigation Menu with tactical transitions
const menuToggle = document.querySelector('.menu-toggle');
const menuOverlay = document.querySelector('[data-menu-overlay]');
const menuLinks = document.querySelectorAll('[data-menu-overlay] a');
let menuOpen = false;

const menuTl = gsap.timeline({
    paused: true,
    defaults: { duration: 0.3, ease: 'power2.inOut' } // Faster transitions
});

menuTl
    .to(menuOverlay, {
        opacity: 1,
        pointerEvents: 'auto'
    })
    .fromTo(menuLinks,
        {
            opacity: 0,
            x: -20
        },
        {
            opacity: 1,
            x: 0,
            stagger: 0.03 // Faster stagger
        },
        '-=0.1'
    );

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

menuToggle.addEventListener('click', () => toggleMenu(!menuOpen));
menuLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
});

// Navigation background on scroll
const nav = document.querySelector('[data-nav]');
let lastScrollY = window.scrollY;
let ticking = false;

const updateNav = () => {
    const shouldBeScrolled = window.scrollY > 50; // Reduced threshold
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

// Initialize Three.js tactical background
const initThreeBackground = () => {
    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    document.body.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true
    });

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // Create tactical particle system
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const size = 1500; // Reduced particle count

    for (let i = 0; i < size; i++) {
        vertices.push(
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000,
            Math.random() * 2000 - 1000
        );
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    const material = new THREE.PointsMaterial({
        size: 3, // Larger particles
        color: 0xFF6B00,
        transparent: true,
        opacity: 0.15,
        sizeAttenuation: true
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Tactical Animation
    const animate = () => {
        requestAnimationFrame(animate);

        particles.rotation.x += 0.0002; // Slower rotation
        particles.rotation.y += 0.0002;

        renderer.render(scene, camera);
    };

    // Handle resize
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    animate();
};

// Initialize Three.js background after the page loads
window.addEventListener('load', initThreeBackground);
