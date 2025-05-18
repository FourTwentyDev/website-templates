// Handle smooth section reveals and custom cursor
document.addEventListener('DOMContentLoaded', () => {
    // Custom cursor functionality
    const cursor = document.querySelector('.custom-cursor');
    const cursorTrail = document.querySelector('.custom-cursor-trail');
    let isTouch = false;

    // Check if device supports touch
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        isTouch = true;
        if (cursor) cursor.style.display = 'none';
        if (cursorTrail) cursorTrail.style.display = 'none';
    }

    // Cursor position tracking
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;

    // Update cursor position
    const updateCursor = (e) => {
        if (isTouch || !cursor || !cursorTrail) return;
        
        targetX = e.clientX;
        targetY = e.clientY;
        
        if (cursor && cursor.style) {
            cursor.style.transform = `translate(${targetX}px, ${targetY}px) translate(-50%, -50%)`;
        }
    };

    // Animate cursor trail
    const animateTrail = () => {
        if (isTouch || !cursorTrail) return;

        // Elastic following effect
        currentX += (targetX - currentX) * 0.05;
        currentY += (targetY - currentY) * 0.05;
        
        if (cursorTrail && cursorTrail.style) {
            cursorTrail.style.transform = `translate(${currentX}px, ${currentY}px) translate(-50%, -50%)`;
        }

        requestAnimationFrame(animateTrail);
    };

    // Start animation loop
    animateTrail();

    // Handle cursor visibility
    const handleCursorVisibility = (visible) => {
        if (isTouch || !cursor || !cursorTrail) return;
        
        const opacity = visible ? '1' : '0';
        if (cursor && cursor.style) cursor.style.opacity = opacity;
        if (cursorTrail && cursorTrail.style) cursorTrail.style.opacity = opacity;
    };

    // Add cursor event listeners
    if (!isTouch && cursor && cursorTrail) {
        window.addEventListener('mousemove', updateCursor);
        document.addEventListener('mouseenter', () => handleCursorVisibility(true));
        document.addEventListener('mouseleave', () => handleCursorVisibility(false));
    }

    const sections = document.querySelectorAll('section');
    
    const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: '0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Only trigger once
                sectionObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // Mobile menu toggle (if needed in the future)
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});
