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

miniLocations.forEach(el => {
    el.addEventListener('click', () => window.location.hash = 'allLocations');
    el.addEventListener('click', () => {
        localStorage.setItem("chosenLocation", el.querySelector('b').innerHTML);
        loc = localStorage.getItem("chosenLocation");
        chosenLocation = localStorage.getItem("chosenLocation");
        printAllLocationsPage(chosenLocation, staysManager.allStays);
        printSearchBar(chosenLocation);
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
            printAllLocationsPage(searchInputsValues[0], filterStays(searchInputsValues[0], 'guests', Number(searchInputsValues[3])))
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
    console.log(ev.target.checked);
    if (ev.target.checked) {
        filteredByStayType = filterStays(loc, 'stayType', focusedElm);
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

