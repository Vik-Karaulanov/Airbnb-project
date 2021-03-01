let loc = localStorage.getItem("chosenLocation") || '';

printAllLocationsPage(loc);

let typeOfPlaceBtn = document.querySelector('.type-of-place-btn');
let priceBtn = document.querySelector('.price-btn');
let optionsWrapper = getById('optionsWrapper');
let radioOptionsContainer = document.querySelector('.radio-buttons-container');
let typeOfPlaceOptions = optionsWrapper.innerHTML;
let priceOrderContainer = document.querySelector('.price-order-container');
let ascendingPriceOption = document.querySelector('.price-order-container .ascending-price-sort');
let descendingPriceOption = document.querySelector('.price-order-container .descending-price-sort');
let miniLocations = document.querySelectorAll('#mini .container .mini-card');
let filteredByStayType = staysManager.allStays;
let searchBtn = document.querySelector('.search-specifics-expanded .search-loop-wrapper');
let searchLoopImg = getById('searchLoopImg');
let cuurentStays = staysManager.allStays.filter(el => el.location === loc);
let userSearchedStays = staysManager.allStays.filter(el => el.location === loc);

miniLocations.forEach(el => {
    el.addEventListener('click', () => window.location.hash = 'allLocations');
    el.addEventListener('click', () => {
        localStorage.setItem("chosenLocation", el.querySelector('b').innerHTML);
        loc = localStorage.getItem("chosenLocation");
        cuurentStays = staysManager.allStays.filter(el => el.location === loc);
        userSearchedStays = staysManager.allStays.filter(el => el.location === loc);
        printAllLocationsPage(loc, staysManager.allStays);
        printSearchBar(loc);
    });
});

window.addEventListener('click', (ev) => {
    if (ev.target === typeOfPlaceBtn) {
        if (radioOptionsContainer.style.visibility === 'visible') {
            radioOptionsContainer.style.visibility = 'hidden';
        } else {
            printTypeOfPlacesOptions();
            priceOrderContainer.style.visibility = 'hidden';
            radioOptionsContainer.style.visibility = 'visible';
        }
    } else if (ev.target === priceBtn) {
        if (priceOrderContainer.style.visibility === 'visible') {
            priceOrderContainer.style.visibility = 'hidden';
        } else {
            radioOptionsContainer.style.visibility = 'hidden';
            priceOrderContainer.style.visibility = 'visible';
        }
    } else if (ev.target === searchBtn || ev.target === searchLoopImg) {
        if (localStorage.getItem('searchFieldsValues')) {
            let searchInputsValues = localStorage.getItem('searchFieldsValues').split(',');
            loc = searchInputsValues[0];
            cuurentStays = staysManager.allStays.filter(el => el.location === loc);
            userSearchedStays = filterStays('guests', Number(searchInputsValues[3]), cuurentStays);
            printAllLocationsPage(loc, userSearchedStays)
        }
    }
});

optionsWrapper.addEventListener('change', (ev) => {
    let allLabelOptions = Array.from(document.querySelectorAll('#optionsWrapper label'));
    let focusedElm = allLabelOptions.reduce((focused, el) => {
        if (el.control.id === ev.target.id) {
            focused = el.innerHTML;
        }
        return focused;
    }, '');
    if (ev.target.checked) {
        filteredByStayType = filterStays('stayType', focusedElm, userSearchedStays);
        printAllLocationsPage(loc, filteredByStayType);
    } else {
        printAllLocationsPage(loc);
    }
})

ascendingPriceOption.addEventListener('click', () => {
    let ascendingPriceSoredStays = sortByPrice('ascending', filteredByStayType);
    printAllLocationsPage(loc, ascendingPriceSoredStays);
})

descendingPriceOption.addEventListener('click', () => {
    let descendingPriceSoredStays = sortByPrice('descending', filteredByStayType);
    printAllLocationsPage(loc, descendingPriceSoredStays);
})

