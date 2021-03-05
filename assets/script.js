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
let targetStayContainer = getById('targetStayContainer');

let allLocations = getById('allLocations');

let logo = document.querySelector('.logo svg');

logo.addEventListener('click', () => window.location.hash = 'homePage');

let hostYourHome = getById('host-your-home');

function router() {
    let currentPage = window.location.hash.slice(1);

    switch (currentPage) {
        case 'homePage': {
            hideElements(allLocations, searchBarAllLocations, searchSpecificsExpanded, hostYourHome, targetStayContainer);
            showElements(...sectionsInMain);
            showElementsFlex(searchDefaultText);
        }
        break;
    case 'allLocations': {
        hideElements(...sectionsInMain, searchDefaultText, searchSpecificsExpanded, hostYourHome, targetStayContainer);
        showElements(allLocations);
        showElementsFlex(searchBarAllLocations);
    }
    break;
    case 'targetLocation': {
        hideElements(...sectionsInMain, allLocations, searchBarAllLocations, hostYourHome, searchSpecificsExpanded, searchDefaultText);
        showElementsFlex(targetStayContainer, searchDefaultText);
    }
    break;
    case 'becomeAHost': {
        hideElements(...sectionsInMain,
            allLocations, searchSpecificsExpanded, searchBarAllLocations, targetStayContainer);
        showElements(hostYourHome);
        showElementsFlex(searchDefaultText);
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
        hideElements(allLocations, searchBarAllLocations, searchSpecificsExpanded, hostYourHome, targetStayContainer);
        showElements(...sectionsInMain, searchDefaultText);
        showElementsFlex(searchDefaultText);
    }
    break;
    }
}
// })();