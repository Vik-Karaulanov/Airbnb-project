(function(){

    let loginBtnIcon = document.querySelector('.login-container');
    let signup = getById('signup');
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
        //If there is no user logged in
        //Show login modal
        if (userModel.isLoggedIn()) {
            
        } else {
            showElementsFlex(login);
            
        }
        //If there is a user already logged in
        //Show user menu
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
})();