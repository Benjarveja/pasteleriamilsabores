document.addEventListener('DOMContentLoaded', () => {
    // --- FILTROS ---
    const btnFiltrar = document.getElementById('btnFiltrar');
    if (btnFiltrar) {
        btnFiltrar.addEventListener('click', () => {
            const categoria = document.getElementById('categoria').value;
            const precioMin = parseInt(document.getElementById('precioMin').value) || 0;
            const precioMax = parseInt(document.getElementById('precioMax').value) || Infinity;
    
            // Usa los datos y funciones globales expuestos por modal-producto.js
            const productos = window.milSabores.productos;
            const renderizar = window.milSabores.renderizarProductos;
    
            const filtrados = productos.filter(p => 
                (categoria === '' || p.categoria === categoria) &&
                p.precio >= precioMin &&
                p.precio <= precioMax
            );
            renderizar(filtrados);
        });
    }
});
