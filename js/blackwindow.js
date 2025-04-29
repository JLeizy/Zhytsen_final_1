// Улучшенная версия функции закрытия
function closeWelcome() {
  const overlay = document.getElementById('welcomeOverlay');
  overlay.style.opacity = '0';
  overlay.style.pointerEvents = 'none'; // Блокируем взаимодействие
  
  // Плавное скрытие через время анимации
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 500); // Соответствует времени transition в CSS
  
  sessionStorage.setItem('welcomeShown', 'true');
}

// Инициализация при загрузке
window.addEventListener('DOMContentLoaded', () => {
  const overlay = document.getElementById('welcomeOverlay');
  
  if (!sessionStorage.getItem('welcomeShown')) {
    overlay.style.display = 'flex';
    // Небольшая задержка для активации transition
    requestAnimationFrame(() => {
      overlay.style.opacity = '1';
      overlay.style.pointerEvents = 'auto';
    });
  }
});

// Обработчик для навигации назад/вперед
window.addEventListener('pageshow', (event) => {
  if (event.persisted) {
    document.getElementById('welcomeOverlay').style.display = 'none';
  }
});