class SmoothScroll {
    constructor() {
        this.duration = 800;
        this.easing = t => t*(2-t); // easeOutQuad
        this.init();
    }

    init() {
        document.querySelectorAll('.nav-button').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = btn.dataset.target;
                const target = document.getElementById(targetId);
                this.scrollTo(target);
            });
        });
    }

    scrollTo(target) {
        if (!target) return;

        const start = performance.now();
        const startY = window.scrollY;
        const targetY = target.offsetTop;
        const distance = targetY - startY;
        const headerHeight = 0; // Можно добавить высоту фиксированного хедера

        const animate = (now) => {
            const time = Math.min(now - start, this.duration);
            const progress = this.easing(time / this.duration);
            
            window.scrollTo(0, startY + distance * progress);
            
            if (time < this.duration) {
                requestAnimationFrame(animate);
            }
        }

        requestAnimationFrame(animate);
    }
}

// Инициализация при полной загрузке страницы
window.addEventListener('load', () => {
    const scrollManager = new SmoothScroll();
    
    // Дополнительные оптимизации
    document.body.style.transform = 'translateZ(0)';
    document.body.style.backfaceVisibility = 'hidden';
    
    // Логирование ошибок
    window.addEventListener('error', (e) => {
        console.error('Scroll Error:', e.message);
    });
});

// Полифиллы для старых браузеров
if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (callback) => {
        setTimeout(callback, 1000/60);
    }
}