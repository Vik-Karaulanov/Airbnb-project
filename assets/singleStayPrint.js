function printTargetStayPage(container, chosenStay) {
    let titleContainer = container.querySelector('.stay-title');
    let singleStayReviews = getById('singleStayReviews');
    let singleStayRating = getById('singleStayRating');
    let hostType = document.querySelector('#targetStayWrapper .hostType');
    let locationWrapper = document.querySelector('#targetStayWrapper .locationWrapper');
    let imagesContainer = document.querySelector('#targetStayWrapper .images-container');
    let stayTypeAndHostContainer = document.querySelector('.title-for-stay');
    let spaceArrangement = document.querySelector('.space-arrangement');

    printSimpleSection(titleContainer, chosenStay.title);
    printSimpleSection(singleStayRating, chosenStay.rating);
    printSimpleSection(singleStayReviews, `(${chosenStay.reviews} reviews)`);
    printSimpleSection(hostType, 'Superhost');
    printSimpleSection(locationWrapper, chosenStay.location);
    appendImage(imagesContainer, chosenStay.images);
    printSimpleSection(stayTypeAndHostContainer, `${chosenStay.stayType} hosted by ${chosenStay.host.split(' ')[0]}`);
    printMultipleElements(spaceArrangement, `${chosenStay.guests} guests * ${chosenStay.bedrooms} bedrooms * ${chosenStay.beds} beds * ${chosenStay.baths} baths`);

}

function printSimpleSection(container, value) {
    container.innerHTML = value;
}

function printMultipleElements(container, value) {
    container.innerHTML = value;
}

function appendImage(container, imgPaths) {
    container.innerHTML = '';
    if (Array.isArray(imgPaths)) {
        imgPaths.forEach(el => {
            let newImg = document.createElement('img');
            newImg.className = 'stayImg vertical-margin';
            newImg.src = el;
            container.append(newImg);
        });
    } else {
        let newImg = document.createElement('img');
        newImg.className = 'stayImg vertical-margin';
        newImg.src = imgPaths;
        container.append(newImg);
    }
}