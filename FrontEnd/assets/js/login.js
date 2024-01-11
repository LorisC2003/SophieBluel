const loginFormEmail = document.querySelector('#login-email');
const loginFormPassword = document.querySelector('#login-password');
const loginFormSubmitButton = document.querySelector('#login-form-submit-button');
const loginFormMessage = document.querySelector('#loginFormMessage');
let userToken = null;

loginFormSubmitButton.addEventListener('click', function(event) {
    event.preventDefault();
    const email = loginFormEmail.value;
    const password = loginFormPassword.value;
    if(email ===  '' || password === ''){
        loginFormMessage.style.display = 'block';
        loginFormMessage.innerHTML = 'Veuillez remplir tous les champs';
        return;
    }
    loginFormMessage.style.display = 'none';
    fetch('http://localhost:5678/api/users/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'email': email,
                'password': password
            })
        })
        .then(response => {
            if (response.ok) {
                toggleLoginContent('content');
                return response.json();

            } else if (response.status === 401) {
                loginFormMessage.style.display = 'block';
                loginFormMessage.innerHTML = 'Vous n\'avez pas accès à cette page';
            } else if (response.status === 404) {
                loginFormMessage.style.display = 'block';
                loginFormMessage.innerHTML = 'Vous n\'avez pas pu être identifié';
            }
        })
        .then(function(data) {
           userToken = data.token;
        })
        .catch(error => console.error('Error fetching data:', error));

})

const loginForm = document.querySelector('#login');
const editMode = document.querySelector('#edit-mode');
document.addEventListener("DOMContentLoaded", function() {
    loginForm.style.display = 'none';
    editMode.style.display = 'none';
});

const mainContent = document.querySelector('#main');
const loginButton = document.querySelector('#login-button');
loginButton.addEventListener('click', () => toggleLoginContent('login'));

function toggleLoginContent(toDisplay) {
    if (toDisplay === 'login') {
        mainContent.style.display = 'none';
        loginForm.style.display = 'block';

        return;
    }
    mainContent.style.display = 'block';
    editMode.style.display = 'block';
    loginForm.style.display = 'none';
}