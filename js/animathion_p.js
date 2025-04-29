document.addEventListener("DOMContentLoaded", function () {
    // Создаем затемняющий экран для переходов
    const transitionOverlay = document.createElement("div");
    transitionOverlay.classList.add("transition-overlay");
    document.body.appendChild(transitionOverlay);

    // Добавляем эффект плавного появления новой страницы
    document.body.classList.add("appear");

    // Определяем, находимся ли мы на главной странице
    const isHomePage = window.location.pathname === "/" || window.location.pathname.endsWith("/index.html");

    // Обрабатываем клики по ссылкам
    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function (event) {
            const href = this.getAttribute("href");

            // Если это логотип (Житенб) или ссылка на "#"
            if (this.classList.contains("logo") || href === "#") {
                if (isHomePage) {
                    event.preventDefault();

                    // Проверяем, не находимся ли мы уже наверху
                    if (window.scrollY > 0) {
                        window.scrollTo({
                            top: 0,
                            behavior: "smooth"
                        });
                    }
                    return;
                }
            }

            // Если ссылка ведет на якорь внутри страницы – плавный скролл
            if (href.startsWith("#") && href.length > 1) {
                event.preventDefault();

                const targetElement = document.querySelector(href);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: "smooth" });
                }
                return;
            }

            // Если ссылка ведет на другой сайт или уже активную страницу – не анимируем
            if (this.hostname !== window.location.hostname || this.href === window.location.href) {
                return;
            }

            // Запускаем затемнение перед переходом
            event.preventDefault();
            transitionOverlay.style.opacity = "1";

            // Через 0.7s переходим на новую страницу
            setTimeout(() => {
                window.location.href = href;
            }, 700);
        });
    });
});
