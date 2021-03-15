let loc = localStorage.getItem("chosenLocation") || '';
let currentStays = JSON.parse(localStorage.getItem('displayedStays')) || staysManager.allStays.filter(el => el.location === loc);

printAllLocationsPage(loc, currentStays);

let typeOfPlaceBtn = document.querySelector('.type-of-place-btn');
let priceBtn = document.querySelector('.price-btn');
let optionsWrapper = getById('optionsWrapper');
let radioOptionsContainer = document.querySelector('.radio-buttons-container');
let typeOfPlaceOptions = optionsWrapper.innerHTML;
let priceOrderContainer = document.querySelector('.price-order-container');
let ascendingPriceOption = document.querySelector('.price-order-container .ascending-price-sort');
let descendingPriceOption = document.querySelector('.price-order-container .descending-price-sort');
let miniLocations = document.querySelectorAll('#mini .container .mini-card');
let searchBtn = document.querySelector('.search-specifics-expanded .search-loop-wrapper');
let searchLoopImg = getById('searchLoopImg');
let filteredByStayType = JSON.parse(localStorage.getItem('displayedStays'));
// let currentStays = staysManager.allStays.filter(el => el.location === loc);
let userSearchedStays = JSON.parse(localStorage.getItem('displayedStays'));
if (localStorage.getItem('chosenLocation')) {
    userSearchedStays = staysManager.allStays.filter(el => el.location === loc);
} else if (localStorage.getItem('staysSpecificity')) {
    loc = '';
    let staysSpecificity = localStorage.getItem('staysSpecificity');
    checkStaysPrint(staysSpecificity);
}

miniLocations.forEach(el => {
    el.addEventListener('click', () => {
        window.location.hash = 'allLocations';
        localStorage.setItem("chosenLocation", el.querySelector('b').innerHTML);
        loc = localStorage.getItem("chosenLocation");
        currentStays = staysManager.allStays.filter(el => el.location === loc);
        userSearchedStays = staysManager.allStays.filter(el => el.location === loc);
        printAllLocationsPage(loc, staysManager.allStays);
        printSearchBar(loc);
        localStorage.removeItem('searchFieldsValues');
    });
});

function checkStaysPrint(spec) {
    let staysForPrint = staysManager.allStays;
    if (spec === 'PetsAllowed') {
        localStorage.setItem('staysSpecificity', 'PetsAllowed');
        staysForPrint = staysForPrint.filter(stay => stay.houseRules.PetsAllowed);
        printAllLocationsPage('', staysForPrint, 'Pets welcome');
    } else if (spec.endsWith(`'s`)) {
        staysForPrint = staysForPrint.filter(stay => stay.host === spec.replace(`'s`, ''));
        printAllLocationsPage('', staysForPrint, spec);
    } else {
        localStorage.setItem('staysSpecificity', spec);
        staysForPrint = staysForPrint.filter(stay => stay.stayType === spec);
        printAllLocationsPage('', staysForPrint, spec);
    }
    localStorage.setItem('displayedStays', JSON.stringify(staysForPrint));
}

window.addEventListener('click', (ev) => {
    if(ev.target.parentElement.classList[0] === 'general-card') {
        localStorage.setItem('chosenLocation', '');
        printSearchBar();
        let temp = ev.target.parentElement.classList[1].replace('-card', '').split('-').join(' ');
        let prop = temp[0].toUpperCase() + temp.slice(1);
        loc = '';
        
        checkStaysPrint(prop);
        // if (prop === 'PetsAllowed') {
        //     staysForPrint = staysForPrint.filter(stay => stay.houseRules.PetsAllowed);
        //     printAllLocationsPage('', staysForPrint, 'Pets welcome');
        // } else {
        //     staysForPrint = staysForPrint.filter(stay => stay.stayType === prop);
        //     printAllLocationsPage('', staysForPrint, prop);
        // }
        location.hash = 'allLocations';
    }
})

window.addEventListener('click', (ev) => {
    if (ev.target === typeOfPlaceBtn) {
        if (radioOptionsContainer.style.visibility === 'visible') {
            radioOptionsContainer.style.visibility = 'hidden';
        } else {
            printTypeOfPlacesOptions();
            // radioOptionsContainer.style.visibility = 'visible';
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
            let startDate = searchInputsValues[1];
            let endDate = searchInputsValues[2];
            
            currentStays = staysManager.allStays.filter(el => el.location === loc);

            currentStays = filterByAvailability(startDate, endDate, currentStays);
            
            userSearchedStays = filterStays('guests', Number(searchInputsValues[3]), currentStays);
            localStorage.setItem('displayedStays', userSearchedStays)
            printAllLocationsPage(loc, userSearchedStays)
        }
    }
    if (ev.target.closest('.price-order-container') !== priceOrderContainer &&
        ev.target.closest('.price-btn') !== priceBtn) {
        priceOrderContainer.style.visibility = 'hidden';
    }
    if (ev.target.closest('.radio-buttons-container') !== radioOptionsContainer &&
        ev.target.closest('.type-of-place-btn') !== typeOfPlaceBtn) {
        radioOptionsContainer.style.visibility = 'hidden';
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
        printAllLocationsPage(loc || '', filteredByStayType);
        localStorage.setItem('displayedStays', JSON.stringify(filteredByStayType));
    } else {
        printAllLocationsPage(loc);
    }
})

descendingPriceOption.addEventListener('click', () => {
    let ascendingPriceSortedStays = sortByPrice('ascending', JSON.parse(localStorage.getItem('displayedStays')));
    if(localStorage.getItem('staysSpecificity')) loc = '';
    printAllLocationsPage(loc, ascendingPriceSortedStays);
})

ascendingPriceOption.addEventListener('click', () => {
    let descendingPriceSortedStays = sortByPrice('descending', JSON.parse(localStorage.getItem('displayedStays')));
    if(localStorage.getItem('staysSpecificity')) loc = '';
    printAllLocationsPage(loc, descendingPriceSortedStays);
})