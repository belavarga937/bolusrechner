
const registerForm = document.getElementById('register');
registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    document.getElementById('usernameError').textContent = '';
    document.getElementById('emailError').textContent = '';
    document.getElementById('passwordError').textContent = '';
    document.getElementById('confirm_passwordError').textContent = '';
    document.getElementById('terms-and-conditionsError').textContent = '';

    const notFoundError = document.querySelector('.error-user_not_found--close');

    let isValid = true;

    const terms = document.getElementById('terms-and-conditions');
    if (!terms.checked) {
        isValid = false;
        document.getElementById('terms-and-conditionsError').textContent = "Bitte stimme den Terms&Conditions zu!";
        document.getElementById('username').style.borderColor = "#AA0E2D";
        notFoundError.style.display = 'none';
    }
    else {
        document.getElementById('username').style.borderColor = "black";
    }

    const username = document.getElementById('username').value;
    if (username.length < 3) {
        isValid = false;
        document.getElementById('usernameError').textContent = "Der Benutzername muss mindestens 3 Zeichen haben!";
        document.getElementById('username').style.borderColor = "#AA0E2D";
        notFoundError.style.display = 'none';
    }
    else {
        document.getElementById('username').style.borderColor = "black";
    }

    const email = document.getElementById('email').value;
    if (!email.includes('@')) {
        isValid = false;
        document.getElementById('emailError').textContent = "Geb eine gültige E-mail Adresse an!";
        document.getElementById('email').style.borderColor = "#AA0E2D";
        notFoundError.style.display = 'none';
    }
    else {
        document.getElementById('email').style.borderColor = "black";
    }

    const password = document.getElementById('password').value;
    if (password.length < 8) {
        isValid = false;
        document.getElementById('passwordError').textContent = "Das Passwort muss mindestens 8 Zeichen lang sein";
        document.getElementById('password').style.borderColor = "#AA0E2D";
        notFoundError.style.display = 'none';
    }
    else {
        document.getElementById('password').style.borderColor = "black";
    }

    const confirmPassword = document.getElementById('confirm_password').value;
    if (confirmPassword !== password) {
        isValid = false;
        document.getElementById('confirm_passwordError').textContent = "Die Passwörter stimmen nicht überein";
        document.getElementById('confirm_password').style.borderColor = "#AA0E2D";
        notFoundError.style.display = 'none';
    }
    else {
        document.getElementById('confirm_password').style.borderColor = "black";
    }

    if (isValid) {
        const formData = {
            username: username,
            password: password,
            email: email,
            confirm_password: confirmPassword
        }

        try {
            const response = await fetch('/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const result = await response.json();

            if (response.ok) {
                console.log(result.message);
                window.location.href = '/auth/login'; 
            }
            else if (result.errors) {
                notFoundError.textContent = result.errors.map(err => err.msg).join("\n");
                notFoundError.style.display = "flex";
            }

            else if (result.error) {
                notFoundError.textContent = result.error;
                notFoundError.style.display = "flex";
            }
        }
        catch (error) {
            console.error('Fehler:', error);
            alert('Serverfehler. Bitte später erneut versuchen.');
        }
    }
})