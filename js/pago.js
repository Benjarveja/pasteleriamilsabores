document.addEventListener('DOMContentLoaded', () => {
    const resumenItemsContainer = document.getElementById('resumen-items');
    const resumenTotalEl = document.getElementById('resumen-total');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (carrito.length === 0) {
        window.location.href = '/html/productos.html'; // Redirigir si no hay nada que pagar
        return;
    }

    let total = 0;
    resumenItemsContainer.innerHTML = '';

    carrito.forEach(item => {
        const itemHtml = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span>${item.nombre} (x${item.cantidad})</span>
                <span>$${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
            </div>
        `;
        resumenItemsContainer.insertAdjacentHTML('beforeend', itemHtml);
        total += item.precio * item.cantidad;
    });

    resumenTotalEl.innerHTML = `<strong>Total:</strong> $${total.toLocaleString('es-CL')}`;

    document.getElementById('form-pago').addEventListener('submit', (e) => {
        e.preventDefault();
        alert('¡Gracias por tu compra! Tu pedido ha sido realizado.');
        localStorage.removeItem('carrito'); // Limpiar carrito
        window.location.href = '/html/index.html';
    });
});