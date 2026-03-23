let puppies = [];

function loadPuppiesFromStorage() {
    const stored = localStorage.getItem('puppies');
    if (stored) {
        puppies = JSON.parse(stored);
    } else {
        puppies = [];
    }
}

function savePuppiesToStorage() {
    localStorage.setItem('puppies', JSON.stringify(puppies));
}

function renderPuppiesTable() {
    const tbody = document.getElementById('puppies-table-body');
    if (!tbody) return;
    
    tbody.innerHTML = puppies.map(puppy => `
        <tr>
            <td>${puppy.id}</td>
            <td><img src="${puppy.image}" style="width:50px;height:50px;object-fit:cover;border-radius:8px;"></td>
            <td>${puppy.name}</td>
            <td>${puppy.breed}</td>
            <td>${puppy.age}</td>
            <td>${puppy.price} €</td>
            <td>${puppy.available ? '✅' : '❌'}</td>
            <td class="admin-actions">
                <button class="edit-btn" data-id="${puppy.id}">✏️</button>
                <button class="delete-btn" data-id="${puppy.id}">🗑️</button>
            </td>
        </tr>
    `).join('');
    
    document.querySelectorAll('.edit-btn').forEach(btn => {
        btn.addEventListener('click', () => openEditModal(parseInt(btn.dataset.id)));
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', () => deletePuppy(parseInt(btn.dataset.id)));
    });
}

function getNextId() {
    if (puppies.length === 0) return 1;
    return Math.max(...puppies.map(p => p.id)) + 1;
}

function addPuppy(puppyData) {
    const newPuppy = {
        id: getNextId(),
        ...puppyData,
        available: puppyData.available === 'true'
    };
    puppies.push(newPuppy);
    savePuppiesToStorage();
    renderPuppiesTable();
}

function updatePuppy(id, updatedData) {
    const index = puppies.findIndex(p => p.id === id);
    if (index !== -1) {
        puppies[index] = {
            ...puppies[index],
            ...updatedData,
            available: updatedData.available === 'true'
        };
        savePuppiesToStorage();
        renderPuppiesTable();
    }
}

function deletePuppy(id) {
    if (confirm('Supprimer ce chiot ?')) {
        puppies = puppies.filter(p => p.id !== id);
        savePuppiesToStorage();
        renderPuppiesTable();
    }
}

function openAddModal() {
    document.getElementById('modal-title').textContent = 'Ajouter un chiot';
    document.getElementById('puppy-form').reset();
    document.getElementById('puppy-id').value = '';
    document.getElementById('puppy-modal').style.display = 'flex';
}

function openEditModal(id) {
    const puppy = puppies.find(p => p.id === id);
    if (!puppy) return;
    
    document.getElementById('modal-title').textContent = 'Modifier le chiot';
    document.getElementById('puppy-id').value = puppy.id;
    document.getElementById('puppy-name').value = puppy.name;
    document.getElementById('puppy-breed').value = puppy.breed;
    document.getElementById('puppy-gender').value = puppy.gender;
    document.getElementById('puppy-age').value = puppy.age;
    document.getElementById('puppy-price').value = puppy.price;
    document.getElementById('puppy-image').value = puppy.image;
    document.getElementById('puppy-description').value = puppy.description || '';
    document.getElementById('puppy-vaccines').value = puppy.vaccines || '';
    document.getElementById('puppy-available').value = puppy.available ? 'true' : 'false';
    document.getElementById('puppy-modal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('puppy-modal').style.display = 'none';
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const id = document.getElementById('puppy-id').value;
    const puppyData = {
        name: document.getElementById('puppy-name').value,
        breed: document.getElementById('puppy-breed').value,
        gender: document.getElementById('puppy-gender').value,
        age: document.getElementById('puppy-age').value,
        price: parseFloat(document.getElementById('puppy-price').value),
        image: document.getElementById('puppy-image').value,
        description: document.getElementById('puppy-description').value,
        vaccines: document.getElementById('puppy-vaccines').value,
        available: document.getElementById('puppy-available').value
    };
    
    if (id) {
        updatePuppy(parseInt(id), puppyData);
    } else {
        addPuppy(puppyData);
    }
    
    closeModal();
}

document.addEventListener('DOMContentLoaded', () => {
    loadPuppiesFromStorage();
    renderPuppiesTable();
    
    document.getElementById('open-add-modal')?.addEventListener('click', openAddModal);
    document.getElementById('close-modal')?.addEventListener('click', closeModal);
    document.getElementById('puppy-form')?.addEventListener('submit', handleFormSubmit);
    
    const modal = document.getElementById('puppy-modal');
    modal?.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
});
