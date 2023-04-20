// Récupération des identifiants des photographes dans l'URL 
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const photographerId = parseInt(urlParams.get("id")); 

// Initialisation de l'index photo Lightbox
let lightboxIdx = 0;

// Récupération des datas des différents photographes via un fetch
async function getPhotographer() {
    const photographers = await fetch("./data/photographers.json")
		.then((res) => res.json())
		.then(data => data.photographers)
	return {
		photographer: photographers.find(p => p.id === photographerId)           
	};
}

// Récupération des datas MEDIA des différents photographes via un fetch 
async function getMedia() {
    await fetch("./data/photographers.json")
		.then((res) => res.json())
		.then((data) => (media = data.media));
	return {
		media: media.filter(m => m.photographerId === photographerId)         
	};
}

// Page photographe : Affichage des datas liées au profil des protographes
async function displayDataPhotographer(photographer) {
	photographerInfosHeader(photographer);
	photographerInfosContact(photographer)
}

// Affichage des photos dans la gallerie dédiée
async function displayDataGalery(media) {
	const photographerGalery = document.querySelector('.photographer-galery');
	photographerGalery.innerHTML = '';
	media.forEach((itemMedia, idx) => {
		const photographerGaleryModel = photographerMediaFactory(itemMedia);
		const userGaleryCardDOM = photographerGaleryModel.CreateGaleryDom(idx);
		photographerGalery.appendChild(userGaleryCardDOM);    
	})
}

// Affichage Lightbox
function displayDataLightbox(medias) {
	const lightbox = document.querySelector('.lightbox');
	lightbox.innerHTML = '';
	medias.forEach(itemMedia => {
		const photographerLightboxModel = photographerMediaFactory(itemMedia);
		const userLightboxDOM = photographerLightboxModel.createLightboxDOM();
		lightbox.appendChild(userLightboxDOM);    
	})	
}

// Fonction de tri via le Select 
function sortMedia(media, triValue) {

	switch (triValue) {
		case "popularite": {
			return media.sort((a, b) => b.likes - a.likes);
		}

		case "date": {
			return media.sort((a, b) => new Date(a.date) - new Date(b.date));
		}
			
		case "titre": {
			return media.sort((a, b) => {
				if (a.title < b.title) { return -1; } return 1;
			});
		}
	}
}

// Ecoute de l'évènement Select et affichage du résultat du tri 
function selectData(media) {
    const select = document.querySelector('#select');
    select.addEventListener('change', (e) => {
        const sortedMedia = sortMedia(media, e.target.value);
        displayDataGalery(sortedMedia);
		displayDataLightbox(sortedMedia);
		setGalleryEvent();
    })
}

// Evènements modale Lightbox
function setLightboxEvents(mediaLength){
	const lightboxModal = document.querySelector(".lightbox-container");
	const lightbox = document.querySelector('.lightbox');
	const lightboxBg = document.querySelector(".lightbox-bg");
	const prevButton = document.querySelector('.lightbox-prev');
	const nextButton = document.querySelector('.lightbox-next');
	const closeLightbox = document.querySelector(".lightbox-close");
	const lightboxSlide = document.querySelector('.lightbox li');
	const slideWidth = lightboxSlide.clientWidth;

	// Initialisation de la suppression bloc likes/prix suite à l'activation de la Lightbox 
	const likesPrices = document.getElementById('likes-price');

	// Comportements suites à l'action bouton escape, flèche précédente, flèche suivante
	const keyCodes = {
		escape: "Escape",
		previous: "ArrowLeft",
		next: "ArrowRight"
	};
	window.addEventListener('keydown', (event) => {
		if (event.code === keyCodes.escape) {
			closeModal();
		}
		if (event.code === keyCodes.previous) {
			previousSlide();
		}
		if (event.code === keyCodes.next) {
			nextSlide();
		}
	})

    // Déclenchement fermeture Lightbox au clic croix
    closeLightbox.addEventListener("click", closeModal);
    // Déclenchement flèche de gauche, précédente
    prevButton.addEventListener('click', previousSlide)
    // Déclenchement flèche de droite, suivante
    nextButton.addEventListener('click', nextSlide)

	// Fonction déterminant le comportement de la Lightbox suites à sa fermeture
	function closeModal() {
		lightboxModal.style.opacity = 0;
		setTimeout(() => {
			lightboxModal.style.visibility = "hidden";
		}, 500)
		lightboxBg.style.visibility = "hidden";
		// Réaffichage du bloc likes/prix suites à la fermeture de la Lightbox 
		likesPrices.style.visibility = "visible";
	}

	// Calcul translation flèche de gauche Lightbox, précédente 
    function previousSlide() {
        lightboxIdx -= 1
			if (lightboxIdx === -1) {
				lightboxIdx = mediaLength - 1
			}
        lightbox.style.transform = `translateX(-${slideWidth * lightboxIdx}px)`
    }
	// Calcul translation flèche de droite Lightbox, suivante
    function nextSlide() {
        lightboxIdx += 1
			if (lightboxIdx === mediaLength) {
				lightboxIdx = 0
			}
        lightbox.style.transform = `translateX(-${slideWidth * lightboxIdx}px)`
    }

}

// Fonction d'affichage de la Lightbox en fonction de l'index des photos de la gallerie
function setGalleryEvent(){
	const galleryMedias = document.querySelectorAll('.photographer-galery-media');
    const lightboxContainer = document.querySelector('.lightbox-container');
    const lightbox = document.querySelector('.lightbox');
    const lightboxBg = document.querySelector('.lightbox-bg');
    const lightboxSlide = document.querySelector('.lightbox li');
    const slideWidth = lightboxSlide.clientWidth;
	const likesPrices = document.getElementById('likes-price');

	// Permet d'ouvrir la Lightbox sur la bonne photo en fonction du clic sur la galerie 
	galleryMedias.forEach((galleryMedia) => {
		galleryMedia.addEventListener('click', (event) => {
            lightboxIdx = parseInt(event.currentTarget.dataset.idx);
			lightbox.style.transform = `translateX(-${slideWidth * lightboxIdx}px)`;
            lightboxContainer.style.visibility = 'visible';
            lightboxContainer.style.opacity = 1;
            lightboxBg.style.visibility = 'visible';
			likesPrices.style.visibility = "hidden";
			document.querySelector('.lightbox .imgGalery').focus();
		})
	})
}

/* Validation console formulaire de contact */
function setContactFormEvent(){
	const form = document.querySelector('#contact');
	form.addEventListener('submit', (e) => {
		e.preventDefault();
		console.log(`Prénom: ${e.target.prenom.value}`)
		console.log(`Nom: ${e.target.nom.value}`)
		console.log(`Email: ${e.target.email.value}`)
		console.log(`Message: ${e.target.message.value}`)
		closeModal()
	})
}

// Fonction d'initialisation permettant de récupérer les informations du photographe, de les afficher, tout en gérant les événements 
async function init() {
	const { photographer } = await getPhotographer();
	const { media } = await getMedia();
	let sortedMedia = sortMedia(media, 'popularite'); // Par défaut select est sur popularite 
	displayDataPhotographer(photographer);
	displayDataGalery(sortedMedia);
	selectData(media);
	getLikesPrice(media, photographer);
	displayDataLightbox(sortedMedia);
	setLightboxEvents(media.length);
	setGalleryEvent();
	setContactFormEvent()
}
init();
