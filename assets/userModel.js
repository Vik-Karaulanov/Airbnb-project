const userModel = (function () {

    class User {
        constructor(firstName, lastName, email, password, country, profilePicture) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.password = password;
            this.country = country;
            this.profilePicture = profilePicture || 'assets/images/default-profile-img.png';
            this.reviews = [];
            this.stays = [];
        }
    }

    let users = [
        new User('Pesho', 'Peshov', 'pesho@abv.bg', '123', 'Bulgaria'),
        new User('asd', 'asd', 'asd@asd.asd', 'asd', 'asd', 'assets/images/userProfilePicTest.webp'),
    ];

    let localStorageUsers = JSON.parse(window.localStorage.getItem('users')) || users;
    window.localStorage.setItem('users', JSON.stringify(users));

    function updateLocalStorage(users) {
        window.localStorage.setItem('users', JSON.stringify(users));
    }

    return {
        localStorageUsers,
        get currentLoggedUser() {
            return JSON.parse(window.localStorage.getItem('currentUser'));
        },
        validateName(name) {
            let letters = /^[A-Z]{1}[a-z]{3,}$/;
            return (name.match(letters)) ? true : false;
        },
        validateEmail(email) {
            let mailCheck = /^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/;
            return (email.match(mailCheck)) ? true : false;

        },
        validatePassword(password) {
            return (password >= 4) ? true : false;
        },
        validateBirthDate(birthDate) {
            let birth = new Date(birthDate).getFullYear();
            let currentDate = new Date(Date.now()).getFullYear();
            if (currentDate - birth < 18) {
                return false;
            }
            return true;
        },
        registerUser(firstName, lastName, email, password, country) {
            if (!users.find(user => user.email === email)) {
                let newUser = new User(firstName, lastName, email, password, country);
                users.push(newUser);
                updateLocalStorage(users);
                return newUser;
            } else return false;
        },
        isLoggedIn() {
            let currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
            return currentUser ? true : false;
        },
        loginUser(email, password) {
            let user = users.find(user => {
                return user.email === email && user.password === password
            });

            if (user) {
                window.localStorage.setItem('currentUser', JSON.stringify(user));
                console.log(`lognah ${email} s parola ${password}`);
            } else {
                console.log(`dobavi logika za %cnesyshtestvuvash %cuser i/ili parola`,
                    'color:red; font-size:20px',
                    '');
            }
            return user;
        },
        logoutUser() {
            curUser = JSON.parse(window.localStorage.getItem('currentUser'));
            console.log(`log%cOUT%cnah ${curUser.email} s parola ${curUser.password}`,
                'color:red; font-size: 20px',
                '');
            window.localStorage.removeItem('currentUser');
        },
    }
})();