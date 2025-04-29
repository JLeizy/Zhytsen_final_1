document.addEventListener('DOMContentLoaded', () => {
    // Плавный скролл
    const scrollBtn = document.getElementById('locationScrollBtn');
    const mapSection = document.getElementById('locationMap');

    scrollBtn.addEventListener('click', () => {
        mapSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    });

    // Параллакс-эффект
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.uni-map-container');
        
        parallaxElements.forEach(el => {
            const speed = 0.15;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Эффект наведения для стеклянных элементов
    document.querySelectorAll('.uni-glass-container').forEach(container => {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            container.style.setProperty('--mouse-x', `${x}px`);
            container.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});