document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initNavbar();
    initScrollTop();
    initTheme();
    initLang();
    initServices();
    initWorks();
    initCompareSlider();
    initPricing();
    initCalculator();
    initBooking();
    initScrollAnimations();
    initCookieBanner();
    initLightbox();
});

const translations = {
    ru: {
        nav_services: 'Услуги', nav_works: 'Наши работы', nav_compare: 'До/После',
        nav_pricing: 'Прайс', nav_booking: 'Запись', nav_contacts: 'Контакты',
        hero_badge: '✦ Элитный детейлинг-центр',
        hero_title: 'Искусство<br>абсолютного<br><span class="text-gold">совершенства</span>',
        hero_desc: 'Преображение премиальных автомобилей на уровне мировых стандартов. Мы не просто моем — мы возвращаем жизнь вашему автомобилю с хирургической точностью.',
        hero_btn_calc: 'Рассчитать стоимость',
        hero_btn_works: 'Наши работы',
        stat_cars: 'Автомобилей', stat_years: 'Лет опыта', stat_clients: 'Довольных клиентов',
        services_badge: 'Превосходство в деталях',
        services_title: 'Королевский <span class="text-gold">сервис</span>',
        services_desc: 'Каждая услуга — это произведение автомобильного искусства, доведённое до совершенства',
        works_badge: 'Портфолио', works_title: 'Наши <span class="text-gold">шедевры</span>',
        works_desc: 'Результаты, которые говорят громче любых слов',
        compare_badge: 'Трансформация', compare_title: 'До и <span class="text-gold">после</span>',
        compare_desc: 'Проведите ползунком — разница вас ошеломит',
        compare_label_before: 'До', compare_label_after: 'После',
        pricing_badge: 'Прайс-лист', pricing_title: 'Инвестиция в <span class="text-gold">совершенство</span>',
        pricing_desc: 'Цены, соответствующие эксклюзивному качеству. Никаких скрытых платежей.',
        calc_badge: 'Калькулятор', calc_title: 'Мгновенный <span class="text-gold">расчёт</span>',
        calc_service: 'Выберите услугу',
        calc_polish: 'Полировка — от $180', calc_ceramic: 'Керамика — от $350',
        calc_film: 'Оклейка плёнкой — от $800', calc_clean: 'Химчистка — от $250',
        calc_tint: 'Тонировка — от $200', calc_detail: 'Детейлинг — от $500',
        calc_complex: 'Комплекс услуг (скидка 15%)', calc_total: 'Итого:',
        calc_btn: 'Пересчитать', booking_badge: 'Запись',
        booking_title: 'Бронирование <span class="text-gold">online</span>',
        booking_desc: 'Оставьте заявку — мы свяжемся с вами в течение 15 минут',
        form_name: 'Имя *', form_phone: 'Телефон *', form_car: 'Марка автомобиля',
        form_service_placeholder: 'Выберите услугу',
        form_service_polish: 'Полировка', form_service_ceramic: 'Керамика',
        form_service_film: 'Оклейка плёнкой', form_service_clean: 'Химчистка',
        form_service_tint: 'Тонировка', form_service_detail: 'Детейлинг',
        form_date: 'Желаемая дата', form_comment: 'Комментарий',
        form_submit: 'Отправить заявку',
        form_success: 'Благодарим! Ваша заявка принята. Наш менеджер свяжется с вами в ближайшее время.',
        contacts_badge: 'Контакты', contacts_title: 'Свяжитесь <span class="text-gold">с нами</span>',
        contact_address: 'Адрес', contact_work_hours: 'Пн-Сб: 10:00 — 20:00',
        cookie_text: 'Мы используем cookie для улучшения работы сайта. Продолжая использовать сайт, вы соглашаетесь с этим.',
        cookie_accept: 'Принять',
        footer_desc: 'Элитный детейлинг и тюнинг премиальных автомобилей в Москве. Доверьте свой автомобиль мастерам высочайшего уровня.',
        footer_nav: 'Навигация', footer_services: 'Услуги',
        footer_polish: 'Полировка', footer_ceramic: 'Керамика',
        footer_film: 'Оклейка плёнкой', footer_detailing: 'Детейлинг',
        footer_contacts: 'Контакты', loader_text: 'Загрузка...',
    },
    en: {
        nav_services: 'Services', nav_works: 'Our Work', nav_compare: 'Before/After',
        nav_pricing: 'Pricing', nav_booking: 'Booking', nav_contacts: 'Contacts',
        hero_badge: '✦ Elite Detailing Center',
        hero_title: 'The Art of<br>Absolute<br><span class="text-gold">Perfection</span>',
        hero_desc: 'Transforming premium automobiles to world-class standards. We don\'t just wash — we resurrect your vehicle with surgical precision.',
        hero_btn_calc: 'Calculate Cost',
        hero_btn_works: 'Our Work',
        stat_cars: 'Cars Detailed', stat_years: 'Years Excellence', stat_clients: 'Happy Clients',
        services_badge: 'Excellence in Every Detail',
        services_title: 'Royal <span class="text-gold">Service</span>',
        services_desc: 'Every service is a masterpiece of automotive art, refined to perfection',
        works_badge: 'Portfolio', works_title: 'Our <span class="text-gold">Masterpieces</span>',
        works_desc: 'Results that speak louder than any words',
        compare_badge: 'Transformation', compare_title: 'Before & <span class="text-gold">After</span>',
        compare_desc: 'Slide to see the difference — it will astonish you',
        compare_label_before: 'Before', compare_label_after: 'After',
        pricing_badge: 'Price List', pricing_title: 'Investment in <span class="text-gold">Excellence</span>',
        pricing_desc: 'Pricing to match exclusive quality. No hidden fees. Ever.',
        calc_badge: 'Calculator', calc_title: 'Instant <span class="text-gold">Quote</span>',
        calc_service: 'Choose a Service',
        calc_polish: 'Polishing — from $180', calc_ceramic: 'Ceramic Coating — from $350',
        calc_film: 'PPF Film — from $800', calc_clean: 'Dry Cleaning — from $250',
        calc_tint: 'Tinting — from $200', calc_detail: 'Detailing — from $500',
        calc_complex: 'Full Package (15% off)', calc_total: 'Total:',
        calc_btn: 'Calculate', booking_badge: 'Booking',
        booking_title: 'Book <span class="text-gold">Online</span>',
        booking_desc: 'Leave a request — we\'ll respond within 15 minutes',
        form_name: 'Name *', form_phone: 'Phone *', form_car: 'Car Model',
        form_service_placeholder: 'Choose a service',
        form_service_polish: 'Polishing', form_service_ceramic: 'Ceramic Coating',
        form_service_film: 'PPF Film', form_service_clean: 'Dry Cleaning',
        form_service_tint: 'Tinting', form_service_detail: 'Detailing',
        form_date: 'Preferred Date', form_comment: 'Comment',
        form_submit: 'Send Request',
        form_success: 'Thank you! Your request has been received. Our manager will contact you shortly.',
        contacts_badge: 'Contacts', contacts_title: 'Get in <span class="text-gold">Touch</span>',
        contact_address: 'Address', contact_work_hours: 'Mon-Sat: 10AM — 8PM',
        cookie_text: 'We use cookies to improve your experience. By continuing, you agree to our use of cookies.',
        cookie_accept: 'Accept',
        footer_desc: 'Elite car detailing and tuning for premium automobiles in Moscow. Entrust your car to masters of the highest caliber.',
        footer_nav: 'Navigation', footer_services: 'Services',
        footer_polish: 'Polishing', footer_ceramic: 'Ceramic Coating',
        footer_film: 'PPF Film', footer_detailing: 'Detailing',
        footer_contacts: 'Contacts', loader_text: 'Loading...',
    }
};

function initLoader() {
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('loader').classList.add('hidden');
        }, 1000);
    });
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 3000);
}

function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 100);
    });
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
}

function initScrollTop() {
    const btn = document.getElementById('scrollTop');
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.scrollY > 500);
    });
    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    document.getElementById('tgContact').addEventListener('click', () => {
        window.open('https://t.me/northgarage', '_blank');
    });
}

function initTheme() {
    const toggle = document.getElementById('themeToggle');
    const saved = localStorage.getItem('north-garage-theme') || 'dark';
    document.documentElement.setAttribute('data-theme', saved);
    toggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('north-garage-theme', next);
    });
}

function initLang() {
    const saved = localStorage.getItem('north-garage-lang') || 'ru';
    const btns = document.querySelectorAll('.lang-btn');
    btns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.lang-btn[data-lang="${saved}"]`)?.classList.add('active');
    applyLang(saved);
    btns.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            btns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            localStorage.setItem('north-garage-lang', lang);
            applyLang(lang);
        });
    });
}

function applyLang(lang) {
    const t = translations[lang] || translations.ru;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) {
            if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                el.placeholder = t[key].replace(/\*$/, '').trim();
            } else {
                el.innerHTML = t[key];
            }
        }
    });
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] && (el.tagName === 'OPTION' || el.closest('select'))) {
            el.textContent = t[key];
        }
    });
    document.querySelectorAll('.form-input').forEach(el => {
        if (!el.value) el.value = '';
    });
    document.documentElement.lang = lang === 'en' ? 'en' : 'ru';
}

const servicesData = [
    { icon: '🔧', name_ru: 'Полировка', name_en: 'Polishing',
      desc_ru: 'Восстановление лакокрасочного покрытия. Многоступенчатая абразивная и финишная полировка.',
      desc_en: 'Paint restoration. Multi-stage abrasive and finishing polishing.', price: 'от $180' },
    { icon: '🛡️', name_ru: 'Керамика', name_en: 'Ceramic Coating',
      desc_ru: 'Нано-керамическое покрытие. Защита кузова на 3+ года с эффектом глубокого блеска.',
      desc_en: 'Nano-ceramic coating. 3+ year protection with deep gloss effect.', price: 'от $350' },
    { icon: '📦', name_ru: 'Оклейка плёнкой', name_en: 'PPF Film',
      desc_ru: 'Защитная полиуретановая плёнка. Полная защита от сколов и царапин.',
      desc_en: 'Protective polyurethane film. Full protection from chips and scratches.', price: 'от $800' },
    { icon: '✨', name_ru: 'Химчистка', name_en: 'Dry Cleaning',
      desc_ru: 'Комплексная химчистка салона. Удаление любых загрязнений и запахов.',
      desc_en: 'Complex interior cleaning. Removal of all stains and odors.', price: 'от $250' },
    { icon: '🌓', name_ru: 'Тонировка', name_en: 'Tinting',
      desc_ru: 'Тонировка стёкол любой сложности. Премиальные плёнки с UV-защитой.',
      desc_en: 'Window tinting of any complexity. Premium films with UV protection.', price: 'от $200' },
    { icon: '🏆', name_ru: 'Детейлинг', name_en: 'Detailing',
      desc_ru: 'Полный комплекс детейлинг-услуг. Мойка, полировка, керамика, химчистка.',
      desc_en: 'Complete detailing package. Wash, polish, ceramic coating, interior cleaning.', price: 'от $500' },
];

function initServices() {
    const grid = document.getElementById('servicesGrid');
    const lang = localStorage.getItem('north-garage-lang') || 'ru';
    servicesData.forEach(s => {
        const card = document.createElement('div');
        card.className = 'service-card animate-on-scroll';
        const name = lang === 'en' ? s.name_en : s.name_ru;
        const desc = lang === 'en' ? s.desc_en : s.desc_ru;
        card.innerHTML = `
            <div class="service-icon">${s.icon}</div>
            <h3>${name}</h3>
            <p>${desc}</p>
            <div class="service-price">${s.price}</div>
        `;
        grid.appendChild(card);
    });
}

const worksData = [
    { img: 'static/images/works/work-1.jpg', title: 'Porsche 911 Turbo S', service: 'polish', cat: 'Полировка', label: 'Ceramic Coating', desc: 'Глубокое восстановление ЛКП легендарного Porsche. Нанесение керамики 9H. Блеск +60%, защита на 5 лет.' },
    { img: 'static/images/works/work-2.jpg', title: 'Mercedes-AMG GT', service: 'ceramic', cat: 'Керамика', label: 'PPF Protection', desc: 'Полная оклейка кузова Mercedes-AMG GT защитной плёнкой. Идеальная геометрия, защита от сколов.' },
    { img: 'static/images/works/work-3.jpg', title: 'BMW M8 Competition', service: 'film', cat: 'Оклейка плёнкой', label: 'Full PPF + Tint', desc: 'Комплексная защита BMW M8: оклейка PPF + тонировка. Спортивный характер в каждой линии.' },
    { img: 'static/images/works/work-4.jpg', title: 'Lamborghini Huracán', service: 'polish', cat: 'Полировка', label: 'Exterior Detailing', desc: 'Многоступенчатая полировка Lamborghini. Удаление голограмм, восстановление заводской глубины цвета.' },
    { img: 'static/images/works/work-5.jpg', title: 'Audi R8 V10', service: 'detail', cat: 'Детейлинг', label: 'Full Detailing', desc: 'Премиум-пакет для Audi R8: полировка, керамика, химчистка салона, обработка кожи, защита дисков.' },
    { img: 'static/images/works/work-6.jpg', title: 'Ferrari F8 Tributo', service: 'ceramic', cat: 'Керамика', label: 'Ceramic Pro 9H', desc: 'Профессиональное керамическое покрытие Ferrari F8. Гидрофобный эффект, защита от УФ и реагентов.' },
    { img: 'static/images/works/work-7.jpg', title: 'Bentley Continental GT', service: 'detail', cat: 'Детейлинг', label: 'VIP Detailing', desc: 'Эксклюзивный уход для Bentley. Полная реставрация салона, кузова и ходовой части. Бескомпромиссное качество.' },
    { img: 'static/images/works/work-8.jpg', title: 'Rolls-Royce Ghost', service: 'film', cat: 'Оклейка плёнкой', label: 'PPF + Ceramic', desc: 'Максимальная защита Rolls-Royce: оклейка SunTek + керамика сверху. Британская роскошь под защитой.' },
];

let worksFilter = 'all';

function initWorks() {
    const grid = document.getElementById('worksGrid');
    const container = grid.parentElement;
    const filterBar = document.createElement('div');
    filterBar.className = 'works-filter';
    filterBar.innerHTML = `
        <button class="filter-btn active" data-filter="all">Все работы</button>
        <button class="filter-btn" data-filter="polish">Полировка</button>
        <button class="filter-btn" data-filter="ceramic">Керамика</button>
        <button class="filter-btn" data-filter="film">Оклейка</button>
        <button class="filter-btn" data-filter="detail">Детейлинг</button>
    `;
    container.insertBefore(filterBar, grid);

    filterBar.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;
        filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        worksFilter = btn.dataset.filter;
        grid.style.opacity = '0';
        grid.style.transform = 'translateY(20px)';
        setTimeout(() => { renderWorks(grid); }, 300);
    });

    renderWorks(grid);
}

function renderWorks(grid) {
    grid.innerHTML = '';
    const filtered = worksFilter === 'all' ? worksData : worksData.filter(w => w.service === worksFilter);
    filtered.forEach((w, i) => {
        const item = document.createElement('div');
        item.className = 'work-item animate-on-scroll';
        item.style.transitionDelay = `${i * 0.1}s`;
        item.innerHTML = `
            <div class="work-img-wrap">
                <img src="${w.img}" alt="${w.title}" loading="lazy">
                <div class="work-badge">${w.cat}</div>
                <div class="work-label">${w.label}</div>
            </div>
            <div class="work-info">
                <h3 class="work-title">${w.title}</h3>
                <p class="work-desc">${w.desc}</p>
                <div class="work-tags">
                    <span>До/После</span>
                    <span class="work-rating">★ 5.0</span>
                </div>
            </div>
        `;
        item.addEventListener('click', () => openLightbox(w.img, `${w.title} — ${w.label}`));
        grid.appendChild(item);
        setTimeout(() => item.classList.add('visible'), i * 120);
    });
    grid.style.opacity = '1';
    grid.style.transform = 'translateY(0)';
    grid.style.transition = 'all 0.5s ease';
}

function initLightbox() {
    const lb = document.getElementById('lightbox');
    const img = document.getElementById('lightboxImg');
    const caption = lb.querySelector('.lightbox-caption');
    lb.querySelector('.lightbox-close').addEventListener('click', () => lb.classList.remove('active'));
    lb.addEventListener('click', (e) => { if (e.target === lb) lb.classList.remove('active'); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.classList.remove('active'); });
    window.openLightbox = (src, title) => {
        img.src = src;
        img.alt = title || '';
        caption.textContent = title || '';
        lb.classList.add('active');
    };
}

function initCompareSlider() {
    const slider = document.getElementById('compareSlider');
    const handle = document.getElementById('compareHandle');
    const before = slider.querySelector('.compare-before');
    const after = slider.querySelector('.compare-after');
    const beforeOverlay = slider.querySelector('.before-overlay');
    const afterOverlay = slider.querySelector('.after-overlay');
    const labels = slider.querySelectorAll('.compare-label');

    let isDragging = false;
    let isHovering = false;
    let currentPct = 50;
    let targetPct = 50;
    let rafId = null;

    function setPosition(pct) {
        pct = Math.max(0, Math.min(100, pct));
        before.style.clipPath = `inset(0 ${100 - pct}% 0 0)`;
        after.style.clipPath = `inset(0 0 0 ${pct}%)`;
        handle.style.left = `${pct}%`;
        if (beforeOverlay) beforeOverlay.style.opacity = pct < 5 ? 1 : 0.6 - (pct / 100) * 0.5;
        if (afterOverlay) afterOverlay.style.opacity = pct > 95 ? 1 : 0.1 + (pct / 100) * 0.5;
        labels.forEach(l => l.style.opacity = '1');
        currentPct = pct;
    }

    function animateToTarget() {
        const diff = targetPct - currentPct;
        if (Math.abs(diff) < 0.01) {
            setPosition(targetPct);
            rafId = null;
            return;
        }
        const eased = currentPct + diff * 0.18;
        setPosition(eased);
        rafId = requestAnimationFrame(animateToTarget);
    }

    function getClientX(e) {
        if (e.touches && e.touches.length) return e.touches[0].clientX;
        return e.clientX;
    }

    function onStart(e) {
        isDragging = true;
        slider.classList.add('comparing');
        handle.classList.add('active');
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        const rect = slider.getBoundingClientRect();
        let x = getClientX(e) - rect.left;
        x = Math.max(0, Math.min(x, rect.width));
        targetPct = (x / rect.width) * 100;
        setPosition(targetPct);
    }

    function onMove(e) {
        if (!isDragging) return;
        if (e.cancelable) e.preventDefault();
        const rect = slider.getBoundingClientRect();
        let x = getClientX(e) - rect.left;
        x = Math.max(0, Math.min(x, rect.width));
        targetPct = (x / rect.width) * 100;
        if (!rafId) rafId = requestAnimationFrame(animateToTarget);
    }

    function onEnd() {
        isDragging = false;
        slider.classList.remove('comparing');
        handle.classList.remove('active');
        if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
        setPosition(targetPct);
    }

    slider.addEventListener('mousedown', onStart);
    document.addEventListener('mousemove', onMove);
    document.addEventListener('mouseup', onEnd);

    slider.addEventListener('touchstart', onStart, { passive: true });
    document.addEventListener('touchmove', onMove, { passive: false });
    document.addEventListener('touchend', onEnd);

    slider.addEventListener('mouseenter', () => { isHovering = true; });
    slider.addEventListener('mouseleave', () => { isHovering = false; });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') { targetPct = Math.max(0, targetPct - 3); if (!rafId) rafId = requestAnimationFrame(animateToTarget); }
        if (e.key === 'ArrowRight') { targetPct = Math.min(100, targetPct + 3); if (!rafId) rafId = requestAnimationFrame(animateToTarget); }
    });

    setPosition(50);
    slider.setAttribute('tabindex', '0');
    slider.setAttribute('role', 'slider');
    slider.setAttribute('aria-label', 'Сравнение до и после детейлинга');
    slider.setAttribute('aria-valuemin', '0');
    slider.setAttribute('aria-valuemax', '100');
    slider.setAttribute('aria-valuenow', '50');
}

function initPricing() {
    const grid = document.getElementById('pricingGrid');
    const lang = localStorage.getItem('north-garage-lang') || 'ru';
    const prices = [
        { icon: '', name_ru: 'Полировка', name_en: 'Polishing', price: '$180',
          features_ru: ['Мойка кузова', 'Обезжиривание', '2-х этапная полировка', 'Нанесение защитного состава'],
          features_en: ['Car wash', 'Degreasing', '2-stage polishing', 'Protective coating'], featured: false },
        { icon: '', name_ru: 'Керамика', name_en: 'Ceramic Coating', price: '$350',
          features_ru: ['Полировка кузова', 'Нанесение 2 слоёв', 'Гидрофобный эффект', 'Гарантия 3 года'],
          features_en: ['Paint polishing', '2-layer application', 'Hydrophobic effect', '3 year warranty'], featured: true },
        { icon: '', name_ru: 'Оклейка плёнкой', name_en: 'PPF Film', price: '$800',
          features_ru: ['Замер и раскрой', 'Оклейка капота', 'Оклейка бамперов', 'Оклейка зеркал'],
          features_en: ['Measurement & cutting', 'Hood wrapping', 'Bumper wrapping', 'Mirror wrapping'], featured: false },
        { icon: '', name_ru: 'Химчистка', name_en: 'Dry Cleaning', price: '$250',
          features_ru: ['Чистка сидений', 'Чистка потолка', 'Чистка ковров', 'Озонирование'],
          features_en: ['Seat cleaning', 'Headliner cleaning', 'Carpet cleaning', 'Ozonation'], featured: false },
        { icon: '', name_ru: 'Тонировка', name_en: 'Tinting', price: '$200',
          features_ru: ['Подбор оттенка', 'Тонировка 4 стёкол', 'Заднее стекло', 'Контроль качества'],
          features_en: ['Shade selection', '4 windows tinting', 'Rear window', 'Quality control'], featured: false },
        { icon: '', name_ru: 'Детейлинг', name_en: 'Detailing', price: '$500',
          features_ru: ['Мойка с пеной', 'Полировка', 'Керамика', 'Химчистка салона'],
          features_en: ['Foam wash', 'Polishing', 'Ceramic coating', 'Interior cleaning'], featured: false },
    ];
    prices.forEach(p => {
        const card = document.createElement('div');
        card.className = `pricing-card animate-on-scroll${p.featured ? ' featured' : ''}`;
        const name = lang === 'en' ? p.name_en : p.name_ru;
        const features = lang === 'en' ? p.features_en : p.features_ru;
        card.innerHTML = `
            ${p.featured ? '<div class="pricing-badge">' + (lang === 'en' ? 'Popular' : 'Популярное') + '</div>' : ''}
            ${p.icon ? `<div class="pricing-icon">${p.icon}</div>` : ''}
            <h3>${name}</h3>
            <div class="pricing-price">${p.price} <span></span></div>
            <ul class="pricing-features">${features.map(f => `<li>${f}</li>`).join('')}</ul>
            <a href="#booking" class="btn btn-primary">${lang === 'en' ? 'Order' : 'Заказать'}</a>
        `;
        grid.appendChild(card);
    });
}

function initCalculator() {
    const service = document.getElementById('calcService');
    const complex = document.getElementById('calcComplex');
    const result = document.getElementById('calcResult');
    const btn = document.getElementById('calcBtn');

    function calc() {
        const prices = {
            'Полировка': 180, 'Керамика': 350, 'Оклейка плёнкой': 800,
            'Химчистка': 250, 'Тонировка': 200, 'Детейлинг': 500
        };
        let total = prices[service.value] || 0;
        if (complex.checked) total = Math.round(total * 0.85);
        result.textContent = '$' + total;
    }
    btn.addEventListener('click', calc);
    calc();
}

function initBooking() {
    const form = document.getElementById('bookingForm');
    const submit = document.getElementById('formSubmit');
    const success = document.getElementById('formSuccess');

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('formDate').min = today;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('formName').value.trim();
        const phone = document.getElementById('formPhone').value.trim();
        if (!name || !phone) {
            alert('Пожалуйста, заполните обязательные поля');
            return;
        }
        submit.classList.add('loading');
        try {
            const res = await fetch('/api/submit', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name, phone,
                    car_brand: document.getElementById('formCar').value.trim(),
                    service: document.getElementById('formService').value,
                    date: document.getElementById('formDate').value,
                    comment: document.getElementById('formComment').value.trim(),
                })
            });
            const data = await res.json();
            if (data.success) {
                form.style.display = 'none';
                success.classList.add('active');
            } else {
                alert('Ошибка: ' + (data.error || 'Попробуйте позже'));
            }
        } catch {
            alert('Ошибка отправки. Попробуйте позже.');
        } finally {
            submit.classList.remove('loading');
        }
    });
}

function initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

function initCookieBanner() {
    const banner = document.getElementById('cookieBanner');
    if (!localStorage.getItem('north-garage-cookie')) {
        setTimeout(() => banner.classList.add('active'), 500);
    }
    document.getElementById('cookieAccept').addEventListener('click', () => {
        localStorage.setItem('north-garage-cookie', 'accepted');
        banner.classList.remove('active');
    });
}
