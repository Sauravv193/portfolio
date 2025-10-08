document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const bookCover = document.querySelector('.book-cover');
    const pageIndicator = document.getElementById('page-indicator');
    const profileCircle = document.querySelector('.profile-circle');
    let currentPage = 0;
    const totalPages = pages.length;
    
    // Initialize floating animations
    const floatElements = document.querySelectorAll('.floating');
    floatElements.forEach(el => {
        el.style.animationDuration = `${5 + Math.random() * 3}s`;
        el.style.animationDelay = `${Math.random() * 2}s`;
    });
    
    // 3D tilt effect for profile circle
    profileCircle.addEventListener('mousemove', (e) => {
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        profileCircle.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg) translateZ(30px)`;
    });
    
    profileCircle.addEventListener('mouseleave', () => {
        profileCircle.style.transform = 'translateZ(30px)';
    });
    
    // Show initial page
    showPage(currentPage);
    
    function showPage(index) {
        // Update current page
        currentPage = index;
        
        // Update page visibility and animations
        pages.forEach((page, i) => {
            if (i === index) {
                page.style.display = 'flex';
                gsap.to(page, {
                    rotationY: 0,
                    zIndex: 1,
                    duration: 0.8,
                    ease: "power3.out"
                });
            } else {
                if (i < index) {
                    // Pages to the left
                    gsap.to(page, {
                        rotationY: -60,
                        zIndex: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        onComplete: () => {
                            page.style.display = 'none';
                        }
                    });
                } else {
                    // Pages to the right
                    gsap.to(page, {
                        rotationY: 60,
                        zIndex: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        onComplete: () => {
                            page.style.display = 'none';
                        }
                    });
                }
            }
        });
        
        // Update page indicator
        pageIndicator.textContent = `${index + 1}/${totalPages}`;
        
        // Update button states
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === totalPages - 1;
        
        // Flip book cover on first/last page
        if (index === 0) {
            gsap.to(bookCover, {
                rotationY: 0,
                duration: 1.2,
                ease: "back.out(1.2)"
            });
        } else if (index === 1) {
            gsap.to(bookCover, {
                rotationY: -180,
                duration: 1.2,
                ease: "back.out(1.2)"
            });
        }
    }
    
    // Navigation handlers
    nextBtn.addEventListener('click', () => {
        if (currentPage < totalPages - 1) {
            showPage(currentPage + 1);
        }
    });
    
    prevBtn.addEventListener('click', () => {
        if (currentPage > 0) {
            showPage(currentPage - 1);
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            nextBtn.click();
        } else if (e.key === 'ArrowLeft') {
            prevBtn.click();
        }
    });
    
    // Touch swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});
    
    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});
    
    function handleSwipe() {
        const threshold = 50;
        if (touchEndX < touchStartX - threshold) {
            nextBtn.click();
        } else if (touchEndX > touchStartX + threshold) {
            prevBtn.click();
        }
    }
});