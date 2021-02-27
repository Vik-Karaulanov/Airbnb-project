function printSearchBar(chosenLocation, currentWhiteFieldHeight) {
    let searchedLocationDiv = document.querySelector('.search-specific-location .searched-location');
    let searchedLocationExpanded = document.querySelector(".search-specifics-expanded .current-location");
    let currentPage = window.location.hash.slice(1);
    searchedLocationDiv.innerHTML = chosenLocation;
    if (currentPage !== 'allLocations') searchedLocationExpanded.innerHTML = 'Where to?';
    else searchedLocationExpanded.innerHTML = chosenLocation;

    if (currentWhiteFieldHeight !== undefined) {
        let searchSpecificsExpanded = document.querySelector('.search-specifics-expanded');
        let startYourSearch = document.querySelector(".start-your-search");
        let searchSpecificLocations = document.querySelector(".search-specific-location");
        let searchBar = document.querySelector('.search-wrapper .search-container');
        let expWhiteField = getById("expWhiteField");
        let mainHeader = getById('mainHeader');
        let searchContainer = document.querySelector(".search-container");
        let searchLocationWidth = document.querySelectorAll(".search-location-width");
        let searchDivsWidth = document.querySelectorAll(".search-divs-width");

        if (currentWhiteFieldHeight === "") {
            showElementsFlex(searchSpecificsExpanded);
            hideElements(startYourSearch, searchSpecificLocations);
            
            let normalDivWidth = 7;
            let locationDivWidth = 5;
            let whiteFieldHeight = 0;
            let headerHeight = 5;
            let searchContainerHeight = 3;
            let translateState = 0;
            let timer = setInterval(makeSearchWider, 10);

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

                    searchLocationWidth.forEach(el => el.style.width = `${locationDivWidth}rem`);
                    searchDivsWidth.forEach(el => el.style.width = `${normalDivWidth}rem`);
                    searchBar.style.transform = `translateY(${translateState}rem)`;
                    expWhiteField.style.height = whiteFieldHeight + 'rem';
                    mainHeader.style.height = headerHeight + 'rem';
                    searchContainer.style.height = searchContainerHeight + 'rem';
                }
            }
        } else {
            if (currentPage === 'allLocations') {
                showElementsFlex(searchSpecificLocations);
                hideElements(searchSpecificsExpanded);
            } else {
                showElements(startYourSearch);
                hideElements(searchSpecificsExpanded);
            }
            let normalDivWidth = 10;
            let locationDivWidth = 13;
            let whiteFieldHeight = 5;
            let headerHeight = 10;
            let searchContainerHeight = 4.2;
            let translateState = 1;
            let timer = setInterval(makeSearchNarrower, 3);

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

                    searchLocationWidth.forEach(el => el.style.width = `${locationDivWidth}rem`);
                    searchDivsWidth.forEach(el => el.style.width = `${normalDivWidth}rem`);
                    searchBar.style.transform = `translateY(${translateState}rem)`;
                    expWhiteField.style.height = whiteFieldHeight + 'rem';
                    mainHeader.style.height = headerHeight + 'rem';
                    searchContainer.style.height = searchContainerHeight + 'rem';
                }
            }
        }
    }
}