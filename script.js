document.addEventListener('DOMContentLoaded', function() {
    var faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(function(question) {
        question.addEventListener('click', function() {
            var answer = this.nextElementSibling;
            if (answer.style.display === 'block') {
                answer.style.display = 'none';
            } else {
                answer.style.display = 'block';
            }
        });
    });
});

function searchFAQs() {
    var input, filter, faqContainer, faqItems, question, i, txtValue;
    input = document.getElementById('searchInput');
    filter = input.value.toUpperCase();
    faqContainer = document.querySelector('.faq-container');
    faqItems = faqContainer.getElementsByClassName('faq-item');
    for (i = 0; i < faqItems.length; i++) {
        question = faqItems[i].getElementsByClassName('faq-question')[0];
        txtValue = question.textContent || question.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            faqItems[i].style.display = '';
        } else {
            faqItems[i].style.display = 'none';
        }
    }
}
