const questions = document.querySelectorAll('.faq-question');

questions.forEach(q => {
    q.addEventListener('click', () => {
        const item = q.parentElement;

        // Cierra las otras preguntas
        document.querySelectorAll('.faq-item').forEach(i => {
            if (i !== item) {
                i.classList.remove('active');
            }
        });

        // Abre la pregunta actual
        item.classList.toggle('active');
    });
});