const boutons = document.querySelectorAll('#menu button');
const pages = document.querySelectorAll('.page')

boutons.forEach(function(bouton){
    bouton.addEventListener('click', function() {
        const cible = bouton.dataset.target;

        pages.forEach(function(page) {
            page.classList.remove('active');
        });
        document.getElementById(cible).classList.add('active');
    });
});