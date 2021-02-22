function printAllLocationsPage(location, allStays) {
    let staysCounter = createEl('div', 'className', 'stays-counter');
    let info = createEl('div', 'className', 'info');
    let buttonsContainer = createEl('div', 'className', 'buttons-container');
    let typeOfPlaceButton = createEl('button', 'className', 'button');
    typeOfPlaceButton.innerHTML = 'Type of place';
    let priceButton = createEl('button', 'className', 'button');
    priceButton.innerHTML = 'Price';
    let moreFiltersButton = createEl('button', 'className', 'button');
    moreFiltersButton.innerHTML = 'More filters';
    let staysContainer = createEl('div', 'className', 'stays-container');

    let allStayInLocation = allStays.filter(el => el.location === location);

    staysCounter.innerText = `${allStayInLocation.length} stays`;
    info.innerText = `Stays in ${location}`;

    allStayInLocation.forEach(el => {
            let newCard = createEl('div', 'className', 'new-card');
            let imgDiv = createEl('img', 'className', 'card-img');
            imgDiv.src = `${el.image}`;
            // imgDiv.src = `images/cosy-stay.jpeg`;
            let ratingSpan = createEl('span', 'className', 'rating-span');
            let starIcon = createEl('img', 'className', 'star-icon');
            starIcon.src = 'assets/images/icons/red-star.png';
            starIcon.alt = 'rating star';
            let currentRating = createEl('span', 'className', 'current-rating');
            currentRating.innerHTML = el.rating;
            let usersVotes = createEl('span', 'className', 'users-votes');
            usersVotes.innerHTML = `(${el.reviews})`
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

    buttonsContainer.append(typeOfPlaceButton, priceButton, moreFiltersButton);
    allLocations.append(staysCounter, info, buttonsContainer, staysContainer);
}