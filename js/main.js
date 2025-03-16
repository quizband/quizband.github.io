document.addEventListener('DOMContentLoaded', () => {
    // Header scroll effect
    const header = document.querySelector('.header');
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Mobile menu toggle
    let mobileMenuButton = document.querySelector('.mobile-menu-button');
    const nav = document.querySelector('.nav');
    let menuOverlay = document.querySelector('.menu-overlay');
    const body = document.body;
    
    // Создаем кнопку мобильного меню, если её нет
    if (!mobileMenuButton) {
        mobileMenuButton = document.createElement('button');
        mobileMenuButton.className = 'mobile-menu-button';
        mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
        
        const headerInner = document.querySelector('.header__inner');
        headerInner.insertBefore(mobileMenuButton, nav);
    }
    
    // Создаем оверлей для мобильного меню, если его нет
    if (!menuOverlay) {
        menuOverlay = document.createElement('div');
        menuOverlay.className = 'menu-overlay';
        document.body.appendChild(menuOverlay);
    }
    
    // Добавление заголовка в мобильное меню
    const menuHeader = document.createElement('div');
    menuHeader.className = 'menu-header';
    menuHeader.textContent = '';
    const navList = document.querySelector('.nav__list');
    navList.insertBefore(menuHeader, navList.firstChild);
    
    // Клонирование социальных иконок для мобильного меню
    const socialLinks = document.querySelector('.social').cloneNode(true);
    socialLinks.className = 'social-mobile';
    navList.appendChild(socialLinks);
    
    // Обработка клика по кнопке мобильного меню
    mobileMenuButton.addEventListener('click', function() {
        this.classList.toggle('mobile-menu-button--active');
        nav.classList.toggle('nav--active');
        menuOverlay.classList.toggle('active');
        body.classList.toggle('menu-open');
    });
    
    // Закрытие меню при клике на оверлей
    menuOverlay.addEventListener('click', function() {
        mobileMenuButton.classList.remove('mobile-menu-button--active');
        nav.classList.remove('nav--active');
        menuOverlay.classList.remove('active');
        body.classList.remove('menu-open');
    });
    
    // Закрытие меню при клике на пункт меню
    const navLinks = document.querySelectorAll('.nav__list a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenuButton.classList.remove('mobile-menu-button--active');
            nav.classList.remove('nav--active');
            menuOverlay.classList.remove('active');
            body.classList.remove('menu-open');
        });
    });
    
    // Закрытие меню при клике вне меню
    document.addEventListener('click', function(event) {
        const isClickInsideNav = nav.contains(event.target);
        const isClickOnButton = mobileMenuButton.contains(event.target);
        
        if (!isClickInsideNav && !isClickOnButton && nav.classList.contains('nav--active')) {
            closeMenu();
        }
    });

    // Галерея изображений
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryModal = document.querySelector('.gallery-modal');
    const galleryModalImage = document.querySelector('.gallery-modal-content');
    const galleryModalAvif = document.querySelector('#gallery-modal-avif');
    const closeBtn = document.querySelector('.gallery-modal-close');
    const prevBtn = document.querySelector('.gallery-modal-prev');
    const nextBtn = document.querySelector('.gallery-modal-next');
    
    let currentImageIndex = 0;
    const totalImages = galleryItems.length;
    const imagePathsJpg = [];
    const imagePathsAvif = [];
    
    // Собираем пути всех изображений (полного размера)
    galleryItems.forEach((item, index) => {
        const imgSrc = item.querySelector('img').src;
        const avifSrc = item.querySelector('source')?.srcset;
        
        // Заменяем min на корневую директорию gallery
        imagePathsJpg.push(imgSrc.replace('/min/', '/'));
        
        // Если есть AVIF версия, сохраняем путь к ней тоже
        if (avifSrc) {
            imagePathsAvif.push(avifSrc.replace('/min/', '/'));
        } else {
            imagePathsAvif.push(''); // Пустая строка, если AVIF не найден
        }
        
        // Добавляем обработчик клика
        item.addEventListener('click', function() {
            openModal(index);
        });
    });
    
    function openModal(index) {
        currentImageIndex = index;
        
        // Устанавливаем JPG и AVIF пути
        galleryModalImage.src = imagePathsJpg[index];
        if (imagePathsAvif[index]) {
            galleryModalAvif.srcset = imagePathsAvif[index];
        } else {
            galleryModalAvif.srcset = ''; // Если AVIF нет, очищаем srcset
        }
        
        galleryModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Запрещаем прокрутку страницы
    }
    
    function closeModal() {
        galleryModal.classList.remove('active');
        document.body.style.overflow = ''; // Возвращаем прокрутку страницы
    }
    
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % totalImages;
        galleryModalImage.src = imagePathsJpg[currentImageIndex];
        
        if (imagePathsAvif[currentImageIndex]) {
            galleryModalAvif.srcset = imagePathsAvif[currentImageIndex];
        } else {
            galleryModalAvif.srcset = '';
        }
    }
    
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + totalImages) % totalImages;
        galleryModalImage.src = imagePathsJpg[currentImageIndex];
        
        if (imagePathsAvif[currentImageIndex]) {
            galleryModalAvif.srcset = imagePathsAvif[currentImageIndex];
        } else {
            galleryModalAvif.srcset = '';
        }
    }
    
    // Обработчики событий
    closeBtn.addEventListener('click', closeModal);
    nextBtn.addEventListener('click', showNextImage);
    prevBtn.addEventListener('click', showPrevImage);
    
    // Закрытие по клику вне изображения
    galleryModal.addEventListener('click', function(e) {
        if (e.target === galleryModal) {
            closeModal();
        }
    });
    
    // Навигация с клавиатуры
    document.addEventListener('keydown', function(e) {
        if (!galleryModal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeModal();
        } else if (e.key === 'ArrowRight') {
            showNextImage();
        } else if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
    });

    // Video functionality
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    const videoModal = document.querySelector('.video-modal');
    const videoContainer = document.querySelector('.video-container');
    const videoModalClose = document.querySelector('.video-modal-close');

    videoThumbnails.forEach(function(thumbnail) {
        thumbnail.addEventListener('click', function() {
            const videoId = this.getAttribute('data-video');
            const iframe = document.createElement('iframe');
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
            iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
            iframe.allowFullscreen = true;
            
            videoContainer.innerHTML = '';
            videoContainer.appendChild(iframe);
            videoModal.style.display = 'flex';
        });
    });

    videoModalClose.addEventListener('click', function() {
        videoContainer.innerHTML = '';
        videoModal.style.display = 'none';
    });

    // Закрытие при клике на фон
    videoModal.addEventListener('click', function(event) {
        if (event.target === videoModal) {
            videoContainer.innerHTML = '';
            videoModal.style.display = 'none';
        }
    });

    // Эффект появления при прокрутке
    const revealElements = document.querySelectorAll('.feature, .member, .service, .gallery-item, .video-item');
    
    function checkReveal() {
        const windowHeight = window.innerHeight;
        const revealPoint = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealPoint) {
                element.classList.add('revealed');
            }
        });
    }
    
    // Добавляем класс для CSS анимации
    const style = document.createElement('style');
    style.textContent = `
        .feature, .member, .service, .gallery-item, .video-item {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    // Проверяем при загрузке и прокрутке
    window.addEventListener('scroll', checkReveal);
    window.addEventListener('load', checkReveal);
    
    // Вызываем сразу для видимых элементов
    setTimeout(checkReveal, 100);

    // Отслеживание активного пункта меню
    function setActiveMenuItem() {
        // Проверяем, что это не открытое мобильное меню
        if (document.querySelector('.nav').classList.contains('nav--active')) {
            return; // Если мобильное меню активно, не применяем подсветку
        }
        
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav__list a[href^="#"]');
        
        let currentSection = '';
        
        // Проходим по всем секциям с конца, чтобы найти последнюю видимую
        // Это решает проблему перекрытия секций
        for (let i = sections.length - 1; i >= 0; i--) {
            const section = sections[i];
            const rect = section.getBoundingClientRect();
            
            // Если секция видна хотя бы на четверть своей высоты
            if (rect.top < window.innerHeight / 2 && rect.bottom >= 0) {
                currentSection = section.getAttribute('id');
                break; // Выход из цикла после нахождения первой видимой секции
            }
        }
        
        // Если ни одна секция не видна, но мы прокрутили страницу вниз
        // выбираем первую секцию
        if (currentSection === '' && window.pageYOffset > 0) {
            if (sections.length > 0) {
                currentSection = sections[0].getAttribute('id');
            }
        }
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    // Проверка активного пункта при скролле и изменении размера окна
    window.addEventListener('scroll', setActiveMenuItem);
    window.addEventListener('load', setActiveMenuItem);
    window.addEventListener('resize', setActiveMenuItem);

    // Кнопка "Наверх"
    const backToTopButton = document.querySelector('.back-to-top');

    // Отображение кнопки при прокрутке
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('visible');
        } else {
            backToTopButton.classList.remove('visible');
        }
    }

    // Плавная прокрутка наверх при клике
    backToTopButton.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Обработка прокрутки и управление хедером
    function handleScroll() {
        const currentScrollY = window.scrollY || document.documentElement.scrollTop;
        const heroSection = document.querySelector('.hero');
        const heroHeight = heroSection.offsetHeight;
        
        // Логика управления хедером:
        // 1. В начале страницы (currentScrollY === 0) хедер виден с прозрачным фоном
        // 2. При небольшой прокрутке (0 < currentScrollY < heroHeight/3) хедер скрыт
        // 3. При прокрутке ниже 1/3 hero хедер появляется и остается видимым до конца
        
        if (currentScrollY === 0) {
            // В самом начале страницы - хедер виден без эффектов
            header.style.top = '0';
            header.classList.remove('header--scrolled');
        } else if (currentScrollY > 0 && currentScrollY < heroHeight / 3) {
            // При небольшой прокрутке - хедер скрыт
            header.style.top = '-80px';
        } else {
            // При прокрутке ниже 1/3 hero - хедер появляется и остается видимым
            header.style.top = '0';
            
            // Добавляем стили для хедера при прокрутке ниже hero
            if (currentScrollY > heroHeight) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }
        }
        
        // Обработка для кнопки наверх
        toggleBackToTopButton();
        
        // Отслеживание активного пункта меню
        setActiveMenuItem();
    }

    // Отслеживание прокрутки страницы только через нашу функцию
    window.addEventListener('scroll', handleScroll);
    
    // При загрузке страницы
    window.addEventListener('load', function() {
        // Принудительный вызов функции прокрутки при загрузке страницы
        handleScroll();
    });
}); 