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

/*accueil*/
document.querySelectorAll('.carte-accueil').forEach(function(carte) {
    carte.addEventListener('click', function() {
        const cible = carte.dataset.target;

        pages.forEach(function(page) {
            page.classList.remove('active');
        });

        document.getElementById(cible).classList.add('active');
    });
});

/*cocktails*/
fetch('./src/alcool.csv')
	.then(response => response.text())
		.then(csvTexte => {
			const lignes = csvTexte.trim().split('\n');
			let cocktails = [];

			lignes.forEach((ligne, index) => {
				if (index === 0) return;
				const colonnes = ligne.split(';');
				const cocktail = {
					nom: colonnes[0].trim(),
					photo: colonnes[1].trim(),
					description: colonnes[2].trim(),
					recette: colonnes[3].trim()
				};
				cocktails.push(cocktail);
			});
			const grille = document.getElementById('grille-cocktails');
			const detail = document.getElementById('detail-cocktail');
			function afficherGrille(liste) {
				grille.innerHTML = '';

				liste.forEach(function(cocktail, index) {
					const carte = document.createElement('div');
					carte.className = 'carte-cocktail';
					carte.innerHTML = `
						<img src="${cocktail.photo}" alt="${cocktail.nom}">
						<p>${cocktail.nom}</p>
					`;

					carte.addEventListener('click', function() {
						afficherDetail(index);
					});

					grille.appendChild(carte);
				});
			}

			function afficherDetail(index) {
				const cocktail = cocktails[index];

				document.getElementById('detail-nom').textContent = cocktail.nom;
				document.getElementById('detail-photo').src = cocktail.photo;
				document.getElementById('detail-photo').alt = cocktail.nom;
				document.getElementById('detail-ingredients').textContent = cocktail.recette;
				document.getElementById('detail-description').textContent = cocktail.description;

				grille.classList.add('cache');
				detail.classList.remove('cache');
			}

			document.getElementById('bouton-retour').addEventListener('click', function() {
				detail.classList.add('cache');
				grille.classList.remove('cache');
			});
			document.getElementById('recherche-cocktail').addEventListener('input', function() {
				const texteTape = this.value.toLowerCase();

				const cocktailsFiltres = cocktails.filter(function(cocktail) {
					return cocktail.nom.toLowerCase().includes(texteTape);
				});

				afficherGrille(cocktailsFiltres);
			});

			afficherGrille(cocktails);
					})
			.catch(erreur => console.error("Impossible de charger le CSV :", erreur));