document.addEventListener("DOMContentLoaded", () => {
    const menuContainer = document.getElementById("menu-container");

    if (menuContainer) {
        fetch("/html/menu.html") // Asegúrate que la ruta sea correcta desde la raíz del sitio
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo cargar el menú: " + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                // 1. Inyectar el HTML del menú
                menuContainer.innerHTML = data;

                // 2. Una vez inyectado el HTML, añadir la lógica del menú responsivo
                const navbarToggler = document.getElementById('navbar-toggler');
                const linksWrapper = document.getElementById('navbar-links-wrapper');

                if (navbarToggler && linksWrapper) {
                    navbarToggler.addEventListener('click', () => {
                        // Animación del botón (de hamburguesa a X)
                        navbarToggler.classList.toggle('is-active');
                        // Muestra y oculta el menú desplegable
                        linksWrapper.classList.toggle('is-active');
                    });
                }
            })
            .catch(error => console.error("Error al cargar el menú:", error));
    }
});