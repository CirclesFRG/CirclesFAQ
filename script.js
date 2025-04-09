document.addEventListener('DOMContentLoaded', function () {
    const faqContainer = document.querySelector('.faq-container');
    
    // Fetch the FAQ data from the JSON file
    fetch('faqs.json')
        .then(response => response.json())
        .then(faqData => {
            faqData.forEach((faq, index) => {
                const faqItem = document.createElement('div');
                faqItem.classList.add('faq-item');

                const questionButton = document.createElement('button');
                questionButton.classList.add('faq-question');
                questionButton.setAttribute('aria-expanded', 'false');
                questionButton.setAttribute('aria-controls', `faq${index}`);
                questionButton.innerText = faq.question;

                const answerDiv = document.createElement('div');
                answerDiv.classList.add('faq-answer');
                answerDiv.setAttribute('id', `faq${index}`);
                answerDiv.setAttribute('role', 'region');
                answerDiv.setAttribute('aria-hidden', 'true');
                answerDiv.innerHTML = `<p>${faq.answer}</p>`;

                faqItem.appendChild(questionButton);
                faqItem.appendChild(answerDiv);
                faqContainer.appendChild(faqItem);
            });

            // Initialize toggle functionality for FAQs
            const faqQuestions = document.querySelectorAll('.faq-question');
            faqQuestions.forEach(function (question) {
                question.addEventListener('click', function () {
                    const currentItem = this.parentElement;
                    const openItem = document.querySelector('.faq-item.active');

                    // Close currently active item if it's not the one clicked
                    if (openItem && openItem !== currentItem) {
                        openItem.classList.remove('active');
                        openItem.querySelector('.faq-question').classList.remove('active');
                    }

                    // Toggle the current item
                    currentItem.classList.toggle('active');
                    this.classList.toggle('active');

                    // Toggle aria-expanded and aria-hidden for accessibility
                    const isActive = currentItem.classList.contains('active');
                    this.setAttribute('aria-expanded', isActive.toString());
                    currentItem.querySelector('.faq-answer').setAttribute('aria-hidden', (!isActive).toString());
                });
            });
        })
        .catch(error => console.error('Error loading FAQs:', error));

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
    const searchFAQs = function () {
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

    // Add event listener to the search input
    document.getElementById('searchInput').addEventListener('keyup', searchFAQs);
});
