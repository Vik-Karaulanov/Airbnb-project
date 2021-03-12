const userModel = (function () {

    class User {
        constructor(firstName, lastName, email, password, country, profilePicture) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.fullName = `${firstName} ${lastName}`;
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
        new User('Asd', 'Asd', 'asd@asd.asd', 'Asd', 'Asd', 'assets/images/userProfilePicTest.webp'),
    ];

    let localStorageUsers = JSON.parse(window.localStorage.getItem('users')) || users;
    window.localStorage.setItem('users', JSON.stringify(localStorageUsers));

    function updateLocalStorage(users) {
        window.localStorage.setItem('users', JSON.stringify(users));
    };

    return {
        localStorageUsers,
        get currentLoggedUser() {
            return JSON.parse(window.localStorage.getItem('currentUser')) ?? 'Guest';
        },
        validateName(name) {
            let letters = /^[A-Z]{1}[a-z]{2,}$/;
            return (name.match(letters)) ? true : false;
        },
        validateEmail(email) {
            let mailCheck = /^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/;
            return (email.match(mailCheck)) ? true : false;
            // && !users.find(user => user.email === email)
        },
        validatePassword(password) {
            return (password.length >= 3) ? true : false;
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
            if (!localStorageUsers.find(user => user.email === email)) {
                let newUser = new User(firstName, lastName, email, password, country);
                localStorageUsers.push(newUser);
                updateLocalStorage(localStorageUsers);
                return newUser;
            } else return false;
        },
        isLoggedIn() {
            let currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
            return currentUser ? true : false;
        },
        loginUser(email, password) {
            let user = localStorageUsers.find(user => {
                return user.email === email && user.password === password
            });

            if (user) {
                window.localStorage.setItem('currentUser', JSON.stringify(user));
                // render the page again
                router();
            } else {
                return false;
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
        addStayToCurrentUser(user, stay){
            let users = localStorageUsers.map(el => {
                if (el.email === user.email) {
                    el.stays.push(stay.title);
                }
                return el;
            });
            updateLocalStorage(users);
        }
    }
})();