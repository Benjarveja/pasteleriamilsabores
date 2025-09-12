document.addEventListener('DOMContentLoaded', () => {
    const resumenItemsContainer = document.getElementById('resumen-items');
    const resumenTotalEl = document.getElementById('resumen-total');
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // --- Carrito y Resumen de Pedido ---
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
                <span>${(item.precio * item.cantidad).toLocaleString('es-CL')}</span>
            </div>
        `;
        resumenItemsContainer.insertAdjacentHTML('beforeend', itemHtml);
        total += item.precio * item.cantidad;
    });

    resumenTotalEl.innerHTML = `<strong>Total:</strong> ${total.toLocaleString('es-CL')}`;

    // --- Elementos del DOM para el formulario principal ---
    const formPago = document.getElementById('form-pago');
    const runInput = document.getElementById('run');
    const nombreInput = document.getElementById('nombre');
    const apellidosInput = document.getElementById('apellidos');
    const emailInput = document.getElementById('email');
    const celularInput = document.getElementById('celular');
    const envioRadio = document.getElementById('envio');
    const retiroRadio = document.getElementById('retiro');
    const tarjetaRadio = document.getElementById('tarjeta');
    const transferenciaRadio = document.getElementById('transferencia');

    // Nuevos elementos para opciones de entrega
    const direccionEnvioGroup = document.getElementById('direccion-envio-group');
    const direccionInput = document.getElementById('direccion');
    const direccionError = document.getElementById('direccion-error');
    const sucursalRetiroGroup = document.getElementById('sucursal-retiro-group');
    const sucursalSelect = document.getElementById('sucursal');
    const sucursalError = document.getElementById('sucursal-error');

    // --- Elementos del DOM para errores ---
    const runError = document.getElementById('run-error');
    const nombreError = document.getElementById('nombre-error');
    const apellidosError = document.getElementById('apellidos-error');
    const emailError = document.getElementById('email-error');
    const celularError = document.getElementById('celular-error');
    const opcionEntregaError = document.getElementById('opcion-entrega-error');
    const metodoPagoError = document.getElementById('metodo-pago-error');

    // --- Elementos del DOM para el Modal ---
    const btnLoginRegister = document.getElementById('btn-login-register');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalBtn = document.getElementById('close-modal');
    const modalChoiceContent = document.getElementById('modal-choice-content');
    const btnShowLogin = document.getElementById('btn-show-login');
    const btnShowRegister = document.getElementById('btn-show-register');

    // --- Elementos del DOM para el formulario de Login ---
    const loginModal = document.getElementById('login-modal');
    const formLogin = document.getElementById('form-login');
    const loginUsernameInput = document.getElementById('login-username');
    const loginPasswordInput = document.getElementById('login-password');
    const loginUsernameError = document.getElementById('login-username-error');
    const loginPasswordError = document.getElementById('login-password-error');
    const loginMessage = document.getElementById('login-message');
    const btnBackLogin = document.getElementById('btn-back-login');

    // --- Elementos del DOM para el formulario de Registro ---
    const registerModal = document.getElementById('register-modal');
    const formRegister = document.getElementById('form-register');
    const registerRunInput = document.getElementById('register-run');
    const registerNombreInput = document.getElementById('register-nombre');
    const registerApellidosInput = document.getElementById('register-apellidos');
    const registerEmailInput = document.getElementById('register-email');
    const registerCelularInput = document.getElementById('register-celular');
    const registerRunError = document.getElementById('register-run-error');
    const registerNombreError = document.getElementById('register-nombre-error');
    const registerApellidosError = document.getElementById('register-apellidos-error');
    const registerEmailError = document.getElementById('register-email-error');
    const registerCelularError = document.getElementById('register-celular-error');
    const registerMessage = document.getElementById('register-message');
    const btnBackRegister = document.getElementById('btn-back-register');

    // --- Funciones de Utilidad ---
    function showError(element, message) {
        element.textContent = message;
        element.style.display = 'block';
    }

    function hideError(element) {
        element.textContent = '';
        element.style.display = 'none';
    }

    // --- Validación de RUN Chileno ---
    function validarRUN(run) {
        run = run.replace(/\./g, '').replace('-', ''); // Limpiar puntos y guion
        if (run.length < 2) return false;

        let dv = run.slice(-1).toUpperCase();
        let body = parseInt(run.slice(0, -1));

        if (isNaN(body)) return false;

        let suma = 0;
        let multiplo = 2;

        for (let i = body.toString().length - 1; i >= 0; i--) {
            suma += parseInt(body.toString().charAt(i)) * multiplo;
            multiplo++;
            if (multiplo > 7) multiplo = 2;
        }

        let dvEsperado = 11 - (suma % 11);
        if (dvEsperado === 11) dvEsperado = '0';
        else if (dvEsperado === 10) dvEsperado = 'K';
        else dvEsperado = dvEsperado.toString();

        return dv === dvEsperado;
    }

    function validateField(inputElement, errorElement, validationFn, errorMessage) {
        if (!validationFn(inputElement.value.trim())) {
            showError(errorElement, errorMessage);
            return false;
        } else {
            hideError(errorElement);
            return true;
        }
    }

    function validateEmail(email) {
        const re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return re.test(String(email).toLowerCase());
    }

    function validateCelular(celular) {
        // Asumiendo formato chileno de 9 dígitos, que empieza con 9
        const re = /^9[0-9]{8}$/;
        return re.test(String(celular));
    }

    // --- Manejo de Modales ---
    btnLoginRegister.addEventListener('click', () => {
        modalOverlay.classList.add('active');
        modalChoiceContent.classList.remove('hidden');
        loginModal.classList.add('hidden');
        registerModal.classList.add('hidden');
    });

    closeModalBtn.addEventListener('click', () => {
        modalOverlay.classList.remove('active');
        // Limpiar mensajes y errores al cerrar
        hideError(loginUsernameError);
        hideError(loginPasswordError);
        loginMessage.textContent = '';
        hideError(registerRunError);
        hideError(registerNombreError);
        hideError(registerApellidosError);
        hideError(registerEmailError);
        hideError(registerCelularError);
        registerMessage.textContent = '';
        formLogin.reset();
        formRegister.reset();

        // Limpiar campos de entrega/retiro al cerrar modal
        direccionInput.value = '';
        sucursalSelect.value = '';
        hideError(direccionError);
        hideError(sucursalError);
    });

    btnShowLogin.addEventListener('click', () => {
        modalChoiceContent.classList.add('hidden');
        loginModal.classList.remove('hidden');
        registerModal.classList.add('hidden');
    });

    btnShowRegister.addEventListener('click', () => {
        modalChoiceContent.classList.add('hidden');
        registerModal.classList.remove('hidden');
        loginModal.classList.add('hidden');
    });

    // --- Botones de Volver en Modales de Login/Registro ---
    btnBackLogin.addEventListener('click', () => {
        loginModal.classList.add('hidden');
        modalChoiceContent.classList.remove('hidden');
        // Limpiar mensajes y errores del formulario de login al volver
        hideError(loginUsernameError);
        hideError(loginPasswordError);
        loginMessage.textContent = '';
        formLogin.reset();
    });

    btnBackRegister.addEventListener('click', () => {
        registerModal.classList.add('hidden');
        modalChoiceContent.classList.remove('hidden');
        // Limpiar mensajes y errores del formulario de registro al volver
        hideError(registerRunError);
        hideError(registerNombreError);
        hideError(registerApellidosError);
        hideError(registerEmailError);
        hideError(registerCelularError);
        registerMessage.textContent = '';
        formRegister.reset();
    });

    // --- Lógica de Login ---
    formLogin.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        const username = loginUsernameInput.value.trim();
        const password = loginPasswordInput.value.trim();

        if (username === '') {
            showError(loginUsernameError, 'El usuario es requerido.');
            isValid = false;
        } else {
            hideError(loginUsernameError);
        }

        if (password === '') {
            showError(loginPasswordError, 'La contraseña es requerida.');
            isValid = false;
        } else {
            hideError(loginPasswordError);
        }

        if (isValid) {
            if (username === 'admin' && password === 'admin') {
                loginMessage.textContent = 'Inicio de sesión exitoso';
                loginMessage.style.color = 'green';
                setTimeout(() => {
                    modalOverlay.classList.remove('active');
                    // Rellenar campos del formulario principal (excepto opciones de entrega y pago)
                    runInput.value = '19883288-k';
                    nombreInput.value = 'Juan';
                    apellidosInput.value = 'Pérez Díaz';
                    emailInput.value = 'juan.perez@example.com';
                    celularInput.value = '987654321';

                    // Ocultar errores si los hubiera
                    hideError(runError);
                    hideError(nombreError);
                    hideError(apellidosError);
                    hideError(emailError);
                    hideError(celularError);

                    // Rellenar datos de entrega/retiro
                    // Al iniciar sesión, por defecto se selecciona "Envío a domicilio" y se rellena la dirección
                    envioRadio.checked = true;
                    direccionEnvioGroup.classList.remove('hidden'); // Ensure the address field group is visible
                    direccionInput.value = 'Av. Siempre Viva 742, Springfield';
                    hideError(direccionError);

                    // If "Retiro en sucursal" was previously selected, uncheck it and hide its group
                    if (retiroRadio.checked) {
                        retiroRadio.checked = false;
                        sucursalRetiroGroup.classList.add('hidden');
                        hideError(sucursalError);
                        sucursalSelect.value = ''; // Clear selection
                    }

                    loginMessage.textContent = ''; // Limpiar mensaje
                    formLogin.reset(); // Limpiar formulario de login
                }, 1000);
            } else {
                loginMessage.textContent = 'Usuario o contraseña incorrectos.';
                loginMessage.style.color = 'red';
            }
        }
    });

    // --- Lógica de Registro ---
    formRegister.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        isValid = validateField(registerRunInput, registerRunError, validarRUN, 'RUN inválido.') && isValid;
        isValid = validateField(registerNombreInput, registerNombreError, (val) => val !== '', 'El nombre es requerido.') && isValid;
        isValid = validateField(registerApellidosInput, registerApellidosError, (val) => val !== '', 'Los apellidos son requeridos.') && isValid;
        isValid = validateField(registerEmailInput, registerEmailError, validateEmail, 'Email inválido.') && isValid;
        isValid = validateField(registerCelularInput, registerCelularError, validateCelular, 'Celular inválido (ej: 912345678).') && isValid;

        if (isValid) {
            registerMessage.textContent = '¡Registro exitoso! Ya puedes iniciar sesión.';
            registerMessage.style.color = 'green';
            formRegister.reset(); // Limpiar formulario de registro
            setTimeout(() => {
                registerMessage.textContent = '';
                // Opcional: redirigir a la pantalla de login o cerrar modal
                modalChoiceContent.classList.remove('hidden');
                registerModal.classList.add('hidden');
            }, 2000);
        } else {
            registerMessage.textContent = 'Por favor, corrige los errores en el formulario.';
            registerMessage.style.color = 'red';
        }
    });

    // --- Manejo de opciones de entrega ---
    envioRadio.addEventListener('change', () => {
        if (envioRadio.checked) {
            direccionEnvioGroup.classList.remove('hidden');
            sucursalRetiroGroup.classList.add('hidden');
            hideError(sucursalError); // Limpiar error de sucursal si cambia a envío
            sucursalSelect.value = ''; // Limpiar selección de sucursal
            direccionInput.required = true;
            sucursalSelect.required = false;
        }
    });

    retiroRadio.addEventListener('change', () => {
        if (retiroRadio.checked) {
            sucursalRetiroGroup.classList.remove('hidden');
            direccionEnvioGroup.classList.add('hidden');
            hideError(direccionError); // Limpiar error de dirección si cambia a retiro
            direccionInput.value = ''; // Limpiar dirección
            sucursalSelect.required = true;
            direccionInput.required = false;
        }
    });

    // --- Validación del Formulario Principal de Pago ---
    formPago.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Validar campos de texto
        isValid = validateField(runInput, runError, validarRUN, 'RUN inválido.') && isValid;
        isValid = validateField(nombreInput, nombreError, (val) => val !== '', 'El nombre es requerido.') && isValid;
        isValid = validateField(apellidosInput, apellidosError, (val) => val !== '', 'Los apellidos son requeridos.') && isValid;
        isValid = validateField(emailInput, emailError, validateEmail, 'Email inválido.') && isValid;
        isValid = validateField(celularInput, celularError, validateCelular, 'Celular inválido (ej: 912345678).') && isValid;

        // Validar opción de entrega
        if (!envioRadio.checked && !retiroRadio.checked) {
            showError(opcionEntregaError, 'Debes seleccionar una opción de entrega.');
            isValid = false;
        } else {
            hideError(opcionEntregaError);
            // Validar campo específico de entrega/retiro si la opción está seleccionada
            if (envioRadio.checked) {
                isValid = validateField(direccionInput, direccionError, (val) => val !== '', 'La dirección es requerida.') && isValid;
            } else if (retiroRadio.checked) {
                isValid = validateField(sucursalSelect, sucursalError, (val) => val !== '', 'Debes seleccionar una sucursal.') && isValid;
            }
        }

        // Validar método de pago
        if (!tarjetaRadio.checked && !transferenciaRadio.checked) {
            showError(metodoPagoError, 'Debes seleccionar un método de pago.');
            isValid = false;
        } else {
            hideError(metodoPagoError);
        }

        if (isValid) {
            alert('¡Gracias por tu compra! Tu pedido ha sido realizado.');
            localStorage.removeItem('carrito'); // Limpiar carrito
            window.location.href = '/html/index.html';
        } else {
            alert('Por favor, completa todos los campos requeridos, corrige los errores o inicia sesión.');
        }
    });

    // --- Event Listeners para validación en tiempo real (main form) ---
    runInput.addEventListener('input', () => validateField(runInput, runError, validarRUN, 'RUN inválido.'));
    nombreInput.addEventListener('input', () => validateField(nombreInput, nombreError, (val) => val !== '', 'El nombre es requerido.'));
    apellidosInput.addEventListener('input', () => validateField(apellidosInput, apellidosError, (val) => val !== '', 'Los apellidos son requeridos.'));
    emailInput.addEventListener('input', () => validateField(emailInput, emailError, validateEmail, 'Email inválido.'));
    celularInput.addEventListener('input', () => validateField(celularInput, celularError, validateCelular, 'Celular inválido (ej: 912345678).'));
    direccionInput.addEventListener('input', () => validateField(direccionInput, direccionError, (val) => val !== '', 'La dirección es requerida.'));
    sucursalSelect.addEventListener('change', () => validateField(sucursalSelect, sucursalError, (val) => val !== '', 'Debes seleccionar una sucursal.'));

    // --- Event Listeners para validación en tiempo real (registration form) ---
    registerRunInput.addEventListener('input', () => validateField(registerRunInput, registerRunError, validarRUN, 'RUN inválido.'));
    registerNombreInput.addEventListener('input', () => validateField(registerNombreInput, registerNombreError, (val) => val !== '', 'El nombre es requerido.'));
    registerApellidosInput.addEventListener('input', () => validateField(registerApellidosInput, registerApellidosError, (val) => val !== '', 'Los apellidos son requeridos.'));
    registerEmailInput.addEventListener('input', () => validateField(registerEmailInput, registerEmailError, validateEmail, 'Email inválido.'));
    registerCelularInput.addEventListener('input', () => validateField(registerCelularInput, registerCelularError, validateCelular, 'Celular inválido (ej: 912345678).'));

    // --- Event Listeners para radio buttons (cambio) ---
    envioRadio.addEventListener('change', () => hideError(opcionEntregaError));
    retiroRadio.addEventListener('change', () => hideError(opcionEntregaError));
    tarjetaRadio.addEventListener('change', () => hideError(metodoPagoError));
    transferenciaRadio.addEventListener('change', () => hideError(metodoPagoError));
});
