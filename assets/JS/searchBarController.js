let searchBar = document.querySelector('.search-wrapper .search-container');
let startYourSearch = document.querySelector('.start-your-search');
let searchSpecificLocation = document.querySelector('.search-specific-location');
let mainSection = document.querySelector('main');
let footerSection = getById('footer');
let searchLoop = document.querySelector('.search-specifics-expanded .search-loop-wrapper');
let isExpanded = false;
let chosenLocation = localStorage.getItem('chosenLocation') || '';
let logoField = document.querySelector('.logo')

let locationInput = document.querySelector('.searched-location-expanded .current-location');
let checkInInput = getById('checkInDate');
let checkOutInput = getById('checkOutDate');
let guestsinput = getById('guestsNumber');

let inputArr = [locationInput, checkInInput, checkOutInput, guestsinput];
console.log(inputArr);

printSearchBar(chosenLocation);

window.addEventListener('click', (ev) => {
    chosenLocation = localStorage.getItem('chosenLocation');
    // Пооправи този if
    if ((ev.target.closest('main') === mainSection || ev.target.closest('#footer') === footerSection || ev.target.closest('.logo') === logoField) && isExpanded === true) {
        isExpanded = printSearchBar(chosenLocation, 'normalize');
    }
    if ((ev.target.closest('.start-your-search') || ev.target.closest('.search-specific-location')) && isExpanded === false) {
        isExpanded = printSearchBar(chosenLocation, 'expand');
    }
    if (ev.target.closest('.search-specifics-expanded .search-loop-wrapper') === searchLoop) {
        localStorage.removeItem('searchFieldsValues');
        let searchInputValues = getReservationData();
        if (searchInputValues) {
            localStorage.setItem('searchFieldsValues', `${searchInputValues}`);
            localStorage.setItem('chosenLocation', searchInputValues[0]);
            chosenLocation = localStorage.getItem('chosenLocation');
            isExpanded = printSearchBar(chosenLocation, 'normalize');
            window.location.hash = '#allLocations';
        }
    }
});

window.addEventListener('hashchange', () => {
    if (isExpanded) isExpanded = printSearchBar(chosenLocation, 'normalize');
});


inputArr.forEach(el => {
    el.addEventListener('keyup', (ev) => {
        if (ev.keyCode === 13) {
            searchLoop.click();
        }
    })
})