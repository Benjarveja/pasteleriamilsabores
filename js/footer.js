document.addEventListener('DOMContentLoaded', () => {
    const footerContainer = document.getElementById('footer-container');

    if (footerContainer) {
        fetch('/html/footer.html')
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo cargar el footer');
                }
                return response.text();
            })
            .then(data => {
                footerContainer.innerHTML = data;

                // Lógica para las noticias en el footer
                const footerNewsContainer = document.getElementById('footer-news-container');
                if (footerNewsContainer) {
                    const newsData = [
                        {
                            title: '50 años de historia',
                            link: '/html/noticias.html',
                            snippet: 'Fue un día de 1975 cuando una pareja decidió dar el gran paso...'
                        },
                        {
                            title: 'A 30 años del Guinness',
                            link: '/html/noticias.html',
                            snippet: 'Hoy recordamos cuando nuestra pastelería colaboró en la creación de la torta más grande del mundo...'
                        }
                    ];

                    footerNewsContainer.innerHTML = newsData.map(item => `
                        <div class="news-item">
                            <a href="${item.link}">${item.title}</a>
                            <p>${item.snippet}</p>
                        </div>
                    `).join('');
                }

                // Lógica para las imágenes de Instagram (ejemplo con placeholders)
                const footerInstagramGrid = document.getElementById('footer-instagram-grid');
                if (footerInstagramGrid) {
                    const instagramImages = [
                        '/assets/insta1.jpg',
                        '/assets/insta2.jpg',
                        '/assets/insta3.jpg',
                        '/assets/insta4.jpg',
                        '/assets/insta5.jpg',
                        '/assets/insta6.jpg',
                        '/assets/insta7.jpg',
                        '/assets/insta8.jpg'
                    ];

                    footerInstagramGrid.innerHTML = instagramImages.map(src => `
                        <img src="${src}" alt="Instagram Image">
                    `).join('');
                }
            })
            .catch(error => console.error('Error al cargar el footer:', error));
    }
});
