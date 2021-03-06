(function () {

    const errIcon = `<svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" style="display: inline-block; fill: none; height: 16px; width: 16px; stroke: currentcolor; stroke-width: 2px; overflow: visible;" aria-label="Error indicator" role="img" focusable="false"><circle cx="16" cy="16" r="14" fill="none"></circle><path d="m16 8v10" fill="none"></path><circle cx="16" cy="22.5" fill="#000" r=".5"></circle></svg>`;

    

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

    function clearValues(...elements) {
        elements.forEach(el => el.value = '');
    }

    function appendError(errEl, errMessage) {
        let messageSpan = errEl.querySelector('span');
        messageSpan.innerHTML = '';
        messageSpan.innerHTML = errMessage;
        if (errMessage) showElementsFlex(errEl);
        else hideElements(errEl);
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
            appendError(error, '');
            if (userModel.loginUser(email, password)) {
                hideElements(login);
                defaultProfileImg.src = userModel.currentLoggedUser.profilePicture;
                clearValues(loginEmail, loginPassword);
            } else {
                appendError(error, 'Email ot password is incorrect!')
            }
        }
        else {
            appendError(error, 'Invalid email!');
        }
    });

    signupBtn.addEventListener('click', (e) => {
        e.preventDefault();
        let error = getById('signup-error-message');
        let country = signupCountry.value;
        let firstName = signupFirstName.value;
        let birthDate = signupBirthDate.value || Date.now();
        let lastName = signupLastName.value;
        let email = signupEmail.value;
        let password = signupPassword.value;

        let allFormFields = {
            'firstName': userModel.validateName(firstName),
            'lastName': userModel.validateName(lastName),
            'email': userModel.validateEmail(email),
            'birthDate': userModel.validateBirthDate(birthDate),
            'password' : userModel.validatePassword(password),
        }

        if (!(Object.values(allFormFields).every(el => !!el))) {
            let message = '';
            for (let x in allFormFields) {
                if (allFormFields[x] === false) {
                    if (x === 'birthDate') {
                        message += `${errIcon} You have to be over 18 years old!<br>`;
                    } else if (x === 'password') {
                        message += `${errIcon} password must be at least 3 characters!`
                    } else {
                        message += `${errIcon} ${x} is invalid! <br>`;
                    }
                }
            }
            appendError(error, message);
        } else {
            let user = userModel.registerUser(firstName, lastName, email, password, country);
            if (user) {
                hideElements(signup);
                userModel.loginUser(email, password);
            } else appendError(error, 'user with that email already exists!')
        }


    })

})();