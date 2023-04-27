// Fonction de création des Cards photographes contenant leurs informations personnelles 
function photographerFactory(data) {
	const { name, portrait, city, country, tagline, price, id } = data;
	const picture = `assets/photographers/${portrait}`;
    
	// Création du DOM des Cards photographe --- AJOUTER PP POUR LA CONSTITUTION DE DOM 
	function getUserCardDOM() {
		const article = document.createElement( "article" );
		const img = document.createElement( "img" );
		const a = document.createElement( "a" );
		a.setAttribute("href", `photographer.html?id=${id}`);
		img.setAttribute("src", picture);
		img.setAttribute("alt", name);
		const h2 = document.createElement( "h2" );
		h2.textContent = name;
		const location = document.createElement( "p" );
		location.textContent = `${city}, ${country}`;
		const tagLine = document.createElement( "span" );
		tagLine.classList.add("tagLine");
		tagLine.textContent = tagline;
		const prices = document.createElement( "span" );
		prices.textContent = `${price}€/jour`;
		prices.classList.add("prices");
            
		a.appendChild(img);
		a.appendChild(h2);
		article.appendChild(a);
		article.appendChild(location);
		article.appendChild(tagLine);
		article.appendChild(prices);

		return (article);
	}

	return { name, picture, getUserCardDOM };
}

