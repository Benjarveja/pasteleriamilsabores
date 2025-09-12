document.addEventListener('DOMContentLoaded', () => {
    // Array centralizado de todos los productos
    const productos = [
        { codigo: 'TC001', categoria: 'Tortas Cuadradas', nombre: 'Torta Cuadrada de Chocolate', precio: 45000, imagen: '/assets/TC001.jpg', descripcion: 'Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.', popular: true },
        { codigo: 'TC002', categoria: 'Tortas Cuadradas', nombre: 'Torta Cuadrada de Frutas', precio: 50000, imagen: '/assets/TC002.jpg', descripcion: 'Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.' },
        { codigo: 'TT001', categoria: 'Tortas Circulares', nombre: 'Torta Circular de Vainilla', precio: 40000, imagen: '/assets/TT001.jpg', descripcion: 'Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.' },
        { codigo: 'TT002', categoria: 'Tortas Circulares', nombre: 'Torta Circular de Manjar', precio: 42000, imagen: '/assets/TT002.jpg', descripcion: 'Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.', popular: true },
        { codigo: 'PI001', categoria: 'Postres Individuales', nombre: 'Mousse de Chocolate', precio: 5000, imagen: '/assets/PI001.jpg', descripcion: 'Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.' },
        { codigo: 'PI002', categoria: 'Postres Individuales', nombre: 'Tiramisú Clásico', precio: 5500, imagen: '/assets/PI002.jpg', descripcion: 'Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.', popular: true },
        { codigo: 'PSA001', categoria: 'Productos Sin Azúcar', nombre: 'Torta Sin Azúcar de Naranja', precio: 48000, imagen: '/assets/PSA001.jpg', descripcion: 'Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.' },
        { codigo: 'PSA002', categoria: 'Productos Sin Azúcar', nombre: 'Cheesecake Sin Azúcar', precio: 47000, imagen: '/assets/PSA002.jpg', descripcion: 'Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.' },
        { codigo: 'PT001', categoria: 'Pastelería Tradicional', nombre: 'Empanada de Manzana', precio: 3000, imagen: '/assets/PT001.jpg', descripcion: 'Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.', historia: 'La empanada de manzana es una receta que ha pasado de generación en generación, adaptándose en cada región con un toque local. Originalmente europea, se ha convertido en un clásico de la repostería chilena.' },
        { codigo: 'PT002', categoria: 'Pastelería Tradicional', nombre: 'Tarta de Santiago', precio: 6000, imagen: '/assets/PT002.jpg', descripcion: 'Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.', historia: 'Originaria de Galicia, España, esta tarta tiene una historia que se remonta a la Edad Media. Se caracteriza por la cruz de Santiago espolvoreada en su superficie, un símbolo de la orden de caballeros.', popular: true },
        { codigo: 'PG001', categoria: 'Productos Sin Gluten', nombre: 'Brownie Sin Gluten', precio: 4000, imagen: '/assets/PG001.jpg', descripcion: 'Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.' },
        { codigo: 'PG002', categoria: 'Productos Sin Gluten', nombre: 'Pan Sin Gluten', precio: 3500, imagen: '/assets/PG002.jpg', descripcion: 'Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.' },
        { codigo: 'PV001', categoria: 'Productos Vegana', nombre: 'Torta Vegana de Chocolate', precio: 50000, imagen: '/assets/PV001.jpg', descripcion: 'Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.' },
        { codigo: 'PV002', categoria: 'Productos Vegana', nombre: 'Galletas Veganas de Avena', precio: 4500, imagen: '/assets/PV002.jpg', descripcion: 'Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.' },
        { codigo: 'TE001', categoria: 'Tortas Especiales', nombre: 'Torta Especial de Cumpleaños', precio: 55000, imagen: '/assets/TE001.jpg', descripcion: 'Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.' },
        { codigo: 'TE002', categoria: 'Tortas Especiales', nombre: 'Torta Especial de Boda', precio: 60000, imagen: '/assets/TE002.jpg', descripcion: 'Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.' }
    ];

    // --- INYECCIÓN DEL MODAL ---
    const modalHtml = `
        <div class="producto-modal-overlay" id="producto-modal-overlay">
            <div class="producto-modal-content">
                <button class="producto-modal-close" id="producto-modal-close">&times;</button>
                <div class="producto-modal-body" id="producto-modal-body">
                    <!-- El contenido se llenará dinámicamente -->
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // --- REFERENCIAS A ELEMENTOS DEL DOM ---
    const modalOverlay = document.getElementById('producto-modal-overlay');
    const modalBody = document.getElementById('producto-modal-body');
    const modalCloseBtn = document.getElementById('producto-modal-close');

    // --- FUNCIONES DEL MODAL ---

    function openModal(productoId) {
        const producto = productos.find(p => p.codigo === productoId);
        if (!producto) return;

        let historiaHtml = '';
        if (producto.historia) {
            historiaHtml = `
                <div class="historia">
                    <h4>Nuestra Historia</h4>
                    <p>${producto.historia}</p>
                </div>
            `;
        }

        modalBody.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <h2>${producto.nombre}</h2>
            <p class="precio">${producto.precio.toLocaleString('es-CL')} CLP</p>
            <p class="descripcion">${producto.descripcion}</p>
            ${historiaHtml}
            <div class="producto-modal-actions">
                <button class="btn-agregar-carrito" 
                        data-id="${producto.codigo}" 
                        data-nombre="${producto.nombre}" 
                        data-precio="${producto.precio}" 
                        data-imagen="${producto.imagen}">
                    Agregar al carrito
                </button>
            </div>
        `;

        modalOverlay.classList.add('is-visible');
    }

    function closeModal() {
        modalOverlay.classList.remove('is-visible');
    }

    // --- EVENT LISTENERS GLOBALES PARA EL MODAL ---
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.producto-card');
        // Si el clic fue en el botón de agregar o fuera de una tarjeta, no hacer nada
        if (e.target.closest('.btn-agregar-carrito') || !card) {
            return;
        }
        openModal(card.dataset.id);
    });

    modalCloseBtn.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) {
            closeModal();
        }
    });

    // --- RENDERIZADO DE PRODUCTOS ---

    // Función para renderizar una lista de productos en un contenedor
    const renderizarProductos = (lista, contenedor) => {
        if (!contenedor) return;
        contenedor.innerHTML = '';
        lista.forEach(prod => {
            const card = `
                <div class="card producto-card" data-id="${prod.codigo}">
                    <img src="${prod.imagen}" alt="${prod.nombre}">
                    <h3>${prod.nombre}</h3>
                    <p>${prod.categoria}</p>
                    <p class="precio">${prod.precio.toLocaleString('es-CL')} CLP</p>
                    <button class="btn-agregar-carrito">Agregar al carrito</button>
                </div>
            `;
            contenedor.innerHTML += card;
        });
    };

    // --- INICIALIZACIÓN DE SECCIONES DE PRODUCTOS ---

    // 1. Renderizar productos populares en la página de inicio
    const popularProductsContainer = document.getElementById('popular-products-grid');
    if (popularProductsContainer) {
        const productosPopulares = productos.filter(p => p.popular);
        renderizarProductos(productosPopulares, popularProductsContainer);
    }

    // 2. Renderizar todos los productos en la página de productos
    const listaProductosContenedor = document.getElementById('listaProductos');
    if (listaProductosContenedor) {
        renderizarProductos(productos, listaProductosContenedor);
    }

    // 3. Exponer productos y función de renderizado para los filtros
    window.milSabores = {
        productos: productos,
        renderizarProductos: (lista) => renderizarProductos(lista, listaProductosContenedor)
    };
});