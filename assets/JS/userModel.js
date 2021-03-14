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
        // new User('asd', 'asd', 'asd@asd.asd', 'asd', 'Bulgaria', 'assets/images/userProfilePicTest.webp'),
        new User('Petur', 'Iliev', 'Petur@asd.asd', 'Asd', 'Bulgaria', 'assets/images/profilePics/profilePic1.jpg'),
        new User('Gesho', 'Vazov', 'Gesho@asd.asd', 'Asd', 'Bulgaria', 'assets/images/profilePics/profilePic2.jpg'),
        new User('Iliyan', 'Vuchkov', 'Iliyan@asd.asd', 'Asd', 'Bulgaria', 'assets/images/profilePics/profilePic3.jpg'),
        new User('Genadi', 'Popov', 'Genadi@asd.asd', 'Asd', 'Bulgaria', 'assets/images/profilePics/profilePic4.jpg'),
        new User('John', 'Kirilov', 'John@asd.asd', 'Asd', 'Bulgaria', 'assets/images/profilePics/profilePic5.jpg'),
        new User('Stamat', 'Ignatov', 'Stamat@asd.asd', 'Asd', 'Bulgaria', 'assets/images/profilePics/profilePic6.jpg'),
        new User('Hasan', 'Uzunov', 'Hasan@asd.asd', 'Asd', 'Bulgaria', 'assets/images/profilePics/profilePic7.jpg'),
        new User('Geran', 'Malekov', 'Geran@asd.asd', 'Asd', 'Bulgaria', 'assets/images/profilePics/profilePic8.jpg'),
        new User('Georgi', 'Ivanov', 'Georgi@asd.asd', 'Asd', 'Bulgaria', 'assets/images/profilePics/profilePic9.jpg'),
        new User('Petyr', 'Zahariev', 'Petyr@asd.asd', 'Asd', 'Bulgaria', 'assets/images/profilePics/profilePic10.jpg'),
        new User('Zahari', 'Pavlov', 'Zahari@asd.asd', 'Asd', 'AsdBulgaria', 'assets/images/profilePics/profilePic11.jpg'),
        new User('Haralampi', 'Popov', 'Haralampi@asd.asd', 'Asd', 'Bulgaria', 'assets/images/profilePics/profilePic12.jpg'),
        new User('Danail', 'Alexandrov', 'Danail@asd.asd', 'Asd', 'Bulgaria', 'assets/images/profilePics/profilePic13.jpg'),
        new User('Pavlina', 'Zelenkova', 'Pavlina@asd.asd', 'Asd', 'Bulgaria', 'assets/images/profilePics/profilePic14.jpg'),
        new User('Draganka', 'Dinkova', 'Draganka@asd.asd', 'Asd', 'Bulgaria', 'assets/images/profilePics/profilePic15.jpg'),
        new User('Ivanka', 'Popova', 'Ivanka@asd.asd', 'Asd', 'Bulgaria', 'assets/images/profilePics/profilePic16.jpg'),
        new User('Dinka', 'Geshova', 'Ginka@asd.asd', 'Asd', 'Bulgaria', 'assets/images/profilePics/profilePic17.jpg'),
        new User('Minka', 'Harizanova', 'Minka@asd.asd', 'Asd', 'Bulgaria', 'assets/images/profilePics/profilePic18.jpg'),
        new User('Ginka', 'Strahilova', 'Ginka@asd.asd', 'Asd', 'Bulgaria', 'assets/images/profilePics/profilePic19.jpg'),
        new User('Detelina', 'Malinova', 'Detelina@asd.asd', 'Asd', 'Bulgaria', 'assets/images/profilePics/profilePic20.jpg'),
    ];

    stays.forEach(stay => {
        users.forEach(user => {
            if (stay['host'] === user.fullName) {
                user.stays.push(stay.id);
            }
        });
    });

    let localStorageUsers = JSON.parse(window.localStorage.getItem('users')) || users;
    window.localStorage.setItem('users', JSON.stringify(localStorageUsers));

    function updateLocalStorage(localStorageProp, users) {
        window.localStorage.setItem(localStorageProp, JSON.stringify(users));
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
                updateLocalStorage('users',localStorageUsers);
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
                    el.stays.push(stay.id);
                }
                return el;
            });
            user.stays.push(stay.id);
            updateLocalStorage('users', users);
            updateLocalStorage('currentUser', user);
        }
    }
})();