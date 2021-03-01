// (function () {
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);



let header = getById('mainHeader');
let main = document.querySelector('main');
let footer = getById('footer');
let sectionsInMain = document.querySelectorAll('main section');
let search = getById('littleSearchLabel');
let searchBarAllLocations = document.querySelector('#littleSearchLabel .search-specific-location');
let searchSpecificsExpanded = document.querySelector('#littleSearchLabel .search-specifics-expanded');
let searchDefaultText = document.querySelector('#littleSearchLabel .start-your-search');
let searchWrapper = document.querySelector('.search-wrapper');
let loginBtn = document.querySelector('.login-container');
let signup = getById('signup');

let allLocations = getById('allLocations');

let logo = document.querySelector('.logo svg');

logo.addEventListener('click', () => window.location.hash = 'homePage');

let hostYourHome = getById('host-your-home');

function router() {
    let currentPage = window.location.hash.slice(1);

    switch (currentPage) {
        case 'homePage': {
            hideElements(allLocations, searchBarAllLocations, searchSpecificsExpanded);
            showElements(...sectionsInMain, searchDefaultText);
        }
            break;
        case 'allLocations': {
            hideElements(...sectionsInMain, searchDefaultText, searchSpecificsExpanded);
            showElements(allLocations);
            showElementsFlex(searchBarAllLocations);
        }
            break;
        case 'targetLocation': {

        }
            break;
        case 'becomeAHost': {
            hideElements(...sectionsInMain,
                allLocations, searchWrapper, searchDefaultText, searchSpecificsExpanded, searchBarAllLocations);
            showElements(hostYourHome);
        }
            break;
        case 'login': {
            showElementsFlex(login);
        }
            break;
        case 'errorPage': {

        }
            break;
        default: {
            hideElements(allLocations, searchBarAllLocations, searchSpecificsExpanded);
            showElements(...sectionsInMain, searchDefaultText);
        }
            break;
    }
}
// })();