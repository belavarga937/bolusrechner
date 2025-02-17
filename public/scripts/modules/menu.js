
const icon = document.getElementById('hamburger-menu');
 const registerButton = document.getElementById('register-button');
    const menu = document.getElementById("navbar");
    const navigation = document.querySelector('.navigation-bar__grid');
    const header = document.querySelector('header');
    const logo = document.querySelector('.navigation-bar__logo img');
    const logoOpen = "/assets/images/logo_menu--closed.svg";
    const logoClosed = "/assets/images/WBB.svg";
    const main = document.querySelector('main');

icon.addEventListener('click', () => {

    navigation.classList.toggle('header--is-close');
    registerButton.classList.toggle('navigation-bar__login-button--is-open');
    registerButton.classList.toggle('navigation-bar__login-button--is-close');
    menu.classList.toggle('navigation-bar__menu--is-open');
    menu.classList.toggle('navigation-bar__menu--is-close');
    logo.src = logo.src.includes(logoClosed) ? logoOpen : logoClosed;
    document.documentElement.classList.toggle('nav--no-scroll');
    document.body.classList.toggle('nav--no-scroll');
    //header.classList.toggle('nav-no--scroll');
    main.style.display = main.style.display.includes("none") ? "block" : "none";
});

//Authentification-Links
["register", "login"].forEach( auth => {
    const links = document.querySelectorAll(`.navigation-bar__menu__${auth}-button`);
    links.forEach( link => {
        link.addEventListener('click', () => {
            window.location.href = `/auth/${auth}`;
        });
    });
});
