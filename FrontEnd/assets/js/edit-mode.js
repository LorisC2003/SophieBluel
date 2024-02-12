let modal = null


const openEditMode = function (e) {
    e.preventDefault();
    const target = document.querySelector(e.target.getAttribute('href'));
    target.style.display = 'flex';
    target.removeAttribute('aria-hidden');
    target.setAttribute('aria-modal', 'true');
    modal = target;
    modal.addEventListener('click', closeModal)
    let closeModals = document.querySelectorAll('.close-modal');
    closeModals.forEach(closeModalItem => {closeModalItem.addEventListener('click', closeModal)});
    modal.querySelector('#edit-project-content').addEventListener('click', stopPropagation)
}

const closeModal = function (e) {
    if (modal === null) return
    e.preventDefault();
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    modal.removeAttribute('aria-modal');
    modal.removeEventListener('click', closeModal);
    modal.querySelector('.close-modal').removeEventListener('click', closeModal)
    modal.querySelector('#edit-project-content').removeEventListener('click', stopPropagation)
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
});

function addEditGallery() {
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => {
            data.forEach(work => {
                addFigureItemToImageList(work);
            });
        })
        .catch(error => console.error('Error fetching data:', error))
}


document.addEventListener("DOMContentLoaded", function() {
    addEditGallery();
});

const worksListContainer = document.getElementById('edit-gallery');

function sendDeleteRequest(id) {
    fetch('http://localhost:5678/api/works/' + id, {
        method: 'DELETE',
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then(response => {
            if (response.ok) {
                removeWorkFromDocument(id);
            } else if (response.status === 401) {
                alert('Vous n\'avez pas accès à cette page');
            } else if (response.status === 500) {
                alert('Vous n\'avez pas accès à cette page');
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

function removeWorkFromDocument(id) {
    let workElements = document.querySelectorAll(`figure[data-work="${id}"]`);
    workElements.forEach( workElement => workElement.remove());
}

function addFigureItemToImageList(work) {
    const workElement = document.createElement('figure');
    workElement.setAttribute('class', 'edit-gallery-item gallery-figure-hide');
    workElement.setAttribute('data-category', work.categoryId)
    workElement.setAttribute('data-work', work.id)
    workElement.innerHTML = `
                            <div class="edit-gallery-picture">
							    <img src="${work.imageUrl}" alt="${work.title}">
							    <btn class="delete-project-btn" id="delete-project-btn-${work.id}" data-id="${work.id}"><i class="fa-solid fa-trash-can fa-lg"></i></btn>
							</div>
                        `;
    worksListContainer.appendChild(workElement);
    const deleteProject = document.getElementById(`delete-project-btn-${work.id}`);
    deleteProject.addEventListener('click', function (event) {
        event.preventDefault();
        sendDeleteRequest(work.id);
    });
}


const addPictureBtn = document.querySelector('#modal-btn');
const editProject = document.querySelector('.edit-project-gallery');
const addPictureForm = document.querySelector('#add-picture-form');
const BackToEdit = document.querySelector('.back-to-edit');

addPictureBtn.addEventListener('click', function(event) {
    editProject.style.display = 'none';
    addPictureForm.style.display = 'flex';
});

BackToEdit.addEventListener('click', function(event) {
    editProject.style.display = 'block';
    addPictureForm.style.display = 'none';
})