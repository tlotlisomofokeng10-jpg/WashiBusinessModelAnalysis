document.addEventListener('DOMContentLoaded', () => {
    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.fade-in-up');
    elementsToAnimate.forEach(el => observer.observe(el));

    // Add a subtle parallax effect to background blobs
    document.addEventListener('mousemove', (e) => {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;

        const blobs = document.querySelectorAll('.blob');
        blobs.forEach((blob, index) => {
            const depth = (index + 1) * 30; // parallax depth multiplier
            const moveX = mouseX * depth;
            const moveY = mouseY * depth;
            
            // Note: In CSS we have a CSS animation playing, this will stack with it 
            // by adding translation on top (since the CSS animation uses transform too, 
            // we should ideally wrap the blob in another div if we want both, 
            // but setting margin or left/top works as an alternative hack).
            blob.style.marginLeft = `${moveX}px`;
            blob.style.marginTop = `${moveY}px`;
        });
    });
});
