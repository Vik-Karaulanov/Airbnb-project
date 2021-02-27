let searchBar = document.querySelector('.search-wrapper .search-container');
let chosenLocation = localStorage.getItem('chosenLocation') || '';

printSearchBar(chosenLocation);

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