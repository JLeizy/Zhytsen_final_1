document.addEventListener('DOMContentLoaded', function() {
    const targetDate = new Date('2025-04-29T00:00:00'); // ← Здесь измененная дата
    const daysElement = document.getElementById('days');
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const descriptionElement = document.querySelector('.countdown-description');

    // ... остальной код без изменений 
    function updateTimer() {
        const now = new Date().getTime();
        const diff = targetDate - now;

        if (diff <= 0) {
            descriptionElement.textContent = 'Жыцень пробудился!';
            return;
        }

        const days = Math.floor(diff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((diff % (1000 * 60)) / 1000);

        daysElement.textContent = days.toString().padStart(2, '0');
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');

        [daysElement, hoursElement, minutesElement, secondsElement].forEach(el => {
            el.style.transform = 'scale(1.1)';
            setTimeout(() => el.style.transform = 'scale(1)', 200);
        });
    }

    updateTimer();
    setInterval(updateTimer, 1000);

    document.querySelector('.countdown-wrapper').addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth - 0.5;
        const y = e.clientY / window.innerHeight - 0.5;
        
        document.querySelectorAll('.time-block').forEach(block => {
            block.style.transform = `
                translateY(-5px)
                rotateX(${y * 8}deg)
                rotateY(${x * 8}deg)
            `;
        });
    });

    document.querySelector('.countdown-wrapper').addEventListener('mouseleave', () => {
        document.querySelectorAll('.time-block').forEach(block => {
            block.style.transform = 'translateY(-5px)';
        });
    });
});