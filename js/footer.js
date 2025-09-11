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
                        '/assets/noticia50anos.jpg',
                        '/assets/noticiadiaadia.jpg',
                        '/assets/noticiaguinness.jpg',
                        '/assets/noticiarecetas.jpg',
                        '/assets/duocuc.png',
                        '/assets/PSA001.jpg',
                        '/assets/PT001.jpg',
                        '/assets/PV001.jpg'
                    ];

                    footerInstagramGrid.innerHTML = instagramImages.map(src => `
                        <img src="${src}" alt="Instagram Image">
                    `).join('');
                }
            })
            .catch(error => console.error('Error al cargar el footer:', error));
    }
});
