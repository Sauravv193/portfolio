// Modern Portfolio JavaScript with Advanced Animations

class PortfolioApp {
    constructor() {
        this.initializeElements();
        this.initializeEventListeners();
        this.startPreloader();
        this.createParticles();
        this.setupCustomCursor();
        this.setupSkillAnimations();
        this.setupProjectFilters();
        this.setupFormValidation();
    }

    initializeElements() {
        // Core elements
        this.preloader = document.getElementById('preloader');
        this.navContainer = document.querySelector('.nav-container');
        this.navMenu = document.querySelector('.nav-menu');
        this.navToggle = document.querySelector('.nav-toggle');
        this.navLinks = document.querySelectorAll('.nav-link');
        this.sections = document.querySelectorAll('section');
        
        // Interactive elements
        this.cursor = document.querySelector('.cursor');
        this.cursorFollower = document.querySelector('.cursor-follower');
        this.particlesContainer = document.getElementById('particles');
        this.skillBars = document.querySelectorAll('.skill-progress');
        this.filterButtons = document.querySelectorAll('.filter-btn');
        this.projectCards = document.querySelectorAll('.project-card');
        this.contactForm = document.getElementById('contactForm');
        this.statNumbers = document.querySelectorAll('.stat-number');

        // Animation elements
        this.fadeElements = document.querySelectorAll('.fade-in');
        this.floatingCards = document.querySelectorAll('.floating-card');
        this.profileImage = document.querySelector('.profile-image img');
    }

    initializeEventListeners() {
        // Navigation
        this.navToggle?.addEventListener('click', () => this.toggleMobileMenu());
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());
        
        // Mouse events for cursor
        document.addEventListener('mousemove', (e) => this.updateCursor(e));
        
        // Intersection Observer
        this.observeElements();
        
        // Form submission
        this.contactForm?.addEventListener('submit', (e) => this.handleFormSubmit(e));
    }

    // Preloader Animation
    startPreloader() {
        const loadingProgress = document.querySelector('.loading-progress');
        let progress = 0;
        
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress >= 100) {
                progress = 100;
                loadingProgress.style.width = '100%';
                
                setTimeout(() => {
                    this.preloader.classList.add('hidden');
                    this.animateHeroEntry();
                }, 800);
                
                clearInterval(interval);
            } else {
                loadingProgress.style.width = progress + '%';
            }
        }, 200);
    }

    // Hero Section Entry Animation
    animateHeroEntry() {
        const heroText = document.querySelector('.hero-text');
        const heroImage = document.querySelector('.hero-image');
        const scrollIndicator = document.querySelector('.scroll-indicator');

        if (heroText) {
            heroText.style.opacity = '0';
            heroText.style.transform = 'translateX(-50px)';
            
            setTimeout(() => {
                heroText.style.transition = 'all 1s ease';
                heroText.style.opacity = '1';
                heroText.style.transform = 'translateX(0)';
            }, 300);
        }

        if (heroImage) {
            heroImage.style.opacity = '0';
            heroImage.style.transform = 'translateX(50px)';
            
            setTimeout(() => {
                heroImage.style.transition = 'all 1s ease';
                heroImage.style.opacity = '1';
                heroImage.style.transform = 'translateX(0)';
                
                // Animate floating cards
                this.animateFloatingCards();
            }, 600);
        }

        if (scrollIndicator) {
            setTimeout(() => {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.animation = 'bounce 2s infinite';
            }, 1500);
        }
    }

    // Floating Cards Animation
    animateFloatingCards() {
        this.floatingCards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px) scale(0.8)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.8s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0) scale(1)';
            }, index * 300);
        });
    }

    // Custom Cursor
    setupCustomCursor() {
        if (window.innerWidth <= 768) return; // Disable on mobile

        const interactiveElements = document.querySelectorAll(
            'a, button, .project-card, .skill-category, .nav-link, .filter-btn'
        );

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.style.transform = 'scale(2)';
                this.cursorFollower.style.transform = 'scale(0.5)';
                this.cursor.style.background = '#10b981';
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursorFollower.style.transform = 'scale(1)';
                this.cursor.style.background = '#0d9488';
            });
        });
    }

    updateCursor(e) {
        if (window.innerWidth <= 768) return;

        requestAnimationFrame(() => {
            this.cursor.style.left = e.clientX + 'px';
            this.cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                this.cursorFollower.style.left = e.clientX + 'px';
                this.cursorFollower.style.top = e.clientY + 'px';
            }, 100);
        });
    }

    // Particle System
    createParticles() {
        const particleCount = window.innerWidth > 768 ? 50 : 20;
        
        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            // Random positioning and size
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 20 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            
            // Random color variation
            const opacity = Math.random() * 0.5 + 0.1;
            particle.style.background = `rgba(255, 255, 255, ${opacity})`;
            
            this.particlesContainer.appendChild(particle);
        }
    }

    // Navigation
    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerHeight = 100;
            const targetPosition = targetSection.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
            
            // Update active nav link
            this.updateActiveNavLink(e.target);
            
            // Close mobile menu if open
            this.navMenu.classList.remove('active');
            this.navToggle.classList.remove('active');
        }
    }

    updateActiveNavLink(activeLink) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        activeLink.classList.add('active');
    }

    // Scroll Handling
    handleScroll() {
        requestAnimationFrame(() => {
            this.updateNavbarOnScroll();
            this.updateActiveSection();
            this.handleParallaxEffect();
        });
    }

    updateNavbarOnScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            this.navContainer.style.background = 'rgba(255, 255, 255, 0.95)';
            this.navContainer.style.backdropFilter = 'blur(25px)';
            this.navContainer.style.transform = 'translateX(-50%) scale(0.95)';
        } else {
            this.navContainer.style.background = 'rgba(255, 255, 255, 0.1)';
            this.navContainer.style.backdropFilter = 'blur(20px)';
            this.navContainer.style.transform = 'translateX(-50%) scale(1)';
        }
    }

    updateActiveSection() {
        const scrollPos = window.scrollY + 150;

        this.sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    handleParallaxEffect() {
        const scrolled = window.pageYOffset;
        const heroSection = document.querySelector('.hero-section');
        
        if (heroSection) {
            const speed = 0.5;
            heroSection.style.transform = `translateY(${scrolled * speed}px)`;
        }

        // Parallax for floating cards
        this.floatingCards.forEach((card, index) => {
            const speed = 0.2 + (index * 0.1);
            card.style.transform += ` translateY(${scrolled * speed * 0.1}px)`;
        });
    }

    // Intersection Observer for Animations
    observeElements() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Special animations for specific elements
                    if (entry.target.classList.contains('stat-number')) {
                        this.animateCounter(entry.target);
                    }
                    
                    if (entry.target.classList.contains('skill-progress')) {
                        this.animateSkillBar(entry.target);
                    }
                    
                    if (entry.target.classList.contains('project-card')) {
                        this.animateProjectCard(entry.target);
                    }
                }
            });
        }, observerOptions);

        // Observe fade-in elements
        this.fadeElements.forEach(el => {
            el.classList.add('fade-in');
            observer.observe(el);
        });

        // Observe stat numbers
        this.statNumbers.forEach(stat => observer.observe(stat));
        
        // Observe skill bars
        this.skillBars.forEach(bar => observer.observe(bar));
        
        // Observe project cards
        this.projectCards.forEach(card => observer.observe(card));
    }

    // Counter Animation
    animateCounter(element) {
        const target = parseFloat(element.textContent);
        const suffix = element.textContent.includes('+') ? '+' : '';
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target % 1 === 0) {
                element.textContent = Math.floor(current) + suffix;
            } else {
                element.textContent = current.toFixed(2) + suffix;
            }
        }, stepTime);
    }

    // Skill Bar Animation
    animateSkillBar(skillBar) {
        const targetWidth = skillBar.getAttribute('data-width');
        skillBar.style.width = '0';
        
        setTimeout(() => {
            skillBar.style.transition = 'width 1.5s ease';
            skillBar.style.width = targetWidth;
        }, 200);
    }

    setupSkillAnimations() {
        // Add hover effects to skill categories
        const skillCategories = document.querySelectorAll('.skill-category');
        
        skillCategories.forEach(category => {
            category.addEventListener('mouseenter', () => {
                category.style.transform = 'translateY(-10px) scale(1.02)';
                category.style.boxShadow = '0 25px 50px rgba(0,0,0,0.25)';
            });
            
            category.addEventListener('mouseleave', () => {
                category.style.transform = 'translateY(0) scale(1)';
                category.style.boxShadow = '0 8px 32px rgba(31, 38, 135, 0.37)';
            });
        });
    }

    // Project Card Animation
    animateProjectCard(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            card.style.transition = 'all 0.8s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, 100);
    }

    // Project Filtering
    setupProjectFilters() {
        this.filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter');
                this.filterProjects(filter);
                this.updateActiveFilter(button);
            });
        });
    }

    filterProjects(filter) {
        this.projectCards.forEach((card, index) => {
            const cardCategory = card.getAttribute('data-category');
            
            if (filter === 'all' || cardCategory === filter) {
                card.style.display = 'block';
                
                // Staggered animation
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                }, index * 100);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px) scale(0.9)';
                
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    updateActiveFilter(activeButton) {
        this.filterButtons.forEach(btn => btn.classList.remove('active'));
        activeButton.classList.add('active');
        
        // Add click ripple effect
        this.createRippleEffect(activeButton);
    }

    createRippleEffect(element) {
        const ripple = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = (rect.width / 2 - size / 2) + 'px';
        ripple.style.top = (rect.height / 2 - size / 2) + 'px';
        ripple.classList.add('ripple');
        
        element.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }

    // Form Handling
    setupFormValidation() {
        const inputs = document.querySelectorAll('.form-group input, .form-group textarea');
        
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                input.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', () => {
                if (!input.value) {
                    input.parentElement.classList.remove('focused');
                }
            });
            
            input.addEventListener('input', () => {
                this.validateField(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        const fieldType = field.type;
        let isValid = true;
        
        if (fieldType === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
        } else {
            isValid = value.length > 0;
        }
        
        if (isValid) {
            field.parentElement.classList.remove('error');
            field.parentElement.classList.add('success');
        } else {
            field.parentElement.classList.remove('success');
            field.parentElement.classList.add('error');
        }
        
        return isValid;
    }

    handleFormSubmit(e) {
        e.preventDefault();
        
        const formData = new FormData(this.contactForm);
        const submitBtn = this.contactForm.querySelector('.submit-btn');
        const btnText = submitBtn.querySelector('.btn-text');
        const btnIcon = submitBtn.querySelector('.btn-icon');
        
        // Validate all fields
        const inputs = this.contactForm.querySelectorAll('input, textarea');
        let allValid = true;
        
        inputs.forEach(input => {
            if (!this.validateField(input)) {
                allValid = false;
            }
        });
        
        if (!allValid) {
            this.showNotification('Please fill in all fields correctly.', 'error');
            return;
        }
        
        // Show loading state
        btnText.textContent = 'Sending...';
        btnIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            btnText.textContent = 'Message Sent!';
            btnIcon.innerHTML = '<i class="fas fa-check"></i>';
            
            this.showNotification('Thank you! Your message has been sent successfully.', 'success');
            
            setTimeout(() => {
                btnText.textContent = 'Send Message';
                btnIcon.innerHTML = '<i class="fas fa-paper-plane"></i>';
                submitBtn.disabled = false;
                this.contactForm.reset();
                
                // Remove focused classes
                inputs.forEach(input => {
                    input.parentElement.classList.remove('focused', 'success');
                });
            }, 2000);
        }, 2000);
    }

    showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }

    // Responsive Handling
    handleResize() {
        // Recreate particles on resize
        if (this.particlesContainer) {
            this.particlesContainer.innerHTML = '';
            this.createParticles();
        }
        
        // Update cursor behavior
        if (window.innerWidth <= 768) {
            this.cursor.style.display = 'none';
            this.cursorFollower.style.display = 'none';
        } else {
            this.cursor.style.display = 'block';
            this.cursorFollower.style.display = 'block';
        }
    }

    // Utility Methods
    debounce(func, wait) {
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
}

// Additional CSS for animations
const additionalStyles = `
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--glass-bg);
        backdrop-filter: blur(20px);
        border: 1px solid var(--glass-border);
        border-radius: 12px;
        padding: 15px 20px;
        color: white;
        display: flex;
        align-items: center;
        gap: 10px;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        box-shadow: var(--shadow-glass);
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        border-left: 4px solid #10B981;
    }
    
    .notification.error {
        border-left: 4px solid #EF4444;
    }
    
    .form-group.focused label {
        top: -5px;
        font-size: 0.8rem;
        color: var(--accent-color);
    }
    
    .form-group.success input,
    .form-group.success textarea {
        border-bottom-color: #10B981;
    }
    
    .form-group.error input,
    .form-group.error textarea {
        border-bottom-color: #EF4444;
    }
    
    @media (max-width: 768px) {
        .notification {
            left: 20px;
            right: 20px;
            transform: translateY(-100px);
        }
        
        .notification.show {
            transform: translateY(0);
        }
    }
`;

// Inject additional styles
const styleSheet = document.createElement('style');
styleSheet.textContent = additionalStyles;
document.head.appendChild(styleSheet);

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioApp();
    
    console.log('%c🚀 Portfolio Loaded Successfully!', 'color: #10b981; font-size: 16px; font-weight: bold;');
    console.log('%cBuilt with modern web technologies and lots of ❤️', 'color: #0d9488; font-size: 12px;');
});

// Performance optimization for scroll events
let ticking = false;

function updateOnScroll() {
    if (!ticking) {
        requestAnimationFrame(() => {
            // Scroll-based animations would go here
            ticking = false;
        });
        ticking = true;
    }
}

window.addEventListener('scroll', updateOnScroll);

// Service Worker for PWA capabilities (if needed)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // Uncomment if you want to add PWA capabilities
        // navigator.serviceWorker.register('/sw.js');
    });
}