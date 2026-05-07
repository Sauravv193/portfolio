// Modern Portfolio JavaScript with Advanced Animations

class PortfolioApp {
    constructor() {
        this.emailJsServiceId = 'YOUR_EMAILJS_SERVICE_ID';
        this.emailJsTemplateId = 'YOUR_EMAILJS_TEMPLATE_ID';
        this.emailJsPublicKey = 'YOUR_EMAILJS_PUBLIC_KEY';

        this.initializeElements();
        this.initializeEventListeners();
        this.startPreloader();
        this.createParticles();
        this.setupCustomCursor();
        this.setupSkillAnimations();
        this.setupProjectFilters();
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
        this.statNumbers = document.querySelectorAll('.stat-number');
        this.gameBoard = document.getElementById('gameBoard');
        this.signalTarget = document.getElementById('signalTarget');
        this.gameScore = document.getElementById('gameScore');
        this.gameTime = document.getElementById('gameTime');
        this.bestScore = document.getElementById('bestScore');
        this.startGameBtn = document.getElementById('startGameBtn');
        this.resetGameBtn = document.getElementById('resetGameBtn');
        this.visitorCount = document.getElementById('visitorCount');
        this.likeCount = document.getElementById('likeCount');
        this.likeButton = document.getElementById('likeButton');

        // Animation elements
        this.fadeElements = document.querySelectorAll('.fade-in');
        this.floatingCards = document.querySelectorAll('.floating-card');
        this.profileImage = document.querySelector('.profile-image img');

        this.gameState = {
            score: 0,
            time: 30,
            active: false,
            timer: null
        };
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
        
        // Image loading optimization
        this.optimizeImageLoading();

        this.setupMiniGame();
        this.setupEngagementCounters();
    }

    // Preloader Animation
    startPreloader() {
        const loadingProgress = document.querySelector('.loading-progress');
        const loadingPercentage = document.querySelector('.loading-percentage');
        if (!this.preloader || !loadingProgress || !loadingPercentage) return;

        let progress = 0;
        let finished = false;
        const startedAt = Date.now();
        const minimumLoadTime = 1200;

        const updateLoader = (value) => {
            progress = Math.min(100, Math.max(0, value));
            loadingProgress.style.width = `${progress}%`;
            loadingPercentage.textContent = `${Math.round(progress)}%`;
        };

        const interval = setInterval(() => {
            if (finished) return;

            const nextProgress = progress + Math.random() * 8 + 3;
            updateLoader(Math.min(nextProgress, 92));
        }, 140);

        const finishLoader = () => {
            if (finished) return;
            finished = true;
            clearInterval(interval);

            const remainingTime = Math.max(0, minimumLoadTime - (Date.now() - startedAt));

            setTimeout(() => {
                updateLoader(100);

                setTimeout(() => {
                    this.preloader.classList.add('hidden');
                    this.animateHeroEntry();
                }, 450);
            }, remainingTime);
        };

        updateLoader(0);

        if (document.readyState === 'complete') {
            setTimeout(finishLoader, 300);
        } else {
            window.addEventListener('load', finishLoader, { once: true });
        }

        setTimeout(finishLoader, 4000);
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
                this.cursor.style.background = '#9e363a';
            });

            el.addEventListener('mouseleave', () => {
                this.cursor.style.transform = 'scale(1)';
                this.cursorFollower.style.transform = 'scale(1)';
                this.cursor.style.background = '#0f2862';
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
        });
    }

    updateNavbarOnScroll() {
        const scrollY = window.scrollY;
        
        if (scrollY > 100) {
            this.navContainer.classList.add('scrolled');
        } else {
            this.navContainer.classList.remove('scrolled');
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
        // Parallax behavior removed to prevent scroll layout issues.
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

    setupMiniGame() {
        if (!this.gameBoard || !this.signalTarget) return;

        const savedBest = Number(localStorage.getItem('portfolioBestScore')) || 0;
        this.bestScore.textContent = savedBest;
        this.positionSignalTarget();

        this.startGameBtn?.addEventListener('click', () => this.toggleMiniGame());
        this.resetGameBtn?.addEventListener('click', () => this.resetMiniGame());
        this.signalTarget.addEventListener('click', () => this.catchSignal());
        window.addEventListener('resize', () => this.positionSignalTarget());
    }

    toggleMiniGame() {
        if (this.gameState.active) {
            this.stopMiniGame();
            return;
        }

        this.startMiniGame();
    }

    startMiniGame() {
        if (this.gameState.active) return;

        this.gameState.score = 0;
        this.gameState.time = 30;
        this.gameState.active = true;
        this.updateGameStats();
        this.updateStartGameButton(true);
        this.positionSignalTarget();

        this.gameState.timer = setInterval(() => {
            this.gameState.time -= 1;
            this.updateGameStats();

            if (this.gameState.time <= 0) {
                this.endMiniGame();
            }
        }, 1000);
    }

    catchSignal() {
        if (!this.gameState.active) {
            this.startMiniGame();
            return;
        }

        this.gameState.score += 1;
        this.updateGameStats();
        this.updateBestScore();
        this.positionSignalTarget();
    }

    resetMiniGame() {
        clearInterval(this.gameState.timer);
        this.gameState.score = 0;
        this.gameState.time = 30;
        this.gameState.active = false;
        this.updateGameStats();
        this.updateStartGameButton(false);
        this.positionSignalTarget();
    }

    endMiniGame() {
        clearInterval(this.gameState.timer);
        this.gameState.active = false;
        this.updateBestScore();
        this.updateStartGameButton(false);
    }

    stopMiniGame() {
        clearInterval(this.gameState.timer);
        this.gameState.active = false;
        this.updateBestScore();
        this.updateStartGameButton(false);
    }

    updateBestScore() {
        const savedBest = Number(localStorage.getItem('portfolioBestScore')) || 0;
        if (this.gameState.score > savedBest) {
            localStorage.setItem('portfolioBestScore', this.gameState.score);
            this.bestScore.textContent = this.gameState.score;
        }
    }

    updateStartGameButton(isPlaying) {
        const icon = this.startGameBtn?.querySelector('i');
        const label = this.startGameBtn?.querySelector('span');

        if (icon) {
            icon.className = isPlaying ? 'fas fa-stop' : 'fas fa-play';
        }

        if (label) {
            label.textContent = isPlaying ? 'Stop' : 'Start';
        }
    }

    updateGameStats() {
        if (this.gameScore) this.gameScore.textContent = this.gameState.score;
        if (this.gameTime) this.gameTime.textContent = this.gameState.time;
    }

    positionSignalTarget() {
        if (!this.gameBoard || !this.signalTarget) return;

        const boardWidth = this.gameBoard.clientWidth;
        const boardHeight = this.gameBoard.clientHeight;
        const targetSize = this.signalTarget.offsetWidth || 58;
        const padding = 18;
        const minX = padding + targetSize / 2;
        const minY = padding + targetSize / 2;
        const maxX = Math.max(minX, boardWidth - padding - targetSize / 2);
        const maxY = Math.max(minY, boardHeight - padding - targetSize / 2);
        const nextX = minX + Math.random() * (maxX - minX);
        const nextY = minY + Math.random() * (maxY - minY);

        this.signalTarget.style.left = `${nextX}px`;
        this.signalTarget.style.top = `${nextY}px`;
    }

    setupEngagementCounters() {
        if (!this.visitorCount || !this.likeCount || !this.likeButton) return;

        const counterApiBase = 'https://countapi.mileshilliard.com/api/v1';
        const visitCounter = 'saurav-kumar-singh-portfolio-visits';
        const likeCounter = 'saurav-kumar-singh-portfolio-likes';
        const visitKey = 'portfolioVisitCount';
        const likeKey = 'portfolioLikeCount';
        const likedKey = 'portfolioLiked';

        const updateCount = (element, value) => {
            const count = Number(value);
            if (Number.isFinite(count)) {
                element.textContent = Math.max(0, Math.round(count));
            }
        };

        const saveFallbackCount = (key, value) => {
            if (Number.isFinite(Number(value))) {
                localStorage.setItem(key, String(Math.max(0, Math.round(Number(value)))));
            }
        };

        const requestCounter = async (name, action = 'get') => {
            const response = await fetch(`${counterApiBase}/${action}/${name}`, {
                cache: 'no-store'
            });

            if (action === 'get' && response.status === 404) {
                return 0;
            }

            if (!response.ok) {
                throw new Error(`Counter request failed: ${response.status}`);
            }

            const data = await response.json();
            const value = Number(
                data.value ??
                data.count ??
                data.Count ??
                data.old_value ??
                data.data?.value ??
                data.data?.count ??
                data.data?.Count ??
                data.data
            );

            if (!Number.isFinite(value)) {
                throw new Error('Counter response did not include a number');
            }

            return value;
        };

        const refreshCounters = async () => {
            try {
                const [visits, likes] = await Promise.all([
                    requestCounter(visitCounter),
                    requestCounter(likeCounter)
                ]);

                updateCount(this.visitorCount, visits);
                updateCount(this.likeCount, likes);
                saveFallbackCount(visitKey, visits);
                saveFallbackCount(likeKey, likes);
            } catch (error) {
                updateCount(this.visitorCount, Number(localStorage.getItem(visitKey)) || 0);
                updateCount(this.likeCount, Number(localStorage.getItem(likeKey)) || 0);
            }
        };

        const registerVisit = async () => {
            try {
                const visits = await requestCounter(visitCounter, 'hit');
                updateCount(this.visitorCount, visits);
                saveFallbackCount(visitKey, visits);
            } catch (error) {
                const fallbackVisits = (Number(localStorage.getItem(visitKey)) || 0) + 1;
                updateCount(this.visitorCount, fallbackVisits);
                saveFallbackCount(visitKey, fallbackVisits);
            }
        };

        updateCount(this.visitorCount, Number(localStorage.getItem(visitKey)) || 0);
        updateCount(this.likeCount, Number(localStorage.getItem(likeKey)) || 0);
        this.updateLikeButton(localStorage.getItem(likedKey) === 'true');

        registerVisit().finally(refreshCounters);
        setInterval(refreshCounters, 30000);

        this.likeButton.addEventListener('click', async () => {
            const isLiked = localStorage.getItem(likedKey) === 'true';
            const fallbackLikes = Number(localStorage.getItem(likeKey)) || 0;

            if (isLiked) {
                this.updateLikeButton(true);
                return;
            }

            this.likeButton.disabled = true;

            try {
                const likes = await requestCounter(likeCounter, 'hit');
                updateCount(this.likeCount, likes);
                saveFallbackCount(likeKey, likes);
                localStorage.setItem(likedKey, 'true');
                this.updateLikeButton(true);
            } catch (error) {
                const likes = fallbackLikes + 1;
                updateCount(this.likeCount, likes);
                saveFallbackCount(likeKey, likes);
                localStorage.setItem(likedKey, 'true');
                this.updateLikeButton(true);
            } finally {
                this.likeButton.disabled = false;
            }
        });
    }

    updateLikeButton(isLiked) {
        if (!this.likeButton) return;

        this.likeButton.classList.toggle('liked', isLiked);
        this.likeButton.setAttribute('aria-pressed', String(isLiked));
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

    // Image Loading Optimization
    optimizeImageLoading() {
        const images = document.querySelectorAll('.project-image img');
        
        images.forEach(img => {
            // Add loading class
            img.classList.add('loading');
            
            // Handle successful load
            img.addEventListener('load', () => {
                img.classList.remove('loading');
                img.classList.add('loaded');
            });
            
            // Handle error with retry mechanism
            img.addEventListener('error', (e) => {
                console.warn('Image failed to load:', img.src);
                img.classList.remove('loading');
                img.classList.add('error');
                
                // Trigger fallback if onerror attribute exists
                if (img.onerror) {
                    img.onerror();
                }
            });
        });
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
