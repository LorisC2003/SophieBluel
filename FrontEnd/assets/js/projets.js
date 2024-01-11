let categoryCount = 0;

document.addEventListener("DOMContentLoaded", function() {
    fetch('http://localhost:5678/api/works')
        .then(response => response.json())
        .then(data => {
            const worksListContainer = document.getElementById('gallery');
            data.forEach(work => {
                const workElement = document.createElement('figure');
                workElement.setAttribute('data-category', work.categoryId)
                workElement.innerHTML = `
							<img src="${work.imageUrl}" alt="${work.title}">
							<figcaption>${work.title}</figcaption>
                        `;
                worksListContainer.appendChild(workElement);
            });


        })
        .catch(error => console.error('Error fetching data:', error));


    fetch('http://localhost:5678/api/categories')
        .then(response => response.json())
        .then(data => {

            data.forEach(category => {
                const filters = document.getElementById('filters');
                const filterButton = document.createElement('input');
                filterButton.setAttribute('type', 'button')
                filterButton.setAttribute('class','filters-btn')
                filterButton.setAttribute('id', 'displayOnly' + category.id)
                filterButton.setAttribute('value', category.name)
                filters.appendChild(filterButton);
                categoryCount++;
                filterButton.addEventListener('click', function(event) {
                    hideCategories();
                    displayCategory(category.id);
                    //const btn = event.target;

                });
            });




        })
        .catch(error => console.error('Error fetching data:', error));


});

function hideCategories() {
    for (let i = 1; i <= categoryCount; i++) {
        hideCategory(i);
    }
}

const Tout = document.querySelector('#displayAll');
Tout.addEventListener('click', function(event) {
    for (let i = 1; i <= categoryCount; i++) {
        displayCategory(i);
    }
   // const btn = event.target;

});


function hideCategory(category) {
    const figuresToHide = document.querySelectorAll('figure[data-category="' + category +'"]');
    figuresToHide.forEach(function (figure) {
        figure.style.display = 'none';
    });
}

function displayCategory(category) {
    const figuresToDisplay = document.querySelectorAll('figure[data-category="' + category +'"]');
    figuresToDisplay.forEach(function (figure) {
        figure.style.display = 'block';
    });
}

