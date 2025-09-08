const productos = [
    { codigo: 'TC001', categoria: 'Tortas Cuadradas', nombre: 'Torta Cuadrada de Chocolate', precio: 45000, imagen: '../assets/productos/torta-chocolate.jpg' },
    { codigo: 'TC002', categoria: 'Tortas Cuadradas', nombre: 'Torta Cuadrada de Frutas', precio: 50000, imagen: '../assets/productos/torta-frutas.jpg' },
    { codigo: 'TT001', categoria: 'Tortas Circulares', nombre: 'Torta Circular de Vainilla', precio: 40000, imagen: '../assets/productos/torta-vainilla.jpg' },
    { codigo: 'TT002', categoria: 'Tortas Circulares', nombre: 'Torta Circular de Manjar', precio: 42000, imagen: '../assets/productos/torta-manjar.jpg' },
    { codigo: 'PI001', categoria: 'Postres Individuales', nombre: 'Mousse de Chocolate', precio: 5000, imagen: '../assets/productos/mousse-chocolate.jpg' },
    { codigo: 'PI002', categoria: 'Postres Individuales', nombre: 'Tiramisú Clásico', precio: 5500, imagen: '../assets/productos/tiramisu.jpg' },
    { codigo: 'PSA001', categoria: 'Productos Sin Azúcar', nombre: 'Torta Sin Azúcar de Naranja', precio: 48000, imagen: '../assets/productos/torta-sin-azucar.jpg' },
    { codigo: 'PSA002', categoria: 'Productos Sin Azúcar', nombre: 'Cheesecake Sin Azúcar', precio: 47000, imagen: '../assets/productos/cheesecake-sin-azucar.jpg' },
    { codigo: 'PT001', categoria: 'Pastelería Tradicional', nombre: 'Empanada de Manzana', precio: 3000, imagen: '../assets/productos/empanada-manzana.jpg' },
    { codigo: 'PT002', categoria: 'Pastelería Tradicional', nombre: 'Tarta de Santiago', precio: 6000, imagen: '../assets/productos/tarta-santiago.jpg' },
    { codigo: 'PG001', categoria: 'Productos Sin Gluten', nombre: 'Brownie Sin Gluten', precio: 4000, imagen: '../assets/productos/brownie-sin-gluten.jpg' },
    { codigo: 'PG002', categoria: 'Productos Sin Gluten', nombre: 'Pan Sin Gluten', precio: 3500, imagen: '../assets/productos/pan-sin-gluten.jpg' },
    { codigo: 'PV001', categoria: 'Productos Vegana', nombre: 'Torta Vegana de Chocolate', precio: 50000, imagen: '../assets/productos/torta-vegana.jpg' },
    { codigo: 'PV002', categoria: 'Productos Vegana', nombre: 'Galletas Veganas de Avena', precio: 4500, imagen: '../assets/productos/galletas-veganas.jpg' },
    { codigo: 'TE001', categoria: 'Tortas Especiales', nombre: 'Torta Especial de Cumpleaños', precio: 55000, imagen: '../assets/productos/torta-cumpleanos.jpg' },
    { codigo: 'TE002', categoria: 'Tortas Especiales', nombre: 'Torta Especial de Boda', precio: 60000, imagen: '../assets/productos/torta-boda.jpg' }
];

function mostrarProductos(lista) {
    const contenedor = document.getElementById('listaProductos');
    contenedor.innerHTML = '';

    lista.forEach(prod => {
        const card = `
            <div class="card">
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <h3>${prod.nombre}</h3>
                <p>${prod.categoria}</p>
                <p class="precio">$${prod.precio.toLocaleString('es-CL')} CLP</p>
                <button>Agregar al carrito</button>
            </div>
        `;
        contenedor.innerHTML += card;
    });
}

document.getElementById('btnFiltrar').addEventListener('click', () => {
    const categoria = document.getElementById('categoria').value;
    const precioMin = parseInt(document.getElementById('precioMin').value) || 0;
    const precioMax = parseInt(document.getElementById('precioMax').value) || Infinity;

    const filtrados = productos.filter(p => 
        (categoria === '' || p.categoria === categoria) &&
        p.precio >= precioMin &&
        p.precio <= precioMax
    );

    mostrarProductos(filtrados);
});

// Mostrar todos al inicio
mostrarProductos(productos);
