// Works home page //

function getWorksFromApi() {
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => {
            const worksListContainer = document.getElementById('gallery');
            data.forEach(work => {
                const workElement = document.createElement('figure');
                workElement.setAttribute('class', 'gallery-figure-hide');
                workElement.setAttribute('data-category', work.categoryId);
                workElement.setAttribute('data-work', work.id);
                workElement.innerHTML = `
							<img src="${work.imageUrl}" alt="${work.title}">
							<figcaption>${work.title}</figcaption>
                        `;
                worksListContainer.appendChild(workElement);
            });


        })
        .catch(error => console.error('Error fetching data:', error));
}

// Category home page //

let categoryCount = 0;

function CreateCategoryButton(category) {
    const filters = document.getElementById('filters');
    const filterButton = document.createElement('input');
    filterButton.setAttribute('type', 'button');
    filterButton.setAttribute('class', 'filters-btn');
    filterButton.setAttribute('id', 'displayOnly' + category.id);
    filterButton.setAttribute('value', category.name);
    filters.appendChild(filterButton);
    categoryCount++;

    filterButton.addEventListener('click', function () {
        const allButtons = document.querySelectorAll('.filters-btn');
        allButtons.forEach(button => button.classList.remove('active'));

        filterButton.classList.add('active');

        hideCategories();
        displayCategory(category.id);
    });
}

const Tout = document.querySelector('#displayAll');
Tout.addEventListener('click', function () {
    const allButtons = document.querySelectorAll('.filters-btn');
    allButtons.forEach(button => button.classList.remove('active'));

    Tout.classList.add('active');

    for (let i = 1; i <= categoryCount; i++) {
        displayCategory(i);
    }
});

function displayCategory(category) {
    const figuresToDisplay = document.querySelectorAll('figure[data-category="' + category + '"]');
    figuresToDisplay.forEach(function (figure) {
        figure.style.display = 'block';
    });
}

function hideCategory(category) {
    const figuresToHide = document.querySelectorAll('figure[data-category="' + category + '"]');
    figuresToHide.forEach(function (figure) {
        figure.style.display = 'none';
    });
}

function hideCategories() {
    for (let i = 1; i <= categoryCount; i++) {
        hideCategory(i);
    }
}

function CreateCategoryAddPhotoSelect(category) {
    const categorySelect = document.getElementById('chose-category');
    const option = document.createElement('option');
    option.setAttribute('value', category.id);
    option.textContent = category.name;
    categorySelect.appendChild(option);
}

// Edit mode //

document.addEventListener("DOMContentLoaded", function() {
   getWorksFromApi();
    if(localStorage.getItem('token')) {
        editMode.style.display = 'block';
        editModeBtn.style.display = 'flex';
    }

    fetch('http://localhost:5678/api/categories')
        .then(response => response.json())
        .then(data => {
            data.forEach(category => {
                CreateCategoryButton(category);
                CreateCategoryAddPhotoSelect(category);
            });
        })
        .catch(error => console.error('Error fetching data:', error));


});



