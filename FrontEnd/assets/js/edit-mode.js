let modal = null

const openEditMode = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    console.log(target);
    target.style.display = 'flex';
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target;
    modal.addEventListener('click', closeModal)
    modal.querySelector('.close-modal').addEventListener('click', closeModal)
    modal.querySelector('.edit-project-content').addEventListener('click', stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault();
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.close-modal').removeEventListener('click', closeModal)
    modal.querySelector('.edit-project-content').removeEventListener('click', stopPropagation)
    modal = null
}

const stopPropagation = function (e) {
    e.stopPropagation()
}

document.querySelectorAll('.open-modal').forEach(a => {
    a.addEventListener('click', openEditMode);
})

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModal(e)
    }
})

document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => {
            const worksListContainer = document.getElementById('edit-gallery');
            data.forEach(work => {
                const workElement = document.createElement('figure');
                workElement.setAttribute('class', 'edit-gallery-item');
                workElement.setAttribute('data-category', work.categoryId)
                workElement.innerHTML = `
							<img src="${work.imageUrl}" alt="${work.title}">
                        `;
                worksListContainer.appendChild(workElement);
            });


        })
        .catch(error => console.error('Error fetching data:', error));})

