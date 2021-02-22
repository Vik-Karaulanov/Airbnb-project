const userModel = (function () {

    class User {
        constructor(firstName, lastName, email, password, country) {
            this.firstName = firstName;
            this.lastName = lastName;
            this.email = email;
            this.password = password;
            this.country = country;
            this.profilePicture = 'assets/images/default-profile-img.png';
            this.reviews = [];
            this.stays = [];
        }
    }

    let users = [
        new User('Pesho', 'Peshov', 'pesho@abv.bg', '123', 'Bulgaria'),
        new User('asd', 'asd', 'asd@asd.asd', 'asd', 'asd'),
    ];

    let localStorageUsers = JSON.parse(window.localStorage.getItem('users')) || users;
    let currentUser = JSON.parse(window.localStorage.getItem('currentUser'));
    window.localStorage.setItem('users', JSON.stringify(users));

    function updateLocalStorage(users) {
        window.localStorage.setItem('users', JSON.stringify(users));
    }

    return {
        localStorageUsers,
        validateName: function (name) {
            let letters = /^[A-Za-z]{4,}$/;
            return (name.match(letters)) ? true : false;
        },
        validateEmail: function (email) {
            let mailCheck = /^[^@\s]+@[^@\s\.]+\.[^@\.\s]+$/;
            return (email.match(mailCheck)) ? true : false;

        },
        validatePassword: function (password) {
            return (password >= 4) ? true : false;
        },
        registerUser: function (firstName, lastName, email, password, country) {
            let user = new User(firstName, lastName, email, password, country);
            users.push(user);
            updateLocalStorage(user);
        },
        isLoggedIn: function () {
            currentUser ? true : false;
        },
        loginUser: function (email, password) {
            let user = users.find(user => {
                user.email === email && user.password === password
            });

            if (user) {
                window.localStorage.setItem('currentUser', user);
            }
            return user; 
        },
    }
})();