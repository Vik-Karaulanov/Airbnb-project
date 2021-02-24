function printSearchBar(chosenLocation = localStorage.getItem("chosenLocation"), currentWhiteFieldHeight) {
    let searchedLocationDiv = document.querySelector('.search-specific-location .searched-location');
    let searchedLocationExpanded = document.querySelector(".search-specifics-expanded .current-location");
    let loc = localStorage.getItem("chosenLocation");
    searchedLocationDiv.innerHTML = loc;
    searchedLocationExpanded.innerHTML = loc;
    let currentPage = window.location.hash.slice(1);
    let addDatesInSearch = document.querySelector(".add-dates-in-search");
    let addGuestsInSearch = document.querySelector(".add-guests-in-search");

    if (currentWhiteFieldHeight !== undefined) {
        let searchSpecificsExpanded = document.querySelector('.search-specifics-expanded');
        let startYourSearch = document.querySelector(".start-your-search");
        let searchSpecificLocations = document.querySelector(".search-specific-location");
        let searchBar = document.querySelector('.search-wrapper .search-container');
        let expWhiteField = getById("expWhiteField");
        let mainHeader = getById('mainHeader');
        let searchContainer = document.querySelector(".search-container");

        if (currentWhiteFieldHeight === "") {
            console.log("Height-a e 0");
            showElementsFlex(searchSpecificsExpanded);
            hideElements(startYourSearch, searchSpecificLocations);
            
            let paddingLeft = 1;
            let paddingRight = 1;
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
                    searchContainerHeight += 0.1;
                    translateState += 0.2;
                    searchBar.style.transform = `translateY(${translateState}rem)`;
                    expWhiteField.style.height = whiteFieldHeight + 'rem';
                    mainHeader.style.height = headerHeight + 'rem';
                    searchContainer.style.height = searchContainerHeight + 'rem';
                }
            }
        } else {
            searchedLocationExpanded.innerHTML = `${chosenLocation}`;
            console.log("Height-a e 5rem");
            if (currentPage === 'allLocations') {
                showElementsFlex(searchSpecificLocations);
                hideElements(searchSpecificsExpanded);
            } else {
                showElements(startYourSearch);
                hideElements(searchSpecificsExpanded);
            }
            let padding = 1;
            let whiteFieldHeight = 5;
            let headerHeight = 10;
            let searchContainerHeight = 5;
            let translateState = 1;
            let timer = setInterval(makeSearchNarrower, 3);

            function makeSearchNarrower() {
                if (whiteFieldHeight < 0.1) {
                    expWhiteField.style.height = "";
                    clearInterval(timer);
                } else {
                    whiteFieldHeight -= 0.25;
                    headerHeight -= 0.25;
                    searchContainerHeight -= 0.1;
                    translateState -= 0.05;
                    searchBar.style.transform = `translateY(${translateState}rem)`;
                    expWhiteField.style.height = whiteFieldHeight + 'rem';
                    mainHeader.style.height = headerHeight + 'rem';
                    searchContainer.style.height = searchContainerHeight + 'rem';
                }
            }
        }
    }
}