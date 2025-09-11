
document.addEventListener('DOMContentLoaded', () => {

    // --- REFERENCIAS AL DOM ---
    const body = document.querySelector('body');
    const listaProductos = document.getElementById('listaProductos');

    // Se inyectan los elementos del carrito al cargar el script
    const carritoHtml = `
        <!-- Carrito Flotante -->
        <div class="carrito-flotante" id="carrito-flotante">
            <svg viewBox="0 0 24 24"><path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75L7.2,14.64L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5H6.44L5.23,2H1Z"></path></svg>
            <span class="carrito-contador" id="carrito-contador">0</span>
        </div>

        <!-- Ventana Modal del Carrito -->
        <div class="carrito-modal" id="carrito-modal">
            <div class="carrito-header">
                <h3>Mi Carrito</h3>
                <button class="cerrar-carrito" id="cerrar-carrito">&times;</button>
            </div>
            <div class="carrito-items" id="carrito-items">
                <!-- Items del carrito se insertan aquí -->
            </div>
            <div class="carrito-footer">
                <div class="carrito-total">
                    <span>Total:</span>
                    <span id="carrito-total">$0</span>
                </div>
                <button class="btn-finalizar-compra" id="btn-finalizar-compra">Finalizar Compra</button>
            </div>
        </div>

        <!-- Aviso de producto agregado -->
        <div class="aviso-carrito" id="aviso-carrito"></div>
    `;
    body.insertAdjacentHTML('beforeend', carritoHtml);

    const carritoFlotante = document.getElementById('carrito-flotante');
    const carritoModal = document.getElementById('carrito-modal');
    const cerrarCarrito = document.getElementById('cerrar-carrito');
    const carritoContador = document.getElementById('carrito-contador');
    const carritoItemsContainer = document.getElementById('carrito-items');
    const carritoTotalEl = document.getElementById('carrito-total');
    const btnFinalizarCompra = document.getElementById('btn-finalizar-compra');
    const avisoCarrito = document.getElementById('aviso-carrito');

    // --- ESTADO DEL CARRITO ---
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let avisoTimeout;

    // --- FUNCIONES ---

    const mostrarAviso = (mensaje) => {
        avisoCarrito.textContent = mensaje;
        avisoCarrito.classList.add('visible');

        clearTimeout(avisoTimeout);
        avisoTimeout = setTimeout(() => {
            avisoCarrito.classList.remove('visible');
        }, 2500);
    };

    const guardarCarrito = () => {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    };

    const agregarAlCarrito = (producto) => {
        const itemExistente = carrito.find(item => item.id === producto.id);
        if (itemExistente) {
            itemExistente.cantidad++;
        } else {
            carrito.push({ ...producto, cantidad: 1 });
        }
        guardarCarrito();
        renderizarCarrito();
        mostrarAviso('¡Producto añadido al carrito!');
    };

    const eliminarDelCarrito = (id) => {
        carrito = carrito.filter(item => item.id !== id);
        guardarCarrito();
        renderizarCarrito();
    };

    const cambiarCantidad = (id, cambio) => {
        const item = carrito.find(item => item.id === id);
        if (item) {
            item.cantidad += cambio;
            if (item.cantidad <= 0) {
                eliminarDelCarrito(id);
            } else {
                guardarCarrito();
                renderizarCarrito();
            }
        }
    };

    const renderizarCarrito = () => {
        carritoItemsContainer.innerHTML = '';
        let total = 0;
        let totalItems = 0;

        if (carrito.length === 0) {
            carritoItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
        }

        carrito.forEach(item => {
            const itemHtml = `
                <div class="carrito-item" data-id="${item.id}">
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <div class="carrito-item-info">
                        <h4>${item.nombre}</h4>
                        <span class="carrito-item-precio">${item.precio.toLocaleString('es-CL')}</span>
                        <div class="carrito-item-cantidad">
                            <button class="btn-restar-cantidad">-</button>
                            <span>${item.cantidad}</span>
                            <button class="btn-sumar-cantidad">+</button>
                        </div>
                    </div>
                    <button class="btn-eliminar-item">&times;</button>
                </div>
            `;
            carritoItemsContainer.insertAdjacentHTML('beforeend', itemHtml);
            total += item.precio * item.cantidad;
            totalItems += item.cantidad;
        });

        carritoTotalEl.textContent = `${total.toLocaleString('es-CL')}`;
        carritoContador.textContent = totalItems;
        carritoContador.style.display = totalItems > 0 ? 'flex' : 'none';
    };

    const adjuntarListenersAProductos = () => {
        const botonesAgregar = document.querySelectorAll('.btn-agregar-carrito');
        botonesAgregar.forEach(boton => {
            // Evita adjuntar el listener múltiples veces
            if (boton.dataset.listenerAdjunto) return;

            boton.dataset.listenerAdjunto = 'true';
            boton.addEventListener('click', (e) => {
                const tarjeta = e.target.closest('.producto-card');
                const producto = {
                    id: tarjeta.dataset.id,
                    nombre: tarjeta.querySelector('h3').textContent,
                    precio: parseInt(tarjeta.querySelector('.precio').textContent.replace(/[^0-9]/g, '')),
                    imagen: tarjeta.querySelector('img').src
                };
                agregarAlCarrito(producto);
            });
        });
    };

    // --- EVENT LISTENERS ---

    carritoFlotante.addEventListener('click', () => {
        carritoModal.classList.add('visible');
    });

    cerrarCarrito.addEventListener('click', () => {
        carritoModal.classList.remove('visible');
    });

    btnFinalizarCompra.addEventListener('click', () => {
        if (carrito.length > 0) {
            window.location.href = '/html/pago.html';
        }else{
            mostrarAviso('Agrega productos al carrito antes de finalizar la compra.')
        }
    });

    carritoItemsContainer.addEventListener('click', (e) => {
        const id = e.target.closest('.carrito-item').dataset.id;
        if (e.target.classList.contains('btn-eliminar-item')) {
            eliminarDelCarrito(id);
        }
        if (e.target.classList.contains('btn-sumar-cantidad')) {
            cambiarCantidad(id, 1);
        }
        if (e.target.classList.contains('btn-restar-cantidad')) {
            cambiarCantidad(id, -1);
        }
    });

    // --- OBSERVADOR PARA PRODUCTOS DINÁMICOS ---
    const observer = new MutationObserver((mutations) => {
        for (const mutation of mutations) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                adjuntarListenersAProductos();
                break; // Solo necesitamos ejecutarlo una vez por lote de cambios
            }
        }
    });

    if (listaProductos) {
        observer.observe(listaProductos, { childList: true, subtree: true });
    }

    // --- INICIALIZACIÓN ---
    renderizarCarrito();
    adjuntarListenersAProductos(); // Para productos que ya estén en el DOM al cargar
});
