let fileInput = document.getElementById('picture-file-input');


fileInput.addEventListener('change', function(event) {
    const fileInput = event.target;

    const file = fileInput.files[0];

    displayFilePreview(file);
})

const hideByPictures = document.querySelectorAll('.hide-add-picture');

function displayFilePreview(file) {
    const filePreviewElement = document.getElementById('filePreview');
    filePreviewElement.innerHTML = '';

    if (file.type.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = URL.createObjectURL(file);
        img.style.maxHeight = '150px';
        img.style.maxWidth = 'auto';
        filePreviewElement.appendChild(img);
        hideByPictures.forEach(element => {
            element.style.display = 'none';
        });
    } else {
        const message = document.createElement('p');
        message.textContent = 'Type de fichier non compatible .';
        filePreviewElement.appendChild(message);
    }
}

const addNewProject = document.getElementById('validate-add-picture');
const imageInput = document.getElementById('picture-file-input');
const titleInput = document.getElementById('picture-text-input');
const categoryInput = document.getElementById('chose-category');


imageInput.addEventListener('focusout',  function() {
    checkIfAllFieldsAreFilled();
});

titleInput.addEventListener('focusout', function() {
    checkIfAllFieldsAreFilled();
});

categoryInput.addEventListener('change', function() {
    checkIfAllFieldsAreFilled();
});



function checkIfAllFieldsAreFilled() {
    if (imageInput.value && titleInput.value && categoryInput.value !== 'chose') {
        addNewProject.style.backgroundColor = '#1D6154';
        addNewProject.addEventListener('click', sendPicture);
    } else {
        addNewProject.style.backgroundColor = '#A7A7A7';
        addNewProject.removeEventListener('click', sendPicture);
    }
}

function sendPicture(event) {
    event.preventDefault();

    const formData = new FormData();
    formData.append('image', imageInput.files[0]);
    formData.append('title', titleInput.value);
    formData.append('category', categoryInput.value);

    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        body: formData,
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    })
        .then(response => response.json())
        .then(data => {
            refreshGallery();

        })
        .catch((error) => {
            console.error('Error:', error);

        });

}

function refreshGallery() {
    const figures = document.querySelectorAll('.gallery-figure-hide');
    figures.forEach(figure => {
        figure.remove();
    });
    getWorksFromApi();
    addEditGallery();
    editProject.style.display = 'block';
    addPictureForm.style.display = 'none';
}

