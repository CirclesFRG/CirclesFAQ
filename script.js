document.addEventListener('DOMContentLoaded', function () {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(function (question) {
        question.addEventListener('click', function () {
            const currentItem = this.parentElement;
            const openItem = document.querySelector('.faq-item.active');

            if (openItem && openItem !== currentItem) {
                openItem.classList.remove('active');
                openItem.querySelector('.faq-question').classList.remove('active');
            }

            currentItem.classList.toggle('active');
            this.classList.toggle('active');
        });
    });

    // Back to top button creation
    const backToTopBtn = document.createElement('button');
    backToTopBtn.id = 'backToTopBtn';
    backToTopBtn.innerText = '↑';
    document.body.appendChild(backToTopBtn);

    window.addEventListener('scroll', () => {
        backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none';
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});
