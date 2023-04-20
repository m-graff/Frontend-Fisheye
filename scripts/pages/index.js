// Récupération des datas des différents photographes via un fetch
async function getPhotographers() {
    await fetch("./data/photographers.json")
		.then((res) => res.json())
		.then((data) => (photographers = data.photographers));
	return {
		photographers: [...photographers]            
	};
}

// Fonction d'affichage des Cards photographes
async function displayData(photographers) {
    const photographersSection = document.querySelector(".photographer_section");

    photographers.forEach((photographer) => {
        const photographerModel = photographerFactory(photographer);
        const userCardDOM = photographerModel.getUserCardDOM();
        photographersSection.appendChild(userCardDOM);
    });
};

// ------------ ????????? ------------- 

async function init() {
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
    displayData(photographers);
};
    
init();