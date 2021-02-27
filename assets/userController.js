(function () {

    let loginBtnIcon = document.querySelector('.login-container');
    let signup = getById('signup');
    let signupCountry = getById('country-select');
    let signupFirstName = getById('firstName');
    let signupLastName = getById('lastName');
    let signupBirthDate = getById('date-of-birth');
    let signupEmail = getById('email');
    let signupPassword = getById('signup-password');
    let signupBtn = getById('signupBtn');
    let signupCloseBtn = signup.querySelector('.signup-closeBtn');

    let login = getById('login');
    let loginEmail = getById('login-email');
    let loginPassword = getById('login-password');
    let loginBtn = getById('loginBtn');
    let loginCloseBtn = login.querySelector('.login-closeBtn');
    let defaultProfileImg = document.querySelector('.default-profile-img');
    let headerProfileMenu1 = getById('header-profile-menu1');
    let menuLoginBtn = getById('menuLoginBtn');
    let menuSignupBtn = getById('menuSignupBtn');
    let menuHYHBtn = getById('menuHYHBtn');
    let headerProfileMenu2 = getById('header-profile-menu2');
    let menuHYHBtn2 = getById('menuHYHBtn2');
    let menuSignoutBtn = getById('menuSignoutBtn');


    function appendError(errEl, errMessage) {
        let message = errEl.querySelector('span');
        message.innerText = '';
        message.innerText = errMessage;
        showElementsFlex(errEl);
    }

    if (userModel.isLoggedIn()) {
        defaultProfileImg.src = userModel.currentLoggedUser.profilePicture;
    } else {
        defaultProfileImg.src = 'assets/images/default-profile-img.png';
    }

    // to hide signup/login div if clicked outside
    window.addEventListener('click', (e) => {

        if (e.target == loginBtnIcon || e.target.parentNode == loginBtnIcon) {
            if (userModel.isLoggedIn()) {
                toggleDisplay(headerProfileMenu2, 'block');
            } else {
                console.log(getComputedStyle(headerProfileMenu1).display);
                toggleDisplay(headerProfileMenu1, "block");
            }
        }
        if (e.target != loginBtnIcon && e.target.parentNode != loginBtnIcon) {
            hideElements(headerProfileMenu1, headerProfileMenu2);
        }
    });

    window.addEventListener('mousedown', (e) => {

        if (e.target === signup || e.target === signupCloseBtn) {
            hideElements(signup);
        }
        if (e.target === login || e.target === loginCloseBtn) {
            hideElements(login);
        }
    })

    menuSignoutBtn.addEventListener('click', () => {
        userModel.logoutUser();
        hideElements(headerProfileMenu2);
        defaultProfileImg.src = 'assets/images/default-profile-img.png';
    })

    menuLoginBtn.addEventListener('click', () => {
        showElementsFlex(login);
        hideElements(headerProfileMenu1);
    });

    menuSignupBtn.addEventListener('click', () => {
        showElementsFlex(signup);
        hideElements(headerProfileMenu1);
    });

    loginBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let error = getById('login-error-message');
        let email = loginEmail.value.trim();
        let password = loginPassword.value.trim();
        if (userModel.validateEmail(email)) {
            console.log('Valid email');
            if (userModel.loginUser(email, password)) {
                hideElements(login);
                defaultProfileImg.src = userModel.currentLoggedUser.profilePicture;
            }
        }
        else {
            console.log('invalid email');
            appendError(error, 'Invalid email!');
        }
    });

    signupBtn.addEventListener('click', () => {
        let error = getById('signup-error-message');
        let country = signupCountry.value;
        let firstName = signupFirstName.value;
        let birthDate = signupBirthDate.value || Date.now();
        let lastName = signupLastName.value;
        let email = signupEmail.value;
        let password = signupPassword.value;

        let allFormFields = new Map();
        allFormFields.set('firstName', userModel.validateName(firstName));
        allFormFields.set('lastName', userModel.validateName(lastName));
        allFormFields.set('email', userModel.validateEmail(email));
        allFormFields.set('birthDate', userModel.validateBirthDate(birthDate));

        console.log(allFormFields);
        for (let x in allFormFields) {
            if (allFormFields[x] === false) {
                appendError(error, `${x} is invalid!`);
            }
        }


    })

})();