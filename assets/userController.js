(function(){

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

    function appendError(errEl) {
        let message = errEl.querySelector('span');
        message.innerText = '';
        message.innerText = 'Already exist a user with that email!';
    }

    if (userModel.isLoggedIn()) {
        defaultProfileImg.src = userModel.currentLoggedUser.profilePicture;
    } else {
        defaultProfileImg.src = 'assets/images/default-profile-img.png';
    }

    window.addEventListener('click', (e) => {
        if (e.target === signup || e.target === signupCloseBtn) {
            hideElements(signup);
        }
        if (e.target === login || e.target === loginCloseBtn) {
            hideElements(login);
        }
    })
    
    loginBtnIcon.addEventListener('click', () => {
        if (userModel.isLoggedIn()) {
            console.log('ima lognat');
            showElementsFlex(headerProfileMenu2);
        } else {
            console.log('nqma lognat');
            showElementsFlex(headerProfileMenu1);
        }
    });

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
        let mail = loginEmail.value.trim();
        let password = loginPassword.value.trim();
        if (userModel.loginUser(mail, password)) {
            hideElements(login);
            defaultProfileImg.src = userModel.currentLoggedUser.profilePicture;
        }
    });

    signupBtn.addEventListener('click', () => {
        let newUser = userModel.registerUser(
            signupFirstName.value,
            signupLastName.value,
            signupEmail.value,
            signupPassword.value,
            signupCountry.value
            );
            console.log(newUser);
        if (newUser) {
            userModel.loginUser(newUser.email, newUser.password);
            defaultProfileImg.src = userModel.currentLoggedUser.profilePicture;
            hideElements(signup);
        } else {
            let error = getById('error-message');
            appendError(error);
            showElementsFlex(error);
        }
    })
})();