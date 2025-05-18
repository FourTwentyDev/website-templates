// Initialize Particles.js
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#00f3ff'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false,
            animation: {
                enable: true,
                speed: 1,
                opacity_min: 0.1,
                sync: false
            }
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00f3ff',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        },
        modes: {
            repulse: {
                distance: 100,
                duration: 0.4
            },
            push: {
                particles_nb: 4
            }
        }
    },
    retina_detect: true
});

// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Circular Navigation
const navToggle = document.getElementById('nav-toggle');
const navItems = document.getElementById('nav-items');
const navLinks = document.querySelectorAll('.nav-item');

// Position nav items in a circle with animation
function positionNavItems(isOpen = false) {
    const radius = window.innerWidth <= 768 ? 80 : 120;
    const startAngle = -Math.PI/2; // Start from top
    const endAngle = startAngle + (2 * Math.PI); // Full circle
    const menuItems = document.querySelectorAll('#nav-items .nav-item');
    const totalItems = menuItems.length;

    menuItems.forEach((link, index) => {
        // Calculate angle for current item
        const angle = startAngle + (index * (endAngle - startAngle) / totalItems);
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;

        if (isOpen) {
            gsap.to(link, {
                x: x,
                y: y,
                opacity: 1,
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.7)",
                delay: index * 0.1
            });
        } else {
            gsap.to(link, {
                x: 0,
                y: 0,
                opacity: 0,
                scale: 0.8,
                duration: 0.5,
                ease: "back.in(1.7)",
                delay: (totalItems - index - 1) * 0.1
            });
        }
    });
}

// Toggle navigation
navToggle.addEventListener('click', () => {
    const isOpen = !navItems.classList.contains('active');
    navItems.classList.toggle('active');
    navToggle.classList.toggle('active');
    positionNavItems(isOpen);
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    const isClickInside = navToggle.contains(e.target) || navItems.contains(e.target);
    if (!isClickInside && navItems.classList.contains('active')) {
        navItems.classList.remove('active');
        navToggle.classList.remove('active');
        positionNavItems(false);
    }
});

// Initialize nav items at center position
navLinks.forEach(link => {
    link.style.transform = 'translate(0, 0)';
});

// Scroll Animations
document.addEventListener('DOMContentLoaded', () => {
    // Reveal text animations
    gsap.utils.toArray('.reveal-text').forEach(text => {
        gsap.from(text, {
            scrollTrigger: {
                trigger: text,
                start: 'top 80%',
                toggleClass: 'active'
            }
        });
    });

    // Counter animation
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const step = target / (duration / 16); // 60fps

        function updateCounter() {
            const current = parseInt(counter.innerText);
            if (current < target) {
                counter.innerText = Math.ceil(current + step);
                setTimeout(updateCounter, 16);
            } else {
                counter.innerText = target;
            }
        }

        ScrollTrigger.create({
            trigger: counter,
            start: 'top 80%',
            onEnter: () => updateCounter()
        });
    });

    // Feature cards animation
    gsap.utils.toArray('.feature-card').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: i * 0.2
        });
    });

    // Team cards animation
    gsap.utils.toArray('.team-card, .team-card-owner').forEach((card, i) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 80%'
            },
            y: 50,
            opacity: 0,
            duration: 1,
            delay: i * 0.2
        });
    });
});

// Custom cursor
const cursor = document.querySelector('.custom-cursor');
if (cursor) {
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });

    // Scale cursor on clickable elements
    document.querySelectorAll('a, button').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - 50;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Close navigation if open
            navItems.classList.remove('active');
            navToggle.classList.remove('active');
            positionNavItems(false);
        }
    });
});

// Glitch text effect
document.querySelectorAll('.glitch-text').forEach(text => {
    text.setAttribute('data-text', text.textContent);
});

// Handle window resize
window.addEventListener('resize', () => {
    positionNavItems();
});

// Initialize Three.js background
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create grid geometry
const gridHelper = new THREE.GridHelper(200, 50, 0x00f3ff, 0x00f3ff);
scene.add(gridHelper);

camera.position.z = 50;
camera.position.y = 30;
camera.rotation.x = -0.5;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    gridHelper.position.z += 0.1;
    if (gridHelper.position.z > 1) {
        gridHelper.position.z = 0;
    }
    renderer.render(scene, camera);
}
animate();

// Handle window resize for Three.js
window.addEventListener('resize', () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
});
