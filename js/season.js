document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.season-btn');
  
  function changeTheme(season) {
      document.body.setAttribute('data-season', season);
      localStorage.setItem('theme', season);
  }

  buttons.forEach(btn => {
      btn.addEventListener('click', () => {
          buttons.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
          changeTheme(btn.dataset.season);
      });
  });

  // Восстановление темы
  const savedTheme = localStorage.getItem('theme') || 'default';
  changeTheme(savedTheme);
  document.querySelector(`[data-season="${savedTheme}"]`).classList.add('active');
});

// Конфигурация моделей
const modelsConfig = {
  default: {
      title: "ЖЫЦЕНЬ",
      embedUrl: "https://sketchfab.com/models/625ede3381ba4e49ba9585725257fc4b/embed",
      captionLinks: {
          model: "https://sketchfab.com/3d-models/625ede3381ba4e49ba9585725257fc4b",
          author: "https://sketchfab.com/fedykfed",
          authorName: "FedFed",
          platform: "https://sketchfab.com"
      }
  },
  summer: {
      title: "лето",
      embedUrl: "https://sketchfab.com/models/843acef414004e05a40f3a127c538ae0/embed",
      captionLinks: {
          model: "https://sketchfab.com/3d-models/843acef414004e05a40f3a127c538ae0",
          author: "https://sketchfab.com/fedykfed",
          authorName: "FedFed",
          platform: "https://sketchfab.com"
      }
  },
  winter: {
      title: "ЗИМА",
      embedUrl: "https://sketchfab.com/models/12bc476b3ce742868d299a4cca4f70b4/embed",
      captionLinks: {
          model: "https://sketchfab.com/3d-models/12bc476b3ce742868d299a4cca4f70b4",
          author: "https://sketchfab.com/fedykfed",
          authorName: "FedFed",
          platform: "https://sketchfab.com"
      }
  }
};

// Функция обновления модели
function updateModel(season) {
    const config = modelsConfig[season];
    const iframe = document.querySelector('.sketchfab-embed-wrapper iframe');
    const caption = document.getElementById('modelCaption');

    // Обновляем iframe
    iframe.src = config.embedUrl;
    
    // Обновляем подпись
    caption.innerHTML = `
        <a href="${config.captionLinks.model}" target="_blank" rel="nofollow">Жыцень</a>
        ад 
        <a href="${config.captionLinks.author}" target="_blank" rel="nofollow">Zhytsen</a>
        на 
        <a href="${config.captionLinks.platform}" target="_blank" rel="nofollow">Sketchfab</a>
    `;
}

// Обработчики для кнопок
document.querySelectorAll('.season-btn').forEach(button => {
    button.addEventListener('click', () => {
        // Удаляем активный класс у всех кнопок
        document.querySelectorAll('.season-btn').forEach(btn => 
            btn.classList.remove('active'));
        
        // Добавляем активный класс текущей кнопке
        button.classList.add('active');
        
        // Получаем выбранный сезон
        const season = button.dataset.season;
        
        // Обновляем модель
        updateModel(season);
    });
});

//Планвная анимация к модельке
class ModelViewer {
  constructor() {
    this.models = {
      default: this.createModelConfig(
        'ЖЫЦЕНЬ',
        '625ede3381ba4e49ba9585725257fc4b',
        'fedykfed',
        'FedFed'
      ),
      summer: this.createModelConfig(
        'лето',
        '843acef414004e05a40f3a127c538ae0',
        'fedykfed',
        'FedFed'
      ),
      winter: this.createModelConfig(
        'ЗИМА',
        '12bc476b3ce742868d299a4cca4f70b4',
        'fedykfed',
        'FedFed'
      )
    };

    this.container = document.querySelector('.model-container');
    this.buttons = Array.from(document.querySelectorAll('.season-btn'));
    this.currentModel = null;
    this.isAnimating = false;

    this.init();
  }
  
    async init() {
      this.buttons.forEach(btn => {
        btn.addEventListener('click', () => this.handleButtonClick(btn));
      });
      await this.loadModel('default');
      this.addResizeListener();
    }
  
    async handleButtonClick(button) {
      if (this.isAnimating) return;
      
      const season = button.dataset.season;
      if (this.currentModel === season) return;
  
      this.buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      
      await this.loadModel(season);
    }
  
    async loadModel(season) {
      try {
        this.isAnimating = true;
        const config = this.models[season];
        
        // Создаем новую модель
        const newModel = this.createModelElement(config);
        
        // Инициируем анимацию перехода
        await this.playTransitionAnimation(newModel);
        
        // Обновляем текущую модель
        this.currentModel = season;
        this.isAnimating = false;
      } catch (error) {
        console.error('Ошибка загрузки модели:', error);
        this.isAnimating = false;
      }
    }
  
    createModelElement(config) {
      const wrapper = document.createElement('div');
      wrapper.className = 'sketchfab-embed-wrapper';
      wrapper.innerHTML = `
        <iframe 
          title="${config.title}"
          frameborder="0"
          allowfullscreen
          mozallowfullscreen="true"
          webkitallowfullscreen="true"
          allow="autoplay; fullscreen; xr-spatial-tracking"
          xr-spatial-tracking
          execution-while-out-of-viewport
          execution-while-not-rendered
          web-share
          src="${config.embedUrl}"
          loading="eager"
        ></iframe>
        ${this.createCaption(config)}
      `;
      return wrapper;
    }
  
    createCaption(config) {
      return `
        <p class="model-caption">
          <a href="${config.captionLinks.model}" 
             target="_blank" 
             rel="nofollow" 
             style="font-weight: bold; color: #1CAAD9;">
            ${config.title}
          </a>
          ад 
          <a href="${config.captionLinks.author}" 
             target="_blank" 
             rel="nofollow" 
             style="font-weight: bold; color: #1CAAD9;">
            ${config.captionLinks.authorName}
          </a>
          на 
          <a href="${config.captionLinks.platform}" 
             target="_blank" 
             rel="nofollow" 
             style="font-weight: bold; color: #1CAAD9;">
            Sketchfab
          </a>
        </p>
      `;
    }
  
    async playTransitionAnimation(newModel) {
      return new Promise(resolve => {
        const animationDuration = 600;
        const oldModel = this.container.firstElementChild;
  
        // Добавляем новую модель за текущей
        this.container.appendChild(newModel);
  
        // Инициируем анимацию
        requestAnimationFrame(() => {
          newModel.style.transform = 'rotateY(15deg) translateZ(50px) scale(0.95)';
          newModel.style.opacity = '0';
          
          if (oldModel) {
            oldModel.style.transform = 'rotateY(-15deg) translateZ(-50px) scale(0.95)';
            oldModel.style.opacity = '0';
          }
  
          requestAnimationFrame(() => {
            newModel.style.transition = `
              transform ${animationDuration}ms cubic-bezier(0.23, 1, 0.32, 1),
              opacity ${animationDuration}ms ease
            `;
            newModel.style.transform = 'rotateY(0deg) translateZ(0) scale(1)';
            newModel.style.opacity = '1';
  
            if (oldModel) {
              oldModel.style.transition = `
                transform ${animationDuration}ms cubic-bezier(0.23, 1, 0.32, 1),
                opacity ${animationDuration}ms ease
              `;
            }
          });
  
          // Удаляем старую модель после анимации
          setTimeout(() => {
            if (oldModel) oldModel.remove();
            resolve();
          }, animationDuration);
        });
      });
    }
  
    addResizeListener() {
      let resizeTimer;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
          if (this.container.firstElementChild) {
            this.container.firstElementChild.style.transform = 'none';
          }
        }, 100);
      });
    }
  }

  // Инициализация при загрузке страницы
  document.addEventListener('DOMContentLoaded', () => new ModelViewer());