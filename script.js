// Intro Animation
document.addEventListener('DOMContentLoaded', function() {
    const introScreen = document.getElementById('intro-screen');
    const mainContent = document.getElementById('main-content');
    const neonTitle = document.getElementById('neon-title');
    const neonSubtitle = document.getElementById('neon-subtitle');

    // Typing effect for title
    const titleText = 'HIEU NPC';
    const subtitleText = 'Fullstack Developer';
    let titleIndex = 0;
    let subtitleIndex = 0;

    neonTitle.textContent = '';
    neonSubtitle.textContent = '';

    function typeTitle() {
        if (titleIndex < titleText.length) {
            neonTitle.textContent += titleText.charAt(titleIndex);
            titleIndex++;
            setTimeout(typeTitle, 150);
        } else {
            setTimeout(typeSubtitle, 300);
        }
    }

    function typeSubtitle() {
        if (subtitleIndex < subtitleText.length) {
            neonSubtitle.textContent += subtitleText.charAt(subtitleIndex);
            subtitleIndex++;
            setTimeout(typeSubtitle, 100);
        }
    }

    // Start typing animation
    setTimeout(typeTitle, 500);

    // Hide intro screen after animation
    setTimeout(() => {
        introScreen.style.display = 'none';
        mainContent.classList.remove('hidden');
        
        // Add animation to elements on page load
        animateOnScroll();
    }, 3500);

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Animate elements on scroll
    function animateOnScroll() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
                }
            });
        }, observerOptions);

        // Observe skill categories
        document.querySelectorAll('.skill-category').forEach((el, index) => {
            el.style.opacity = '0';
            el.style.animationDelay = `${index * 0.1}s`;
            observer.observe(el);
        });

        // Observe project cards
        document.querySelectorAll('.project-card').forEach((el, index) => {
            el.style.opacity = '0';
            el.style.animationDelay = `${index * 0.15}s`;
            observer.observe(el);
        });

        // Observe contact links
        document.querySelectorAll('.contact-link').forEach((el, index) => {
            el.style.opacity = '0';
            el.style.animationDelay = `${index * 0.1}s`;
            observer.observe(el);
        });
    }

    // Add parallax effect to hero section
    let lastScrollY = window.scrollY;
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        const hero = document.querySelector('.hero');
        
        if (hero) {
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrollY * parallaxSpeed}px)`;
        }

        lastScrollY = scrollY;
    });

    // Add hover effect to skill items
    document.querySelectorAll('.skill-item').forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) rotate(2deg)';
        });

        item.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1) rotate(0deg)';
        });
    });

    // Add interactive cursor effect
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary-color);
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 9999;
        transition: transform 0.2s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.display = 'block';
    });

    function animateCursor() {
        const delay = 0.1;
        cursorX += (mouseX - cursorX) * delay;
        cursorY += (mouseY - cursorY) * delay;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Add click effects on interactive elements
    document.querySelectorAll('a, .btn').forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.borderColor = 'var(--secondary-color)';
        });

        element.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
            cursor.style.borderColor = 'var(--primary-color)';
        });

        element.addEventListener('click', (e) => {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: radial-gradient(circle, rgba(0, 255, 136, 0.3) 0%, transparent 70%);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s ease-out;
                pointer-events: none;
            `;

            element.style.position = 'relative';
            element.style.overflow = 'hidden';
            element.appendChild(ripple);

            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add dynamic gradient animation to gradient text
    const gradientTexts = document.querySelectorAll('.gradient-text');
    gradientTexts.forEach(text => {
        let hue = 0;
        setInterval(() => {
            hue = (hue + 1) % 360;
            text.style.filter = `hue-rotate(${hue}deg)`;
        }, 50);
    });

    // Add particle effect to hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: var(--primary-color);
                border-radius: 50%;
                left: ${Math.random() * 100}%;
                top: ${Math.random() * 100}%;
                opacity: ${Math.random() * 0.5};
                animation: float ${5 + Math.random() * 10}s infinite ease-in-out;
                animation-delay: ${Math.random() * 5}s;
            `;
            hero.appendChild(particle);
        }
    }

    // Add CSS animation for particles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0);
            }
            25% {
                transform: translate(10px, -10px);
            }
            50% {
                transform: translate(-10px, 10px);
            }
            75% {
                transform: translate(-5px, -15px);
            }
        }

        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add typing indicator to hero section
    const heroSubtitle = document.querySelector('.hero-subtitle');
    if (heroSubtitle) {
        const cursor = document.createElement('span');
        cursor.textContent = '|';
        cursor.style.cssText = `
            color: var(--primary-color);
            animation: blink 1s infinite;
        `;
        heroSubtitle.appendChild(cursor);

        const blinkStyle = document.createElement('style');
        blinkStyle.textContent = `
            @keyframes blink {
                0%, 50% { opacity: 1; }
                51%, 100% { opacity: 0; }
            }
        `;
        document.head.appendChild(blinkStyle);
    }

    // Console welcome message
    console.log('%c👋 Welcome to Hieu\'s Portfolio!', 'color: #00ff88; font-size: 20px; font-weight: bold;');
    console.log('%c🚀 Built with HTML, CSS, and JavaScript', 'color: #0088ff; font-size: 14px;');
    console.log('%c💡 Feel free to explore the code!', 'color: #ff0088; font-size: 14px;');
});
