function printSearchBar(chosenLocation = '', expandedOrNormal) {
    let searchedLocationDiv = document.querySelector('.search-specific-location .searched-location');
    let searchedLocationExpanded = document.querySelector(".search-specifics-expanded .current-location");
    let currentPage = window.location.hash.slice(1);
    searchedLocationDiv.innerHTML = chosenLocation;
    if (currentPage !== 'allLocations') searchedLocationExpanded.placeholder = 'Where to?';
    else searchedLocationExpanded.value = chosenLocation;


    let searchSpecificsExpanded = document.querySelector('.search-specifics-expanded');
    let startYourSearch = document.querySelector(".start-your-search");
    let searchSpecificLocations = document.querySelector(".search-specific-location");
    let searchBar = document.querySelector('.search-wrapper .search-container');
    let expWhiteField = getById("expWhiteField");
    let mainHeader = getById('mainHeader');
    let searchContainer = document.querySelector(".search-container");
    let searchLocationWidth = document.querySelectorAll(".search-location-width");
    let searchDivsWidth = document.querySelectorAll(".search-divs-width");
    let searchIcon = document.querySelector('.search-loop-icon');
    let searchWrapper = document.querySelectorAll('.search-loop-wrapper');

    function expandSearchBar() {
        showElementsFlex(searchSpecificsExpanded);
        hideElements(startYourSearch, searchSpecificLocations);

        let normalDivWidth = 7;
        let locationDivWidth = 5;
        let whiteFieldHeight = 0;
        let headerHeight = 5;
        let searchContainerHeight = 3;
        let translateState = 0;
        let timer = setInterval(makeSearchWider, 10);
        let searchIconExpansion = 1;
        let searchWrapperWidth = 2;
        let searchWrapperHeight = 2;

        function makeSearchWider() {
            if (whiteFieldHeight >= 4.9) {
                clearInterval(timer);
                expWhiteField.style.height = "5rem";
            } else {
                whiteFieldHeight += 0.25;
                headerHeight += 0.25;
                searchContainerHeight += 0.06;
                translateState += 0.2;
                locationDivWidth += 0.4;
                normalDivWidth += 0.15;
                searchIconExpansion += 0.05;
                searchWrapperWidth += 0.1;
                searchWrapperHeight += 0.05;

                searchLocationWidth.forEach(el => el.style.width = `${locationDivWidth}rem`);
                searchDivsWidth.forEach(el => el.style.width = `${normalDivWidth}rem`);
                searchBar.style.transform = `translateY(${translateState}rem)`;
                expWhiteField.style.height = whiteFieldHeight + 'rem';
                mainHeader.style.height = headerHeight + 'rem';
                searchContainer.style.height = searchContainerHeight + 'rem';
                searchIcon.style.height = searchIconExpansion + 'rem';
                searchIcon.style.width = searchIconExpansion + 'rem';
                searchWrapper.forEach(el => el.style.width = `${searchWrapperWidth}rem`);
                searchWrapper.forEach(el => el.style.height = `${searchWrapperHeight}rem`);
            }
        }
        return true;
    }

    function normalizeSearchBar() {
        if (currentPage === 'allLocations') {
            showElementsFlex(searchSpecificLocations);
            hideElements(searchSpecificsExpanded);
        } else {
            showElementsFlex(startYourSearch);
            hideElements(searchSpecificsExpanded);
        }
        let normalDivWidth = 10;
        let locationDivWidth = 13;
        let whiteFieldHeight = 5;
        let headerHeight = 10;
        let searchContainerHeight = 4.2;
        let translateState = 1;
        let timer = setInterval(makeSearchNarrower, 3);
        let searchIconExpansion = 2;
        let searchWrapperWidth = 4;
        let searchWrapperHeight = 3;

        function makeSearchNarrower() {
            if (whiteFieldHeight < 0.1) {
                expWhiteField.style.height = "";
                clearInterval(timer);
            } else {
                whiteFieldHeight -= 0.25;
                headerHeight -= 0.25;
                searchContainerHeight -= 0.06;
                translateState -= 0.05;
                locationDivWidth -= 0.4;
                normalDivWidth -= 0.15;
                searchIconExpansion -= 0.05;
                searchWrapperWidth -= 0.1;
                searchWrapperHeight -= 0.05;

                searchLocationWidth.forEach(el => el.style.width = `${locationDivWidth}rem`);
                searchDivsWidth.forEach(el => el.style.width = `${normalDivWidth}rem`);
                searchBar.style.transform = `translateY(${translateState}rem)`;
                expWhiteField.style.height = whiteFieldHeight + 'rem';
                mainHeader.style.height = headerHeight + 'rem';
                searchContainer.style.height = searchContainerHeight + 'rem';
                searchIcon.style.height = searchIconExpansion + 'rem';
                searchIcon.style.width = searchIconExpansion + 'rem';
                searchWrapper.forEach(el => el.style.width = `${searchWrapperWidth}rem`);
                searchWrapper.forEach(el => el.style.height = `${searchWrapperHeight}rem`);
            }
        }
        return false;
    }
    return expandedOrNormal === 'expand' ? expandSearchBar() : normalizeSearchBar();
}

function getReservationData() {
    let chosenLocation = document.querySelector('.searched-location-expanded .current-location');
    let checkInDate = getById('checkInDate');
    let checkOutDate = getById('checkOutDate');
    let guestsNumber = getById('guestsNumber');
    let allElements = [chosenLocation, checkInDate, checkOutDate, guestsNumber];

    allElements.forEach(el => {
        if (el.value === '') {
            el.style.border = '2px solid red';
        } else el.style.border = 'none';
    })
    
    return [chosenLocation.value, checkInDate.value, checkOutDate.value, guestsNumber.value];
}