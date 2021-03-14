function printTargetStayPage(container, chosenStay) {
    let titleContainer = container.querySelector('.single-stay-title');
    let singleStayReviews = getById('singleStayReviews');
    let singleStayRating = getById('singleStayRating');
    let hostType = document.querySelector('#targetStayWrapper .hostType');
    let locationWrapper = document.querySelector('#targetStayWrapper .locationWrapper');
    let imagesContainer = document.querySelector('#targetStayWrapper .images-container');
    let stayTypeAndHostContainer = document.querySelector('.title-for-stay');
    let spaceArrangement = document.querySelector('.space-arrangement');
    let hostName = chosenStay.host;
    let enhancedCleaning = getById('enhancedCleaning');
    let superHostInfo = document.querySelector('.super-host-info');
    let stayTypeInfo = document.querySelector('.stay-type-info');
    let cancellationPolicyInfo = getById('cancellationPolicyInfo');
    let houseRulesInfo = getById('houseRulesInfo');
    let houseRulesText = ``;
    let stayTypeMoreInfo = getById('stayTypeMoreInfo');
    let stayDescription = getById('descInfoField');
    
    let staysOfHost = staysManager.allStays.find(el => el.host === hostName);
    let addToFave = getById('likeBtn');

    printSimpleSection(superHostInfo, `${chosenStay.host} is a Superhost`);
    checkIfTrue(enhancedCleaning, chosenStay.enhancedCleaning);
    printSimpleSection(stayTypeInfo, chosenStay.stayType);
    printSimpleSection(stayTypeMoreInfo, `You will have the ${chosenStay.stayType} to yourself.`);
    printSimpleSection(cancellationPolicyInfo, chosenStay.cancellationPolicy);
    printSimpleSection(houseRulesInfo, getHouseRulesInfo(chosenStay, houseRulesText));
    printSimpleSection(stayDescription, chosenStay.description);

    // TODO addToFave.addEventListener()

    // TODO: hostIconContainer.addEventListener('click', ()=> staysOfHost to be printed);

    printSimpleSection(titleContainer, chosenStay.title);
    printSimpleSection(singleStayRating, chosenStay.rating);
    printSimpleSection(singleStayReviews, `(${chosenStay.reviews} reviews)`);
    printSimpleSection(hostType, 'Superhost');
    printSimpleSection(locationWrapper, chosenStay.location);
    appendImage(imagesContainer, chosenStay.images);
    printSimpleSection(stayTypeAndHostContainer, `${chosenStay.stayType} hosted by ${chosenStay.host.split(' ')[0]}`);
    printSimpleSection(spaceArrangement, `${chosenStay.guests} guests &#xb7 ${chosenStay.bedrooms} bedrooms &#xb7 ${chosenStay.beds} beds`);
    // printMultipleElements(staySpecificsContainer, )

}

function printSimpleSection(container, value) {
    container.innerHTML = value;
}

function appendImage(container, imgPaths) {
    container.innerHTML = '';
    let newLittleDiv = createEl('div', 'className', 'img-little-div');
    if (Array.isArray(imgPaths)) {
        imgPaths.forEach((el, i) => {

            let newImg = document.createElement('img');
            newImg.src = el;
            if (i === 0) {
                newImg.className = 'stay-first-img';
                container.append(newImg);
            } else {
                if (i === 2) {
                    newImg.className = 'stay-img top-right-border-rad';

                } else if (i === 4) {
                    newImg.className = 'stay-img bottom-right-border-rad';
                } else {
                    newImg.className = 'stay-img';
                }
                newLittleDiv.append(newImg);
                container.append(newLittleDiv);
            }
        });
    } else {
        let newImg = document.createElement('img');
        newImg.className = 'stayImg vertical-margin';
        newImg.src = imgPaths;
        container.append(newImg);
    }
}

function checkIfTrue(container, prop) {
    if (prop) {
        showElementsStyle('flex', container);
    } else showElementsStyle('none', container);
}
// "additionalRules": "Keep it quiet.",

function getHouseRulesInfo(stay, innerText) {
    let keys = ['Smoking', 'PetsAllowed', 'PartiesAllowed'];
    let allowed = [];
    let forbidden = [];

    keys.forEach(el => {
        if (stay.houseRules[el]) allowed.push(el);
        else forbidden.push(el);
    });

    if (allowed.length > 0) {
        innerText = `The host allows: `
        allowed.forEach(el => {
            innerText = checkIfLast(el, allowed, innerText)
        })
        if (forbidden.length > 0)
            innerText += ` The host doesn't allow: `
        forbidden.forEach(el => {
            innerText = checkIfLast(el, forbidden, innerText)
        })
    } else {
        innerText = `The host doesn't allow: `
        forbidden.forEach(el => {
            innerText = checkIfLast(el, forbidden, innerText);
        })
    }

    innerText += ` Check-in: After ${stay.houseRules.checkIn}. Check-out: Before ${stay.houseRules.checkOut}.`

    function removeAllowed(propName) {
        if (propName.includes('Allowed')) return propName.replace('Allowed', '');
        else return propName;
    }

    function checkIfLast(propName, arr, textToChange) {
        if (arr.indexOf(propName) !== arr.length - 1) {
            textToChange += `${removeAllowed(propName)}, `;
        } else textToChange += `${removeAllowed(propName)}.`
        return textToChange;
    }

    return innerText;
}