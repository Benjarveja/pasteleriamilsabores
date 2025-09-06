document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let formMessage = document.getElementById("form-message");

    // Validaciones
    if (name === "" || email === "" || message === "") {
        formMessage.textContent = "Por favor completa todos los campos.";
        formMessage.style.color = "red";
        return;
    }

    // Validación email básica
    let emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.match(emailPattern)) {
        formMessage.textContent = "Ingresa un correo válido.";
        formMessage.style.color = "red";
        return;
    }

    // Si pasa las validaciones
    formMessage.textContent = "¡Gracias por contactarnos! Responderemos pronto.";
    formMessage.style.color = "green";

    // Limpiar campos
    document.getElementById("contactForm").reset();
});
