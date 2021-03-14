let router = (function () {

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


    return function () {
        window.scroll(0, 0);
        let currentPage = window.location.hash.slice(1);
        const securedPages = ['becomeAHost'];

        if (!userModel.isLoggedIn() && securedPages.includes(currentPage)) {
            // return showElementsFlex(login);
            return showElementsStyle('flex', login);
        }

        switch (currentPage) {
            case 'homePage': {
                // hideElements(allLocations, searchBarAllLocations, searchSpecificsExpanded, hostYourHome, targetStayContainer);
                // showElements(...sectionsInMain);
                // showElementsFlex(searchDefaultText);
                showElementsStyle('none', allLocations, searchBarAllLocations, searchSpecificsExpanded, hostYourHome, targetStayContainer);
                showElementsStyle('block', ...sectionsInMain);
                showElementsStyle('flex', searchDefaultText);
            }
                break;
            case 'allLocations': {
                // hideElements(...sectionsInMain, searchDefaultText, searchSpecificsExpanded, hostYourHome, targetStayContainer);
                // showElements(allLocations);
                // showElementsFlex(searchBarAllLocations);
                showElementsStyle('none', ...sectionsInMain, searchDefaultText, searchSpecificsExpanded, hostYourHome, targetStayContainer);
                showElementsStyle('block', allLocations);
                showElementsStyle('flex', searchBarAllLocations);
            }
                break;
            case 'targetLocation': {
                // hideElements(...sectionsInMain, allLocations, searchBarAllLocations, hostYourHome, searchSpecificsExpanded, searchDefaultText);
                // showElementsFlex(targetStayContainer, searchDefaultText);
                showElementsStyle('none', ...sectionsInMain, allLocations, searchBarAllLocations, hostYourHome, searchSpecificsExpanded, searchDefaultText);
                showElementsStyle('flex', targetStayContainer, searchDefaultText);
            }
                break;
            case 'becomeAHost': {
                // hideElements(...sectionsInMain, allLocations, searchSpecificsExpanded, searchBarAllLocations, targetStayContainer);
                // showElements(hostYourHome);
                // showElementsFlex(searchDefaultText);
                showElementsStyle('none', ...sectionsInMain, allLocations, searchSpecificsExpanded, searchBarAllLocations, targetStayContainer);
                showElementsStyle('block', hostYourHome);
                showElementsStyle('flex', searchDefaultText);
            }
                break;
            case 'login': {
                // showElementsFlex(login);
                showElementsStyle('flex', login);
            }
                break;
            case 'errorPage': {

            }
                break;
            default: {
                // hideElements(allLocations, searchBarAllLocations, searchSpecificsExpanded, hostYourHome, targetStayContainer);
                // showElements(...sectionsInMain, searchDefaultText);
                // showElementsFlex(searchDefaultText);
                showElementsStyle('none', allLocations, searchBarAllLocations, searchSpecificsExpanded, hostYourHome, targetStayContainer);
                showElementsStyle('block', ...sectionsInMain, searchDefaultText);
                showElementsStyle('flex', searchDefaultText);

            }
                break;
        }
    }
}());
