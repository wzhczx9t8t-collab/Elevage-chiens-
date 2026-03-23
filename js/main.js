let puppies = [
    {
        id: 1,
        name: "Rex",
        breed: "Berger Allemand",
        age: "3 mois",
        price: 1200,
        description: "Chiot Berger Allemand LOF, parents testés dysplasie, caractère équilibré.",
        image: "https://via.placeholder.com/300x250?text=Berger+Allemand",
        available: true,
        vaccines: "1er vaccin, vermifugé",
        gender: "Mâle"
    },
    {
        id: 2,
        name: "Luna",
        breed: "Golden Retriever",
        age: "2.5 mois",
        price: 1500,
        description: "Golden Retriever LOF, sociable et joueur.",
        image: "https://via.placeholder.com/300x250?text=Golden+Retriever",
        available: true,
        vaccines: "1er vaccin, vermifugé",
        gender: "Femelle"
    },
    {
        id: 3,
        name: "Rocky",
        breed: "Bouledogue Français",
        age: "4 mois",
        price: 1800,
        description: "Bouledogue Français LOF, calme et affectueux.",
        image: "https://via.placeholder.com/300x250?text=Bouledogue+Francais",
        available: true,
        vaccines: "Vaccins à jour, vermifugé",
        gender: "Mâle"
    }
];

function savePuppies() {
    localStorage.setItem('puppies', JSON.stringify(puppies));
}

function loadPuppies() {
    const stored = localStorage.getItem('puppies');
    if (stored) {
        puppies = JSON.parse(stored);
    } else {
        savePuppies();
    }
}

function displayHomePuppies() {
    const grid = document.getElementById('home-puppies');
    if (!grid) return;
    
    const availablePuppies = puppies.filter(p => p.available).slice(0, 4);
    
    grid.innerHTML = availablePuppies.map(puppy => `
        <div class="puppy-card">
            <img src="${puppy.image}" alt="${puppy.name}">
            <div class="puppy-info">
                <h3>${puppy.name}</h3>
                <p class="puppy-breed">${puppy.breed}</p>
                <p>Âge : ${puppy.age}</p>
                <p class="puppy-price">${puppy.price} €</p>
                <a href="product.html?id=${puppy.id}" class="btn-primary">Voir détails</a>
            </div>
        </div>
    `).join('');
}

function displayCatalog() {
    const grid = document.querySelector('.puppies-grid');
    if (!grid) return;
    
    const availablePuppies = puppies.filter(p => p.available);
    
    if (availablePuppies.length === 0) {
        grid.innerHTML = '<p style="text-align:center;">Aucun chiot disponible.</p>';
        return;
    }
    
    grid.innerHTML = availablePuppies.map(puppy => `
        <div class="puppy-card">
            <img src="${puppy.image}" alt="${puppy.name}">
            <div class="puppy-info">
                <h3>${puppy.name}</h3>
                <p class="puppy-breed">${puppy.breed}</p>
                <p>Âge : ${puppy.age}</p>
                <p>Sexe : ${puppy.gender}</p>
                <p class="puppy-price">${puppy.price} €</p>
                <a href="product.html?id=${puppy.id}" class="btn-primary">Réserver</a>
            </div>
        </div>
    `).join('');
}

function loadProductDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const puppyId = parseInt(urlParams.get('id'));
    
    const puppy = puppies.find(p => p.id === puppyId);
    
    if (!puppy) {
        window.location.href = 'catalog.html';
        return;
    }
    
    const nameEl = document.getElementById('puppy-name');
    if (nameEl) nameEl.textContent = puppy.name;
    const breedEl = document.getElementById('puppy-breed');
    if (breedEl) breedEl.textContent = puppy.breed;
    const ageEl = document.getElementById('puppy-age');
    if (ageEl) ageEl.textContent = puppy.age;
    const genderEl = document.getElementById('puppy-gender');
    if (genderEl) genderEl.textContent = puppy.gender;
    const priceEl = document.getElementById('puppy-price');
    if (priceEl) priceEl.textContent = `${puppy.price} €`;
    const descEl = document.getElementById('puppy-description');
    if (descEl) descEl.textContent = puppy.description;
    const vaccinesEl = document.getElementById('puppy-vaccines');
    if (vaccinesEl) vaccinesEl.textContent = puppy.vaccines;
    const imgEl = document.getElementById('puppy-image');
    if (imgEl) imgEl.src = puppy.image;
    
    const reserveBtn = document.getElementById('reserve-btn');
    if (reserveBtn) {
        reserveBtn.href = `checkout.html?id=${puppy.id}`;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadPuppies();
    displayHomePuppies();
    displayCatalog();
    loadProductDetails();
});
