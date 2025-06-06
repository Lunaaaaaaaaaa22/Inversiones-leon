document.addEventListener("DOMContentLoaded", function () {
    fetch('bebidas.json')
        .then(res => res.json())
        .then(data => {
            renderProductos(data.bebidas, '.bebidas-swiper .swiper-wrapper');
            renderProductos(data.alcohol, '.alcohol-swiper .swiper-wrapper');
            renderProductos(data.mas_productos, '.productos-swiper .swiper-wrapper');

            iniciarSwiper('.bebidas-swiper');
            iniciarSwiper('.alcohol-swiper');
            iniciarSwiper('.productos-swiper');
        })
        .catch(err => console.error("Error al cargar productos:", err));

    function renderProductos(productos, selector) {
    const wrapper = document.querySelector(selector);
    if (!wrapper) return;

    productos.forEach(producto => {
        const presentacionesHTML = producto.presentaciones.map(p => `
            <span class="inline-block bg-amber-100 text-amber-800 px-2 py-1 rounded-full text-xs font-medium mx-0.5 mb-1 truncate">${p}</span>
        `).join('');

        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.innerHTML = `
            <div class="h-full px-2">
                <div class="bg-white p-4 rounded-2xl shadow-md h-full flex flex-col">
                    <!-- Contenedor de imagen flexible -->
                    <div class="image-container aspect-[3/2] mb-3 w-full overflow-hidden">
                        <img src="${producto.imagen}" alt="${producto.nombre}" 
                             class="w-full h-full object-contain mx-auto">
                    </div>
                    <h3 class="text-lg font-bold text-gray-800 mb-2 text-center line-clamp-2">${producto.nombre}</h3>
                    <div class="presentaciones-container flex flex-wrap justify-center overflow-y-auto max-h-[80px] mb-2 px-1">
                        ${presentacionesHTML}
                    </div>
                    <p class="text-gray-600 text-sm text-center line-clamp-3 mt-auto">${producto.descripcion}</p>
                </div>
            </div>
        `;
        wrapper.appendChild(slide);
    });
}

    function iniciarSwiper(selector) {
        new Swiper(selector, {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            pagination: {
                el: `${selector} .swiper-pagination`,
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: `${selector} .swiper-button-next`,
                prevEl: `${selector} .swiper-button-prev`,
            },
            breakpoints: {
                640: { slidesPerView: 2 },
                1024: { slidesPerView: 3 }
            }
        });
    }

    // 🧭 Menú Mobile mejorado
    const btn = document.getElementById('mobileMenuButton');
    const menu = document.getElementById('mobileMenu');

    if (btn && menu) {
        btn.addEventListener('click', function () {
            const isActive = menu.classList.toggle('active');
            const icon = btn.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
            menu.style.maxHeight = isActive ? menu.scrollHeight + 'px' : '0';
        });
    }

    const navLinks = document.querySelectorAll('.mobile-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.remove('active');
            btn.querySelector('i').classList.remove('fa-times');
            btn.querySelector('i').classList.add('fa-bars');
            menu.style.maxHeight = '0';
        });
    });
    
});