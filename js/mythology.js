document.addEventListener('DOMContentLoaded', () => {
  const elements = {
    introSection: document.querySelector('.uni-intro-section'),
    mythologySection: document.querySelector('.uni-mythology-section'),
    ctaBtn: document.querySelector('.uni-cta-btn'),
    sliderTrack: document.querySelector('.uni-slider-track'),
    prevBtn: document.querySelector('.uni-prev-btn'),
    nextBtn: document.querySelector('.uni-next-btn'),
    currentSlide: document.querySelector('.uni-current-slide'),
    totalSlidesElement: document.querySelector('.uni-total-slides')
  };

  let state = {
    currentIndex: 0,
    isTransitioning: false,
    totalSlides: 0
  };

  const updateSlider = () => {
    if (state.isTransitioning) return;
    
    state.isTransitioning = true;
    elements.sliderTrack.style.transform = `translateX(-${state.currentIndex * 100}%)`;
    
    // Обновление интерфейса
    elements.currentSlide.textContent = state.currentIndex + 1;
    elements.prevBtn.disabled = state.currentIndex === 0;
    elements.nextBtn.disabled = state.currentIndex === state.totalSlides - 1;

    // Сброс состояния после анимации
    setTimeout(() => {
      state.isTransitioning = false;
    }, 500);
  };

  const handleButtonClick = (direction) => {
    if (state.isTransitioning) return;
    
    const newIndex = direction === 'next' 
      ? Math.min(state.currentIndex + 1, state.totalSlides - 1)
      : Math.max(state.currentIndex - 1, 0);
    
    if (newIndex !== state.currentIndex) {
      state.currentIndex = newIndex;
      updateSlider();
    }
  };

  // Инициализация слайдера
  const initSlider = () => {
    state.totalSlides = document.querySelectorAll('.uni-slide').length;
    elements.totalSlidesElement.textContent = state.totalSlides;
    updateSlider();
  };

  // Обработчики событий
  elements.ctaBtn.addEventListener('click', () => {
    elements.introSection.style.opacity = '0';
    elements.introSection.style.pointerEvents = 'none';
    
    setTimeout(() => {
      elements.introSection.style.display = 'none';
      elements.mythologySection.classList.add('active');
      initSlider();
    }, 600);
  });

  elements.prevBtn.addEventListener('click', () => handleButtonClick('prev'));
  elements.nextBtn.addEventListener('click', () => handleButtonClick('next'));

  // Запрет контекстного меню
  document.querySelectorAll('.uni-slide img').forEach(img => {
    img.addEventListener('contextmenu', e => e.preventDefault());
  });

  // Оптимизация для мобильных устройств
  let touchStartX = 0;
  elements.sliderTrack.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });

  elements.sliderTrack.addEventListener('touchend', e => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > 50) {
      handleButtonClick(diff > 0 ? 'next' : 'prev');
    }
  }, { passive: true });
});





