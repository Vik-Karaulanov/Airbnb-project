function printAllLocationsPage(location, allStays = staysManager.allStays, specificity) {

    let staysCounter = document.querySelector('#allLocations .stays-counter');
    let info = document.querySelector('#allLocations .info');
    let staysContainer = document.querySelector('#allLocations .stays-container');

    let allStaysInLocation = allStays;


    staysContainer.innerHTML = '';

    if (location) {
        localStorage.removeItem('staysSpecificity');
        info.innerText = `Stays in ${location}`;
        allStaysInLocation = allStays.filter(el => el.location === location);
    } else {
        if (!specificity) specificity = localStorage.getItem('staysSpecificity');
        localStorage.removeItem('chosenLocation');
        localStorage.setItem('staysSpecificity', specificity);
        info.innerText = `${localStorage.getItem('staysSpecificity')} stays` || `${specificity} stays`;
    }

    staysCounter.innerText = `${allStaysInLocation.length} stays`;
    localStorage.setItem('displayedStays', JSON.stringify(allStaysInLocation));

    allStaysInLocation.forEach(el => {
        let newCard = createEl('div', 'className', 'new-card');
        newCard.id = el.id;
        let imgDiv = createEl('img', 'className', 'card-img');
        imgDiv.src = `${el.images[0]}`;
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
        stayTitle.innerHTML = el.title.slice(0, 33);

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

function filterStays(stayKey, value, stays) {
    if (value === "") {
        localStorage.setItem('displayedStays', JSON.stringify(stays));
        return stays;
    } else {
        let filteredStays = stays.filter(el => el[stayKey] === value);
        localStorage.setItem('displayedStays', JSON.stringify(filteredStays));
        return filteredStays;
    }
}

function sortByPrice(sortDirection, stays) {
    let sortedStays = stays;
    if (sortDirection === 'ascending') {
        sortedStays = stays.sort((a, b) => b.price - a.price)
    } else {
        sortedStays = stays.sort((a, b) => a.price - b.price)
    }
    localStorage.setItem('displayedStays', JSON.stringify(sortedStays));
    return sortedStays;
}

function filterByAvailability(date1, date2, stays) {
    let startDate =  new Date(date1).getTime();
    let endDate =  new Date(date2).getTime();

    return stays.filter(stay => {
        let stayStartDate = new Date(stay.nonAvailableDates.split(' – ')[0]).getTime();
        let endStartDate = new Date(stay.nonAvailableDates.split(' – ')[1]).getTime();
        if ((endDate <= stayStartDate) || (startDate >= endStartDate)) return stay;
    });
    
}