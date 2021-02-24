let searchBar = document.querySelector('.search-wrapper .search-container');
let miniLocations = document.querySelectorAll('#mini .container .mini-card');
let chosenLocation = '';

printAllLocationsPage();
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
    let currentWhiteFieldHeight = expWhiteField.style.height;
    printSearchBar(chosenLocation, currentWhiteFieldHeight);
})