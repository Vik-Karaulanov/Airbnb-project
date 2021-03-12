function printTargetStayPage(container, chosenStay) {
    let titleContainer = container.querySelector('.single-stay-title');
    let singleStayReviews = getById('singleStayReviews');
    let singleStayRating = getById('singleStayRating');
    let hostType = document.querySelector('#targetStayWrapper .hostType');
    let locationWrapper = document.querySelector('#targetStayWrapper .locationWrapper');
    let imagesContainer = document.querySelector('#targetStayWrapper .images-container');
    let stayTypeAndHostContainer = document.querySelector('.title-for-stay');
    let spaceArrangement = document.querySelector('.space-arrangement');
    let hostIconContainer = document.querySelector('.host-icon-container');
    let hostName = chosenStay.host;
    let staysOfHost = staysManager.allStays.find(el => el.host === hostName);
    let staySpecificsContainer = document.querySelector('.stay-specifics-container');
    
    // TODO: hostIconContainer.addEventListener('click', ()=> staysOfHost to be printed);
    
    printSimpleSection(titleContainer, chosenStay.title);
    printSimpleSection(singleStayRating, chosenStay.rating);
    printSimpleSection(singleStayReviews, `(${chosenStay.reviews} reviews)`);
    printSimpleSection(hostType, 'Superhost');
    printSimpleSection(locationWrapper, chosenStay.location);
    appendImage(imagesContainer, chosenStay.images);
    printSimpleSection(stayTypeAndHostContainer, `${chosenStay.stayType} hosted by ${chosenStay.host.split(' ')[0]}`);
    printSimpleSection(spaceArrangement, `${chosenStay.guests} guests &#xb7 ${chosenStay.bedrooms} bedrooms &#xb7 ${chosenStay.beds} beds &#xb7 ${chosenStay.baths} baths`);
    printMultipleElements(staySpecificsContainer, )
}

function printSimpleSection(container, value) {
    container.innerHTML = value;
}

function printMultipleElements(container, ...values) {
    // container.innerHTML = value;
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