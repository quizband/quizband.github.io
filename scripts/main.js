// Храним последнюю активную секцию
let lastMenuSection = '';

// Список секций, которые нужно игнорировать
const ignoredSections = ['members', 'why-us'];

// Функция для определения активного раздела при скролле
function setActiveSection() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__list a');
    const currentScroll = window.pageYOffset;

    // Получаем только секции, которые есть в меню и не в списке игнорируемых
    const menuSections = Array.from(sections).filter(section => {
        return document.querySelector(`.nav__list a[href="#${section.id}"]`) && 
               !ignoredSections.includes(section.id);
    });

    // Находим ближайшую верхнюю секцию из меню
    let activeSection = null;
    for (let i = menuSections.length - 1; i >= 0; i--) {
        const section = menuSections[i];
        const sectionTop = section.offsetTop - 100;
        
        if (currentScroll >= sectionTop) {
            activeSection = section;
            break;
        }
    }

    // Если нашли активную секцию, обновляем меню
    if (activeSection) {
        const activeSectionId = activeSection.id;
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${activeSectionId}`) {
                link.classList.add('active');
            }
        });
    }
}

// Инициализируем активную секцию при загрузке
document.addEventListener('DOMContentLoaded', setActiveSection);

// Добавляем слушатель события scroll с небольшой задержкой
let scrollTimeout;
window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        setActiveSection();
    }, 100);
});

// Функция для анимаций при скролле
function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.fade-up, .fade-right, .fade-left, .fade-in');
    
    // Функция для проверки, находится ли элемент в области видимости
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom >= 0
        );
    }

    // Функция для обработки анимации элементов
    function handleScrollAnimation() {
        animatedElements.forEach(element => {
            if (isElementInViewport(element)) {
                element.classList.add('visible');
            }
        });
    }

    // Обработка при загрузке страницы
    handleScrollAnimation();

    // Обработка при скролле с throttle
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        if (!scrollTimeout) {
            scrollTimeout = setTimeout(() => {
                handleScrollAnimation();
                scrollTimeout = null;
            }, 100);
        }
    });
}

// Функция для закрытия видео-модального окна
function closeVideoModal() {
    const videoModal = document.querySelector('.video-modal');
    if (videoModal) {
        videoModal.style.display = 'none';
        // Останавливаем видео при закрытии
        const iframe = videoModal.querySelector('iframe');
        if (iframe) {
            const iframeSrc = iframe.src;
            iframe.src = iframeSrc;
        }
    }
}

// Функция для открытия видео-модального окна
function openVideoModal(videoId) {
    const videoModal = document.querySelector('.video-modal');
    if (videoModal) {
        const videoContainer = videoModal.querySelector('.video-container');
        if (videoContainer) {
            videoContainer.innerHTML = `<iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" frameborder="0" allowfullscreen></iframe>`;
        }
        videoModal.style.display = 'flex';
    }
}

// Функция для инициализации видео-модального окна
function initVideoModal() {
    // Закрываем модальное окно при загрузке страницы
    closeVideoModal();

    // Добавляем обработчики для открытия видео
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    videoThumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            const videoId = thumbnail.dataset.video;
            if (videoId) {
                openVideoModal(videoId);
            }
        });
    });

    // Добавляем обработчик для закрытия видео
    const closeButton = document.querySelector('.video-modal-close');
    if (closeButton) {
        closeButton.addEventListener('click', closeVideoModal);
    }

    // Закрытие по клику вне видео
    const videoModal = document.querySelector('.video-modal');
    if (videoModal) {
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                closeVideoModal();
            }
        });
    }
}

// Инициализация всех функций после загрузки страницы
document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    setActiveSection();
    initVideoModal();
}); 