/**
 * NEXUS SERVER - HOLOGRAPHIC INTERFACE
 * Advanced JavaScript for Neural Network Experience
 * Created by FourTwentyDevs
 */

// ===== GLOBAL VARIABLES =====
let scene, camera, renderer, particles;
let mouseX = 0, mouseY = 0;
let windowHalfX = window.innerWidth / 2;
let windowHalfY = window.innerHeight / 2;

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', function() {
    initializeHolographicInterface();
    initializeLoadingScreen();
    initializeNavigation();
    initializeCursor();
    initializeScrollEffects();
    initializeCounters();
    initializeParticles();
    initializeSmoothScrolling();
    initializeTypingEffect();
    initializeGlitchEffects();
});

// ===== HOLOGRAPHIC INTERFACE INITIALIZATION =====
function initializeHolographicInterface() {
    console.log('🚀 Initializing Nexus Holographic Interface...');
    
    // Initialize Three.js scene for 3D effects
    initThreeJS();
    
    // Add neural network visualization
    createNeuralNetwork();
    
    // Initialize holographic grid
    initHolographicGrid();
    
    console.log('✅ Holographic Interface Initialized');
}

// ===== THREE.JS INITIALIZATION =====
function initThreeJS() {
    // Create scene
    scene = new THREE.Scene();
    
    // Create camera
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;
    
    // Create renderer
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    
    // Add to DOM
    const bg3D = document.querySelector('.holo-3d-bg');
    if (bg3D) {
        bg3D.appendChild(renderer.domElement);
        renderer.domElement.style.position = 'absolute';
        renderer.domElement.style.top = '0';
        renderer.domElement.style.left = '0';
        renderer.domElement.style.zIndex = '-1';
    }
    
    // Handle window resize
    window.addEventListener('resize', onWindowResize);
    
    // Start animation loop
    animate();
}

// ===== NEURAL NETWORK CREATION =====
function createNeuralNetwork() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const colors = [];
    
    // Create neural nodes
    for (let i = 0; i < 1000; i++) {
        vertices.push(
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20,
            (Math.random() - 0.5) * 20
        );
        
        // Color gradient from cyan to purple
        const color = new THREE.Color();
        color.setHSL(0.5 + Math.random() * 0.2, 1, 0.5);
        colors.push(color.r, color.g, color.b);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.8,
        blending: THREE.AdditiveBlending
    });
    
    particles = new THREE.Points(geometry, material);
    scene.add(particles);
}

// ===== HOLOGRAPHIC GRID =====
function initHolographicGrid() {
    const gridHelper = new THREE.GridHelper(20, 20, 0x00d4ff, 0x7c3aed);
    gridHelper.material.opacity = 0.1;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);
}

// ===== ANIMATION LOOP =====
function animate() {
    requestAnimationFrame(animate);
    
    // Rotate particles
    if (particles) {
        particles.rotation.x += 0.001;
        particles.rotation.y += 0.002;
    }
    
    // Mouse interaction
    camera.position.x += (mouseX - camera.position.x) * 0.05;
    camera.position.y += (-mouseY - camera.position.y) * 0.05;
    camera.lookAt(scene.position);
    
    renderer.render(scene, camera);
}

// ===== WINDOW RESIZE HANDLER =====
function onWindowResize() {
    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;
    
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// ===== LOADING SCREEN =====
function initializeLoadingScreen() {
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
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 500);
        }
        
        loadingProgress.style.transform = `translateX(${progress - 100}%)`;
    }, 200);
}

// ===== NAVIGATION =====
function initializeNavigation() {
    const mobileToggle = document.querySelector('[data-mobile-toggle]');
    const mobileMenu = document.querySelector('[data-mobile-menu]');
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    // Mobile menu toggle
    if (mobileToggle && mobileMenu) {
        mobileToggle.addEventListener('click', () => {
            mobileMenu.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('ri-menu-line');
                icon.classList.toggle('ri-close-line');
            }
        });
    }
    
    // Smooth scroll for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (mobileMenu && mobileMenu.classList.contains('active')) {
                    mobileMenu.classList.remove('active');
                    const icon = mobileToggle.querySelector('i');
                    if (icon) {
                        icon.classList.add('ri-menu-line');
                        icon.classList.remove('ri-close-line');
                    }
                }
            }
        });
    });
    
    // Navigation background on scroll
    const nav = document.querySelector('[data-nav]');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(10, 10, 26, 0.95)';
            } else {
                nav.style.background = 'rgba(255, 255, 255, 0.05)';
            }
        });
    }
}

// ===== HOLOGRAPHIC CURSOR =====
function initializeCursor() {
    const cursor = document.querySelector('.holo-cursor');
    const cursorTrail = document.querySelector('.holo-cursor-trail');
    
    if (!cursor || !cursorTrail) return;
    
    let cursorX = 0, cursorY = 0;
    let trailX = 0, trailY = 0;
    
    // Mouse move handler
    document.addEventListener('mousemove', (e) => {
        cursorX = e.clientX;
        cursorY = e.clientY;
        
        mouseX = (e.clientX - windowHalfX) * 0.01;
        mouseY = (e.clientY - windowHalfY) * 0.01;
    });
    
    // Cursor animation loop
    function updateCursor() {
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        // Trail follows with delay
        trailX += (cursorX - trailX) * 0.1;
        trailY += (cursorY - trailY) * 0.1;
        
        cursorTrail.style.left = trailX + 'px';
        cursorTrail.style.top = trailY + 'px';
        
        requestAnimationFrame(updateCursor);
    }
    
    updateCursor();
    
    // Cursor interactions
    const interactiveElements = document.querySelectorAll('a, button, .holo-card, .holo-button');
    
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
            cursor.style.borderColor = '#7C3AED';
        });
        
        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'translate(-50%, -50%) scale(1)';
            cursor.style.borderColor = '#00D4FF';
        });
    });
}

// ===== SCROLL EFFECTS =====
function initializeScrollEffects() {
    // GSAP ScrollTrigger animations
    if (typeof gsap !== 'undefined' && gsap.registerPlugin) {
        gsap.registerPlugin(ScrollTrigger);
        
        // Fade in animations
        gsap.utils.toArray('.holo-card').forEach(card => {
            gsap.fromTo(card, 
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    scrollTrigger: {
                        trigger: card,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
        
        // Parallax effects
        gsap.utils.toArray('.holo-3d-bg').forEach(bg => {
            gsap.to(bg, {
                yPercent: -50,
                ease: 'none',
                scrollTrigger: {
                    trigger: bg,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: true
                }
            });
        });
    }
}

// ===== COUNTER ANIMATIONS =====
function initializeCounters() {
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

// ===== PARTICLE SYSTEM =====
function initializeParticles() {
    const particleContainer = document.querySelector('.floating-particles');
    if (!particleContainer) return;
    
    // Create floating particles
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'floating-particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 1}px;
            height: ${Math.random() * 4 + 1}px;
            background: ${getRandomHoloColor()};
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float-particle ${Math.random() * 10 + 10}s linear infinite;
            opacity: ${Math.random() * 0.5 + 0.3};
        `;
        
        particleContainer.appendChild(particle);
    }
}

// ===== SMOOTH SCROLLING =====
function initializeSmoothScrolling() {
    if (typeof Lenis !== 'undefined') {
        const lenis = new Lenis({
            duration: 0.8,
            easing: (t) => 1 - Math.pow(1 - t, 3),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 0.8,
            smoothTouch: false,
            touchMultiplier: 1.5,
            infinite: false,
            lerp: 0.1,
        });
        
        let rafId;
        function raf(time) {
            lenis.raf(time);
            rafId = requestAnimationFrame(raf);
        }
        
        rafId = requestAnimationFrame(raf);
        
        // Pause when tab is hidden
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                cancelAnimationFrame(rafId);
            } else {
                rafId = requestAnimationFrame(raf);
            }
        });
    }
}

// ===== TYPING EFFECT =====
function initializeTypingEffect() {
    const typingElements = document.querySelectorAll('.typing-text');
    
    typingElements.forEach(element => {
        const text = element.textContent;
        element.textContent = '';
        element.style.width = '0';
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeText(element, text);
                    observer.unobserve(element);
                }
            });
        });
        
        observer.observe(element);
    });
}

function typeText(element, text) {
    let i = 0;
    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
            // Remove typing cursor after completion
            setTimeout(() => {
                element.style.borderRight = 'none';
            }, 1000);
        }
    }, 100);
}

// ===== GLITCH EFFECTS =====
function initializeGlitchEffects() {
    const glitchElements = document.querySelectorAll('.glitch-text');
    
    glitchElements.forEach(element => {
        element.setAttribute('data-text', element.textContent);
        
        // Random glitch trigger
        setInterval(() => {
            if (Math.random() < 0.1) { // 10% chance
                element.style.animation = 'none';
                setTimeout(() => {
                    element.style.animation = '';
                }, 100);
            }
        }, 2000);
    });
}

// ===== UTILITY FUNCTIONS =====
function getRandomHoloColor() {
    const colors = ['#00D4FF', '#7C3AED', '#F59E0B', '#10B981'];
    return colors[Math.floor(Math.random() * colors.length)];
}

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

// ===== PERFORMANCE OPTIMIZATION =====
function optimizePerformance() {
    // Reduce animations on low-end devices
    if (navigator.hardwareConcurrency < 4) {
        document.body.classList.add('reduced-motion');
    }
    
    // Pause animations when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            document.body.classList.add('paused');
        } else {
            document.body.classList.remove('paused');
        }
    });
}

// ===== ACCESSIBILITY =====
function initializeAccessibility() {
    // Respect user's motion preferences
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.body.classList.add('reduced-motion');
    }
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('Nexus Interface Error:', e.error);
});

// ===== INITIALIZATION COMPLETE =====
window.addEventListener('load', () => {
    optimizePerformance();
    initializeAccessibility();
    console.log('🌟 Nexus Holographic Interface Fully Loaded');
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        initializeHolographicInterface,
        initThreeJS,
        createNeuralNetwork
    };
}
