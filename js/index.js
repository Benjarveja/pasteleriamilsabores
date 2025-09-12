document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DEL SLIDER PRINCIPAL ---
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    const sliderPrevBtn = document.getElementById('slider-prev-btn');
    const sliderNextBtn = document.getElementById('slider-next-btn');

    if (sliderWrapper && slides.length > 0 && sliderPrevBtn && sliderNextBtn) {
        let currentIndex = 0;
        const slideCount = slides.length;
        let slideInterval;

        const goToSlide = (index) => {
            if (index < 0) {
                currentIndex = slideCount - 1;
            } else if (index >= slideCount) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        };

        const startSlider = () => {
            slideInterval = setInterval(() => {
                goToSlide(currentIndex + 1);
            }, 4000); // Cambia de slide cada 4 segundos
        };

        const stopSlider = () => {
            clearInterval(slideInterval);
        };

        // Eventos para botones de navegación
        sliderPrevBtn.addEventListener('click', () => {
            stopSlider();
            goToSlide(currentIndex - 1);
            startSlider();
        });

        sliderNextBtn.addEventListener('click', () => {
            stopSlider();
            goToSlide(currentIndex + 1);
            startSlider();
        });

        sliderWrapper.addEventListener('mouseenter', stopSlider);
        sliderWrapper.addEventListener('mouseleave', startSlider);

        startSlider();
    }

    // --- LÓGICA DEL CARRUSEL DE OPINIONES DE CLIENTES ---
    const reviewsWrapper = document.getElementById('reviews-wrapper');
    const reviewPrevBtn = document.getElementById('review-prev-btn');
    const reviewNextBtn = document.getElementById('review-next-btn');

    if (reviewsWrapper && reviewPrevBtn && reviewNextBtn) {
        const reviews = [
            {
                author: 'Laura',
                stars: 5,
                comment: '¡La Torta de Manjar es increíble! Nunca he probado una igual. Se nota que los ingredientes son de primera calidad.'
            },
            {
                author: 'Carlos',
                stars: 5,
                comment: 'Excelente servicio y productos deliciosos. La Tarta de Santiago es un viaje directo a Galicia. ¡Totalmente recomendados!'
            },
            {
                author: 'Sofía',
                stars: 4,
                comment: 'Me encantó el cheesecake sin azúcar, muy suave y sabroso. Sería genial que tuvieran más opciones de postres individuales.'
            },
            {
                author: 'Andrés',
                stars: 5,
                comment: 'Siempre pido mis tortas aquí. La calidad es insuperable y el diseño siempre es perfecto para cada ocasión. ¡Un 7!'
            },
            {
                author: 'María',
                stars: 4,
                comment: 'Las galletas veganas de avena son deliciosas, no se nota que son veganas. Un poco caras, pero valen la pena.'
            }
        ];

        let currentReviewIndex = 0;
        const reviewCount = reviews.length;
        let reviewInterval;

        const renderReviews = () => {
            reviewsWrapper.innerHTML = '';
            reviews.forEach(review => {
                const starsHtml = '★'.repeat(review.stars) + '☆'.repeat(5 - review.stars);
                const reviewCard = `
                    <div class="review-card">
                        <div class="stars">${starsHtml}</div>
                        <p class="comment">"${review.comment}"</p>
                        <p class="author">- ${review.author}</p>
                    </div>
                `;
                reviewsWrapper.innerHTML += reviewCard;
            });
        };

        const goToReview = (index) => {
            if (index < 0) {
                currentReviewIndex = reviewCount - 1;
            } else if (index >= reviewCount) {
                currentReviewIndex = 0;
            } else {
                currentReviewIndex = index;
            }
            reviewsWrapper.style.transform = `translateX(-${currentReviewIndex * 100}%)`;
        };

        const startReviewCarousel = () => {
            reviewInterval = setInterval(() => {
                goToReview(currentReviewIndex + 1);
            }, 5000); // Cambia de opinión cada 5 segundos
        };

        const stopReviewCarousel = () => {
            clearInterval(reviewInterval);
        };

        // Eventos para botones de navegación
        reviewPrevBtn.addEventListener('click', () => {
            stopReviewCarousel();
            goToReview(currentReviewIndex - 1);
            startReviewCarousel();
        });

        reviewNextBtn.addEventListener('click', () => {
            stopReviewCarousel();
            goToReview(currentReviewIndex + 1);
            startReviewCarousel();
        });

        // Pausar/Reanudar en hover
        reviewsWrapper.addEventListener('mouseenter', stopReviewCarousel);
        reviewsWrapper.addEventListener('mouseleave', startReviewCarousel);

        // Inicialización
        renderReviews();
        startReviewCarousel();
    }
});
old_string:
document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DEL SLIDER PRINCIPAL ---
    const sliderWrapper = document.querySelector('.slider-wrapper');
    const slides = document.querySelectorAll('.slide');
    if (sliderWrapper && slides.length > 0) {
        let currentIndex = 0;
        const slideCount = slides.length;
        let slideInterval;

        const goToSlide = (index) => {
            sliderWrapper.style.transform = `translateX(-${index * 100}%)`;
        };

        const startSlider = () => {
            slideInterval = setInterval(() => {
                currentIndex = (currentIndex + 1) % slideCount;
                goToSlide(currentIndex);
            }, 4000); // Cambia de slide cada 4 segundos
        };

        const stopSlider = () => {
            clearInterval(slideInterval);
        };

        sliderWrapper.addEventListener('mouseenter', stopSlider);
        sliderWrapper.addEventListener('mouseleave', startSlider);

        startSlider();
    }

    // --- LÓGICA DE PRODUCTOS POPULARES ---
    const popularProductsContainer = document.getElementById('popular-products-grid');
    if (popularProductsContainer) {
        const popularProducts = [
            { codigo: 'TT002', categoria: 'Tortas Circulares', nombre: 'Torta Circular de Manjar', precio: 42000, imagen: '/assets/TT002.jpg' },
            { codigo: 'TC001', categoria: 'Tortas Cuadradas', nombre: 'Torta Cuadrada de Chocolate', precio: 45000, imagen: '/assets/TC001.jpg' },
            { codigo: 'PI002', categoria: 'Postres Individuales', nombre: 'Tiramisú Clásico', precio: 5500, imagen: '/assets/PI002.jpg' },
            { codigo: 'PT002', categoria: 'Pastelería Tradicional', nombre: 'Tarta de Santiago', precio: 6000, imagen: '/assets/PT002.jpg' }
        ];

        // Generar el HTML de todas las tarjetas
        const cardsHTML = popularProducts.map(prod => `
            <div class="card producto-card" data-id="${prod.codigo}">
                <img src="${prod.imagen}" alt="${prod.nombre}">
                <h3>${prod.nombre}</h3>
                <p>${prod.categoria}</p>
                <p class="precio">$${prod.precio.toLocaleString('es-CL')} CLP</p>
                <button class="btn-agregar-carrito">Agregar al carrito</button>
            </div>
        `).join("");

        // Insertar de una sola vez
        popularProductsContainer.innerHTML = cardsHTML;
    }

    // --- LÓGICA DE OPINIONES DE CLIENTES ---
    const reviewsContainer = document.getElementById('reviews-grid');
    if (reviewsContainer) {
        const reviews = [
            {
                author: 'Laura',
                stars: 5,
                comment: '¡La Torta de Manjar es increíble! Nunca he probado una igual. Se nota que los ingredientes son de primera calidad.'
            },
            {
                author: 'Carlos',
                stars: 5,
                comment: 'Excelente servicio y productos deliciosos. La Tarta de Santiago es un viaje directo a Galicia. ¡Totalmente recomendados!'
            },
            {
                author: 'Sofía',
                stars: 4,
                comment: 'Me encantó el cheesecake sin azúcar, muy suave y sabroso. Sería genial que tuvieran más opciones de postres individuales.'
            }
        ];

        reviews.forEach(review => {
            const starsHtml = '★'.repeat(review.stars) + '☆'.repeat(5 - review.stars);
            const reviewCard = `
                <div class="review-card">
                    <div class="stars">${starsHtml}</div>
                    <p class="comment">"${review.comment}"</p>
                    <p class="author">- ${review.author}</p>
                </div>
            `;
            reviewsContainer.innerHTML += reviewCard;
        });
    }
});
