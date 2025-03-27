document.addEventListener('DOMContentLoaded', function() {
    const pages = document.querySelectorAll('.page');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const bookCover = document.querySelector('.book-cover');
    let currentPage = 0;
    
    // Show first page initially
    pages[currentPage].style.display = 'flex';
    
    // Function to update page visibility
    function updatePages() {
        pages.forEach((page, index) => {
            if (index === currentPage) {
                page.style.display = 'flex';
            } else {
                page.style.display = 'none';
            }
        });
        
        // Disable prev button on first page
        prevBtn.disabled = currentPage === 0;
        
        // Disable next button on last page
        nextBtn.disabled = currentPage === pages.length - 1;
    }
    
    // Next button click handler
    nextBtn.addEventListener('click', function() {
        if (currentPage < pages.length - 1) {
            currentPage++;
            updatePages();
            
            // Flip book cover on first page turn
            if (currentPage === 1) {
                gsap.to(bookCover, {
                    rotationY: -180,
                    duration: 1,
                    ease: "power2.inOut"
                });
            }
        }
    });
    
    // Previous button click handler
    prevBtn.addEventListener('click', function() {
        if (currentPage > 0) {
            currentPage--;
            updatePages();
            
            // Flip book cover back when returning to first page
            if (currentPage === 0) {
                gsap.to(bookCover, {
                    rotationY: 0,
                    duration: 1,
                    ease: "power2.inOut"
                });
            }
        }
    });
    
    // Initialize button states
    updatePages();
});