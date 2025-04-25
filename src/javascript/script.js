$(document).ready(function() {
    // Menu mobile
    $('#mobile_btn').on('click', function () {
        $('#mobile_menu').toggleClass('active');
        $('#mobile_btn').find('i').toggleClass('fa-x');
    });

    // Navegação por scroll
    const sections = $('section');
    const navItems = $('.nav-item');

    $(window).on('scroll', function () {
        const header = $('header');
        const scrollPosition = $(window).scrollTop() - header.outerHeight();

        let activeSectionIndex = 0;

        if (scrollPosition <= 0) {
            header.css('box-shadow', 'none');
        } else {
            header.css('box-shadow', '5px 1px 5px rgba(0, 0, 0, 0.1');
        }

        sections.each(function(i) {
            const section = $(this);
            const sectionTop = section.offset().top - 96;
            const sectionBottom = sectionTop + section.outerHeight();

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                activeSectionIndex = i;
                return false;
            }
        })

        navItems.removeClass('active');
        $(navItems[activeSectionIndex]).addClass('active');
    });

    

    // Animações ScrollReveal
    ScrollReveal().reveal('#cta', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('.dish', {
        origin: 'left',
        duration: 2000,
        distance: '20%'
    });

    ScrollReveal().reveal('#testimonial_chef', {
        origin: 'left',
        duration: 1000,
        distance: '20%'
    });

    ScrollReveal().reveal('.feedback', {
        origin: 'right',
        duration: 1000,
        distance: '20%'
    });

    // Filtro de Categorias
    $('.category-btn').on('click', function() {
        $('.category-btn').removeClass('active');
        $(this).addClass('active');
        
        const category = $(this).data('category');
        
        if (category === 'all') {
            $('.dish').show();
        } else {
            $('.dish').hide();
            $(`.dish[data-category="${category}"]`).show();
        }
    });

    // Navegação do Carrossel
    $('.next-btn').on('click', function() {
        const carousel = $('.products-grid')[0];
        carousel.scrollBy({
            left: 300,
            behavior: 'smooth'
        });
    });

    $('.prev-btn').on('click', function() {
        const carousel = $('.products-grid')[0];
        carousel.scrollBy({
            left: -300,
            behavior: 'smooth'
        });
    });

    // Rolagem por arraste (para mobile)
    let isDragging = false;
    let startX, scrollLeft;
    const slider = $('.products-grid')[0];

    slider.addEventListener('mousedown', (e) => {
        isDragging = true;
        slider.style.cursor = 'grabbing';
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('mouseleave', () => {
        isDragging = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mouseup', () => {
        isDragging = false;
        slider.style.cursor = 'grab';
    });

    slider.addEventListener('mousemove', (e) => {
        if(!isDragging) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });

    // Eventos touch para mobile
    slider.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchend', () => {
        isDragging = false;
    });

    slider.addEventListener('touchmove', (e) => {
        if(!isDragging) return;
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 1.5;
        slider.scrollLeft = scrollLeft - walk;
    });
    // Função para ajustar o layout baseado no número de produtos
function adjustLayout() {
    const productsGrid = $('.products-grid');
    const products = $('.dish');
    const isMobile = window.innerWidth <= 768;
    
    if (!isMobile && products.length > 6) {
        productsGrid.css({
            'overflow-x': 'hidden',
            'justify-content': 'flex-start'
        });
    } else {
        productsGrid.css({
            'overflow-x': 'auto',
            'justify-content': 'flex-start'
        });
    }
}

// Chamar na carga e no redimensionamento
$(window).on('load resize', adjustLayout);
});