function printSearchBar(chosenLocation = '', expandOrNormalize) {
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
        // showElementsFlex(searchSpecificsExpanded);
        // hideElements(startYourSearch, searchSpecificLocations);
        showElementsStyle('flex', searchSpecificsExpanded);
        showElementsStyle('none', startYourSearch, searchSpecificLocations);

        let normalDivWidth = 7;
        let locationDivWidth = 7;
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
                locationDivWidth += 0.2;
                normalDivWidth += 0.20;
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
            // showElementsFlex(searchSpecificLocations);
            // hideElements(searchSpecificsExpanded);
            showElementsStyle('flex', searchSpecificLocations);
            showElementsStyle('none', searchSpecificsExpanded);
        } else {
            // showElementsFlex(startYourSearch);
            // hideElements(searchSpecificsExpanded);
            showElementsStyle('flex', startYourSearch);
            showElementsStyle('none', searchSpecificsExpanded);
        }
        let normalDivWidth = 11;
        let locationDivWidth = 11;
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
                locationDivWidth -= 0.2;
                normalDivWidth -= 0.20;
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
    if (expandOrNormalize) {
        return expandOrNormalize === 'expand' ? expandSearchBar() : normalizeSearchBar();
    }
}

function getReservationData() {
    let chosenLocation = document.querySelector('.searched-location-expanded .current-location');
    chosenLocation.value = chosenLocation.value.slice(0, 1).toUpperCase() + chosenLocation.value.slice(1);
    let checkInDate = getById('checkInDate');
    let checkOutDate = getById('checkOutDate');
    let guestsNumber = getById('guestsNumber');
    let allElements = [chosenLocation, checkInDate, checkOutDate, guestsNumber];
    let allCities = [...new Set(staysManager.allStays.map(el => el.location))];

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    today = yyyy + '-' + mm + '-' + dd;

    if (!allCities.includes(chosenLocation.value)) {
        chosenLocation.style.border = '1px solid red';
    } else {
        chosenLocation.style.border = 'none';
    }
    
    if (today > checkInDate.value || checkInDate.value === '') {
        checkInDate.style.border = '1px solid red';
    } else {
        checkInDate.style.border = 'none';
    }

    if (today > checkOutDate.value || checkOutDate.value === '' || checkInDate.value > checkOutDate.value) {
        checkOutDate.style.border = '1px solid red';
    } else {
        checkOutDate.style.border = 'none';
    }

    if (guestsNumber.value < 1) {
        guestsNumber.style.border = '1px solid red';
    } else {
        guestsNumber.style.border = 'none';
    }

    let isDataCorrect = true;

    allElements.forEach(el => {
        if (el.style.border === '1px solid red') {
            isDataCorrect = false;
        }
    });

    if (isDataCorrect) return [chosenLocation.value, checkInDate.value, checkOutDate.value, guestsNumber.value];
    else return false;
}