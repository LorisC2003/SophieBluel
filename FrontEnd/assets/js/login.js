// Const for login system //

const loginFormEmail = document.querySelector('#login-email');
const loginFormPassword = document.querySelector('#login-password');
const loginFormSubmitButton = document.querySelector('#login-form-submit-button');
const loginFormMessage = document.querySelector('#loginFormMessage');
const editMode = document.querySelector('#edit-mode');
const editModeBtn = document.querySelector('#edit-mode-btn');
const loginButton = document.querySelector('#login-button');

// Login system //

if(loginFormSubmitButton) {
    loginFormSubmitButton.addEventListener('click', function (event) {
        event.preventDefault();
        const email = loginFormEmail.value;
        const password = loginFormPassword.value;
        if (email === '' || password === '') {
            loginFormMessage.style.display = 'block';
            loginFormMessage.innerHTML = 'Veuillez remplir tous les champs';
            loginFormEmail.style.borderColor = 'red';
            loginFormPassword.style.borderColor = 'red';
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
                    // editMode.style.display = 'block';
                    return response.json();
                } else if (response.status === 401) {
                    loginFormMessage.style.display = 'block';
                    loginFormMessage.innerHTML = 'Vous n\'avez pas accès à cette page';
                } else if (response.status === 404) {
                    loginFormMessage.style.display = 'block';
                    loginFormMessage.innerHTML = 'Vous n\'avez pas pu être identifié';
                }
            })
            .then(function (data) {
                localStorage.setItem('token', data.token);
                window.location.href = 'index.html';
            })
            .catch(error => console.error('Error fetching data:', error));

    })
}

