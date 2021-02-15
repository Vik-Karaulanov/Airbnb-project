function printAllLocationsPage(location, allStays) {
    let staysCounter = createEl('div', 'class', 'stays-counter');
    let title = createEl('div', 'class', 'title');
    let buttonsContainer = createEl('div', 'class', 'buttons-container');
    let typeOfPlaceButton = createEl('button', 'class', 'button');
    let priceButton = createEl('button', 'class', 'button');
    let moreFiltersButton = createEl('button', 'class', 'button');
    let staysContainer = createEl('div', 'class', 'stays-container');

    console.log("Hey hey");

    staysCounter.innerText = `${allStays.filter(el => el.location === location).length} stays`;
    title.innerText = `Stays in ${location}`;

    allStays.forEach(el => {
        if(el.location === location) {
            let newCard = createEl('div', 'class', 'newCard');
            newCard.innerText = `${el}`;
            staysContainer.append(newCard);
        }
    });

    buttonsContainer.append(typeOfPlaceButton, priceButton, moreFiltersButton);
    allLocations.append(staysCounter, title, buttonsContainer, staysContainer);
}