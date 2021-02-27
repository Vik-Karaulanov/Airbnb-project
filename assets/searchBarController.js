let searchBar = document.querySelector('.search-wrapper .search-container');
let miniLocations = document.querySelectorAll('#mini .container .mini-card');
let chosenLocation = '';
// let locationSearch = document.querySelector('.search-specifics-expanded .searched-location-expanded');
// let searchBarIsClicked = false;
printSearchBar();

miniLocations.forEach(el => {
    el.addEventListener('click', () => window.location.hash = 'allLocations');
    el.addEventListener('click', () => {
        localStorage.setItem("chosenLocation", el.querySelector('b').innerHTML);
        chosenLocation = localStorage.getItem("chosenLocation");
        printAllLocationsPage(chosenLocation, staysManager.allStays);
        printSearchBar(chosenLocation);
    });
});

searchBar.addEventListener('click', () => {
    // searchBarIsClicked = true;
    let currentWhiteFieldHeight = expWhiteField.style.height;
    printSearchBar(chosenLocation, currentWhiteFieldHeight);
})

// window.addEventListener('click', (ev) => {
//     if (ev.target === locationSearch) {
//         searchBarIsClicked = false;
//         console.log(1);
//     }
//     // if (searchBarIsClicked) {
//     //     let currentWhiteFieldHeight = expWhiteField.style.height;
//     //     printSearchBar(chosenLocation, currentWhiteFieldHeight);
//     // }
// })