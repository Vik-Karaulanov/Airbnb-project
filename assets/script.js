// (function () {
    window.addEventListener('hashchange', router);
    window.addEventListener('DOMContentLoaded', router);

    let staysManager = new StaysManager();

    stays.forEach(el => {
        // let xhr = new XMLHttpRequest();
        // xhr.open('GET', 'https://i.picsum.photos/id/47/200/200')
        // xhr.onloadend = function() {
        //     console.log(xhr);
        // };
        // xhr.send();
        el.image = 'assets/images/cosy-stay.jpeg';
        let stay = new Stay(el.title, el.location, el.images, el.description, el.host, el.rating, el.reviews, el.stayType, el.nonAvailableDates, el.guests, el.bedrooms, el.baths, el.beds, el.price, el.enhancedCleaning, el.cancellationPolicy, el.houseRules, el.amenities);
        staysManager.allStays.push(stay);
    });

    let header = getById('mainHeader');
    let main = document.querySelector('main');
    let footer = getById('footer');
    let sectionsInMain = document.querySelectorAll('main section');
    let search = getById('littleSearchLabel');
    
    let loginBtn = document.querySelector('.login-container');
    let signup = getById('signup');
    
    loginBtn.addEventListener('click', () => {
        window.location.hash = "login";
    });
    
    let allLocations = getById('allLocations');
    let miniLocations = document.querySelectorAll('#mini .container .mini-card');
    let logo = document.querySelector('.logo svg');

    miniLocations.forEach(el => {
        el.addEventListener('click', () => {
            let chosenLocation = el.querySelector('b').innerHTML;
            printAllLocationsPage(chosenLocation, staysManager.allStays);
        });
        el.addEventListener('click', () => window.location.hash = 'allLocations');
    });
    logo.addEventListener('click', () => window.location.hash = 'homePage');

    function router(){
        let currentPage = window.location.hash.slice(1);

        switch (currentPage) {
            case 'homePage': {
                hideElements(allLocations);
                showElements(...sectionsInMain);
            }
                break;
            case 'allLocations': {
                hideElements(...sectionsInMain);
                showElements(allLocations);
            }
                break;
            case 'targetLocation': {
                
            }
                break;
            case 'becomeAHost': {

            }
                break;
            case 'login': {
                showElementsFlex(signup);
            }
                break;
            case 'errorPage': {

            }
                break;
            default: {
                hideElements(allLocations);
                showElements(...sectionsInMain);
            }
                break;
        }
    }
// })();