let searchBar = document.querySelector('.search-wrapper .search-container');
let startYourSearch = document.querySelector('.start-your-search');
let searchSpecificLocation = document.querySelector('.search-specific-location');
let mainSection = document.querySelector('main');
let footerSection = getById('footer');
let searchLoop = document.querySelector('.search-specifics-expanded .search-loop-wrapper');
let isExpanded = false;
let chosenLocation = localStorage.getItem('chosenLocation') || '';

printSearchBar(chosenLocation);

window.addEventListener('click', (ev) => {
    if ((ev.target.closest('main') === mainSection || ev.target.closest('#footer') === footerSection) && isExpanded === true) {
        isExpanded = printSearchBar(chosenLocation, 'normalize');
    }
    if ((ev.target.closest('.start-your-search') || ev.target.closest('.search-specific-location')) && isExpanded === false) {
        isExpanded = printSearchBar(chosenLocation, 'expand');
    }
    if (ev.target.closest('.search-specifics-expanded .search-loop-wrapper') === searchLoop) {
        let searchInputValues = getReservationData();
        if (!searchInputValues.includes('')) {
            localStorage.setItem('searchFieldsValues', `${searchInputValues}`);
        }
    }
});