const loginForm = document.getElementById('login_form');
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    let isValid = true;
    
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const notFoundError = document.querySelector('.error-user_not_found--close');

    emailError.textContent = "";
    passwordError.textContent = "";

    const email = document.getElementById('email').value;
    if (!validateEmail(email)) {
        isValid = false;
        emailError.textContent = "Bitte gib eine gültige E-Mail Adresse an";
        document.getElementById('email').style.borderColor = "#AA0E2D";
        notFoundError.style.display = 'none';
    }
    else {
        document.getElementById('email').style.borderColor = "black";
    }

    const password = document.getElementById('password').value;
    if (password.trim() === "") {
        isValid = false;
        passwordError.textContent = "Bitte gib ein Passwort an";
        document.getElementById('password').style.borderColor = "#AA0E2D";
        notFoundError.style.display = 'none';
    }
    else {
        document.getElementById('password').style.borderColor = "black";
    }
    
    //Form absenden
    if (isValid) {
        const formData = {
            email: email,
            password: password
        }

        try {
            const response = await fetch('/auth/login', {
                method: "POST",
                headers: {'content-type':'application/json'},
                body: JSON.stringify(formData),
                credentials: 'include'
            })

            const result = await response.json();

            if (response.ok) {
                console.log(result.message);
                window.location.href = '/';
            }
            else {
                //alert(result.error); 
                notFoundError.style.display = 'flex';
                notFoundError.textContent = result.error;
            }

        }
        catch (err) {
            console.error('Fehler beim Login: ' + err);
            alert('Serverfehler. Bitte später erneut versuchen.');
           
        }
    }
});

     
    function validateEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
      }