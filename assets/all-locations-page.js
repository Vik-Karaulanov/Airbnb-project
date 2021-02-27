function printAllLocationsPage(location, allStays = staysManager.allStays) {

    let staysCounter = document.querySelector('#allLocations .stays-counter');
    let info = document.querySelector('#allLocations .info');
    let staysContainer = document.querySelector('#allLocations .stays-container');
    let allStaysInLocation = allStays.filter(el => el.location === location);

    staysContainer.innerHTML = '';

    staysCounter.innerText = `${allStaysInLocation.length} stays`;
    info.innerText = `Stays in ${location}`;

    allStaysInLocation.forEach(el => {
        let newCard = createEl('div', 'className', 'new-card');
        let imgDiv = createEl('img', 'className', 'card-img');
        imgDiv.src = `${el.images}`;
        let ratingSpan = createEl('span', 'className', 'rating-span');
        let starIcon = createEl('img', 'className', 'star-icon');
        starIcon.src = 'assets/images/icons/red-star.png';
        starIcon.alt = 'rating star';
        let currentRating = createEl('span', 'className', 'current-rating');
        currentRating.innerHTML = el.rating;
        let usersVotes = createEl('span', 'className', 'users-votes');
        usersVotes.innerHTML = `(${el.reviews})`;
        let descriptionContainer = createEl('div', 'className', 'description-container');
        let cardTitle = createEl('div', 'className', 'card-title');
        cardTitle.innerHTML = `${el.stayType} · ${el.location}`
        let stayTitle = createEl('div', 'className', 'stay-title');
        stayTitle.innerHTML = el.title.slice(0, 33) + '...';

        if (el.reviews === 0) {
            usersVotes.innerHTML === 'No reviews yet';
            ratingSpan.append(usersVotes);
        } else if (el.reviews < 3) {
            currentRating.innerHTML === `${el.reviews} reviews`;
            ratingSpan.append(starIcon, currentRating);
        } else {
            ratingSpan.append(starIcon, currentRating, usersVotes);
        }
        descriptionContainer.append(cardTitle, stayTitle);
        newCard.append(imgDiv, ratingSpan, descriptionContainer);
        staysContainer.append(newCard);
    });
}

function printTypeOfPlacesOptions() {

    let typesOfPlaces = [];
    stays.forEach(el => {
        if (!typesOfPlaces.includes(el.stayType)) typesOfPlaces.push(el.stayType)
    })
    let radioButtonsContainer = document.querySelector('#allLocations .radio-buttons-container');
    radioButtonsContainer.innerHTML = '';

    typesOfPlaces.forEach(el => {
        let typeOfPlace = createEl('input', 'type', 'radio');
        typeOfPlace.name = 'typeOfPlace';
        typeOfPlace.id = el.toLowerCase().split(' ').map(word => {
            if (el.toLowerCase().indexOf(word) !== 0) return word = word[0].toUpperCase() + word.slice(1);
            else return word;
        }).join('');
        let labelForEntireAp = document.createElement('label');
        labelForEntireAp.setAttribute('for', `${typeOfPlace.id}`);
        labelForEntireAp.style.userSelect = 'none';

        labelForEntireAp.innerHTML = `${el[0].toUpperCase() + el.slice(1)}`;

        radioButtonsContainer.append(typeOfPlace, labelForEntireAp);
    })
}

function filterStays(loc, stayKey, value) {
    let allStays = staysManager.allStays;
    let allStaysInLocation = allStays.filter(el => el.location === loc);

    return allStaysInLocation.filter(el => el[stayKey] === value);
}

function printSortByPriceOptions() {
    let priceOrderContainer = document.querySelector('.price-order-container');
    priceOrderContainer.innerHTML = '';
    

}

function sortByPrice(loc, sortDirection) {
    let allStays = staysManager.allStays;
    let allStaysInLocation = allStays.filter(el => el.location === loc);
    if (sortDirection === 'ascending') {
        return allStaysInLocation.sort((a, b) => b.price - a.price);
    } else {
        return allStaysInLocation.sort((a, b) => a.price - b.price);
    }
}