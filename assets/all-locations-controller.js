printAllLocationsPage();

let typeOfPlaceBtn = document.querySelector('.type-of-place-btn');
let optionsWrapper = getById('optionsWrapper');
let typeOfPlaceOptions = optionsWrapper.innerHTML;

window.addEventListener('click', (ev) => {        
    if(ev.target === typeOfPlaceBtn) {
        // if (optionsWrapper.style.display === 'flex') {
            if (optionsWrapper.style.visibility === 'visible') {
                optionsWrapper.style.visibility = 'hidden';
            // hideElements(optionsWrapper);
        } else {
            printTypeOfPlacesOptions();
            // showElementsFlex(optionsWrapper);
            optionsWrapper.style.visibility = 'visible';
        }
    }
});

