document.addEventListener('DOMContentLoaded', function () {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(function (question) {
        question.addEventListener('click', function () {
            const currentItem = this.parentElement;
            const openItem = document.querySelector('.faq-item.active');

            // Close any open item
            if (openItem && openItem !== currentItem) {
                openItem.classList.remove('active');
                const openBtn = openItem.querySelector('.faq-question');
                openBtn.classList.remove('active');
                openBtn.setAttribute('aria-expanded', 'false');
                openItem.querySelector('.faq-answer').setAttribute('aria-hidden', 'true');
            }

            // Toggle current item
            currentItem.classList.toggle('active');
            this.classList.toggle('active');

            const isActive = currentItem.classList.contains('active');
            this.setAttribute('aria-expanded', isActive.toString());
            currentItem.querySelector('.faq-answer').setAttribute('aria-hidden', (!isActive).toString());
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

    // Search function with auto-collapse
    window.searchFAQs = function () {
        const input = document.getElementById("searchInput").value.toLowerCase();
        const faqItems = document.querySelectorAll(".faq-item");

        faqItems.forEach(item => {
            const question = item.querySelector(".faq-question").textContent.toLowerCase();
            const answer = item.querySelector(".faq-answer").textContent.toLowerCase();

            const match = question.includes(input) || answer.includes(input);
            item.style.display = match ? "block" : "none";

            // Collapse all during search
            item.classList.remove('active');
            const btn = item.querySelector('.faq-question');
            const ans = item.querySelector('.faq-answer');
            btn.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
            ans.setAttribute('aria-hidden', 'true');
        });
    };
});
