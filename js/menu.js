document.addEventListener("DOMContentLoaded", () => {
  const menuContainer = document.getElementById("menu-container");
  if (menuContainer) {
    fetch("menu.html")
      .then(response => {
        if (!response.ok) {
          throw new Error("No se pudo cargar el menú");
        }
        return response.text();
      })
      .then(data => {
        menuContainer.innerHTML = data;
      })
      .catch(error => console.error(error));
  }
});
