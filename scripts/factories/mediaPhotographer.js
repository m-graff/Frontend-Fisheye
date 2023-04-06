// Fonction récupérant les infos sur le profil du photographe 
function photographerInfosHeader(photographer) {
    const photographerHeader = document.querySelector(".photograph-header");
    const { name, portrait, city, country, tagline } = photographer;

    const BlocPhotographerProfile = document.createElement("div");
	BlocPhotographerProfile.classList.add("photographerProfile");
	BlocPhotographerProfile.innerHTML = `<h1 class="photographerName">${name}</h1>
                                        <p class="photographerCity">${city}, ${country}
                                        <p class="photographerTagline">${tagline}</p>`;
	const photographerPortraitContainer = document.createElement("div");
	photographerPortraitContainer.classList.add("photographer-portrait-container");
	const photographerPortrait = document.createElement("img");
	photographerPortrait.setAttribute("src", `assets/photographers/${portrait}`);
	photographerPortrait.setAttribute("alt", `Photo de ${portrait}`);
	photographerPortraitContainer.appendChild(photographerPortrait);
	photographerHeader.appendChild(photographerPortraitContainer);
	photographerHeader.appendChild(BlocPhotographerProfile);
	return photographerHeader;
}

/* Permet de mettre à jour la modal de contact avec les informations du photographe (nom) */
function photographerInfosContact(photographer) {
    const contactName = document.querySelector("#contact-name");
    const { name } = photographer;
	contactName.textContent = name
}

/* Factory Media permettant de trier image et vidéo */
class MediaFactory {
	constructor(media) {
		this.media = media
	}

	render() {
		if (this.media.image) {
			return `<img class="imgGalery" src="assets/photos/${this.media.photographerId}/${this.media.image}" alt="${this.media.title}">`
		} else {
			return `<video controls class="imgGalery">
				<source src="assets/photos/${this.media.photographerId}/${this.media.video}" type="video/mp4" >`
		}
	}

}

// Fonction de création de la galerie photos des photographes
function photographerMediaFactory(media) {

	const { title } = media;
	let likes = media.likes;

	// Création du DOM lightbox
	function createLightboxDOM() {
		const mediaItem = document.createElement('li');
		const mediaFactory = new MediaFactory(media);
		const mediaTitle = document.createElement('h2');
		mediaTitle.innerText = title
		mediaItem.innerHTML = mediaFactory.render();
		mediaItem.appendChild(mediaTitle)
		return mediaItem;
	}

	// Création du DOM galerie 
	function CreateGaleryDom(idx) {
		const BlocPhotographerGalery = document.querySelector(".photographer-galery");
		BlocPhotographerGalery.classList.add("container");
		const photographerArticle = document.createElement("article");
		photographerArticle.classList.add("photographer-galery-item");
		const photographerMedia = document.createElement("a");
		photographerMedia.setAttribute('href',"#");

		// ------------ ????????? ------------- 

		// Section ajoutant les informations de la photo 
		const photographerArticleInfos = document.createElement("div");
		photographerArticleInfos.classList.add("photographer-galery-item-info");
		const photographerArticleTitle = document.createElement("h2");
		photographerArticleTitle.classList.add("title-photo");
		photographerArticleTitle.textContent = `${title}`;
		photographerArticleInfos.appendChild(photographerArticleTitle);

		// Section ajoutant les likes sur les photos
		const likesElement = document.createElement('button');
		likesElement.classList.add("btn-like-photo")
		const likesHeart = document.createElement('i');
		likesHeart.classList = "fas fa-heart";
		const likesCount = document.createElement('span');
		likesCount.innerText = likes;
		likesElement.appendChild(likesCount);
		likesElement.appendChild(likesHeart);
		photographerArticleInfos.appendChild(likesElement);


		const mediaFactory = new MediaFactory(media);
		photographerMedia.classList.add('photographer-galery-media');
		photographerMedia.setAttribute('data-idx', idx);
		photographerMedia.innerHTML = mediaFactory.render();

		photographerArticle.appendChild(photographerMedia);
		photographerArticle.appendChild(photographerArticleInfos);

		/* Ajout au clic d'un like par photo */ 
		likesElement.addEventListener('click', () => {
			likes += 1;
			likesCount.innerText = likes;
			const totalLike = document.querySelector('.total-like');
			totalLike.innerText = parseInt(totalLike.innerText) + 1;
			likesElement.setAttribute('disabled', ''); // Ajouter un aria une fois le bouton désactiver pour indiquer à l'utilisateur qu'il ne peut que liker qu'une fois 
		})
		return (photographerArticle);
	}
	return { CreateGaleryDom, createLightboxDOM };
}


/* Fonction de création du bloc likes & price total en base de page */
function getLikesPrice (media, photographer) {
	const blocLikesPrice = document.querySelector("#likes-price");

	/* Affichage des likes totaux */
	const photographerLikes = document.createElement("div");
	photographerLikes.className = "bloc-likes";
	blocLikesPrice.appendChild(photographerLikes);
	const totalLike = document.createElement("span");
	totalLike.className = "total-like";
	photographerLikes.appendChild(totalLike);
	const photographerLikesHeart = document.createElement("i");
	photographerLikesHeart.className = "fas fa-heart";
	photographerLikes.appendChild(photographerLikesHeart);

	// Calcul de l'affichage des likes totaux
	const likeCount = media.reduce((acc, curr) => acc + curr.likes, 0 );
	totalLike.innerHTML = likeCount;

	/* Affichage du prix journalier par photographe */ 
	const photographerPrice = document.createElement("span");
	photographerPrice.setAttribute("aria-label", "Tarif journalier du photographe");
	photographerPrice.className = "photographer-price";
	blocLikesPrice.appendChild(photographerPrice)
	photographerPrice.innerHTML = `${photographer.price}€ / jour`;
}

/* Fonction d'affichage de la modal lightbox */ 
const lightboxModal = document.getElementsByClassName("lightbox-container");
function displayLightbox() {
	lightboxModal.style.display = "block";
	document.querySelector("body").style.overflow = "hidden"
}



