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

fetch('./src/alcool.csv')
	.then(response => response.text())
		.then(csvTexte => {
			const tableau = document.getElementById('tableau-csv-alcool');
			let html = '';
			const lignes = csvTexte.trim().split('\n');
				lignes.forEach((ligne, index) => {
				const colonnes = ligne.split(','); 
				
				html += '<tr>';
				colonnes.forEach((cellule, numColonne) => {
					const texteNettoye = cellule.trim();
					if (index === 0) {
						html += `<th>${cellule.trim()}</th>`;
					} else {
						if (numColonne === 1) {
							html += `<td><img src="${texteNettoye}" alt="Image produit" style="max-width: 100px; height: auto;"></td>`;
						} else {
							html += `<td>${cellule.trim()}</td>`;
						}
					}
				});
				html += '</tr>';
			});
			tableau.innerHTML = html;
		})
		.catch(erreur => console.error("Impossible de charger le CSV :", erreur));