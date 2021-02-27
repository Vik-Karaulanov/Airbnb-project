let searchBar = document.querySelector('.search-wrapper .search-container');
let chosenLocation = localStorage.getItem('chosenLocation') || '';

printSearchBar(chosenLocation);

searchBar.addEventListener('click', () => {
    let currentWhiteFieldHeight = expWhiteField.style.height;
    printSearchBar(chosenLocation, currentWhiteFieldHeight);
})