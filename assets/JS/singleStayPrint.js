function printTargetStayPage(container, chosenStay) {
    let hostIconContainer = document.querySelector('.host-icon-container');
    let titleContainer = container.querySelector('.single-stay-title');
    let singleStayReviews = getById('singleStayReviews');
    let singleStayRating = getById('singleStayRating');
    let hostType = document.querySelector('#targetStayWrapper .hostType');
    let locationWrapper = document.querySelector('#targetStayWrapper .locationWrapper');
    let imagesContainer = document.querySelector('#targetStayWrapper .images-container');
    let stayTypeAndHostContainer = document.querySelector('.title-for-stay');
    let spaceArrangement = document.querySelector('.space-arrangement');
    let hostName = chosenStay.host;
    let staysOfHost = staysManager.allStays.filter(el => el.host === hostName);
    let hostPic = userModel.localStorageUsers.find(user => user.fullName === hostName).profilePicture;
    hostIconContainer.style.backgroundImage = `url(${hostPic})`;

    // marking the existing amenities icons and labels for the chosenStay

    let amenitiesDivs = document.querySelectorAll('.amenities-info > div > div > div');

    let allAmenitiesInChosenStay = [];
    for (let key in chosenStay.amenities) {
        chosenStay.amenities[key].forEach(item => {
            let info = (item.replaceAll(' ', '-') + '-info').toLowerCase();
            allAmenitiesInChosenStay.push(info);
        })
    };

    amenitiesDivs.forEach(div => {
        let doesThisExist = allAmenitiesInChosenStay.some(amenity => div.classList.contains(amenity));
        let icon = div.previousElementSibling;
        if (doesThisExist) {
            if (div.classList.contains('amenity-info-not-included')) {
                div.classList.remove('amenity-info-not-included');
                icon.classList.remove('amenity-icon-not-included');
            }
        } else {
            div.classList.add('amenity-info-not-included');
            icon.classList.add('amenity-icon-not-included');
        }
    });
    let enhancedCleaning = getById('enhancedCleaning');
    let superHostInfo = document.querySelector('.super-host-info');
    let stayTypeInfo = document.querySelector('.stay-type-info');
    let cancellationPolicyInfo = getById('cancellationPolicyInfo');
    let houseRulesInfo = getById('houseRulesInfo');
    let houseRulesText = ``;
    let stayTypeMoreInfo = getById('stayTypeMoreInfo');
    let stayDescription = getById('descInfoField');
    let addToFave = getById('likeBtn');

    printSimpleSection(superHostInfo, `${chosenStay.host} is a Superhost`);
    checkIfTrue(enhancedCleaning, chosenStay.enhancedCleaning);
    printSimpleSection(stayTypeInfo, chosenStay.stayType);
    printSimpleSection(stayTypeMoreInfo, `You will have the ${chosenStay.stayType} to yourself.`);
    printSimpleSection(cancellationPolicyInfo, chosenStay.cancellationPolicy);
    printSimpleSection(houseRulesInfo, getHouseRulesInfo(chosenStay, houseRulesText));
    printSimpleSection(stayDescription, chosenStay.description ? chosenStay.description : "Beautiful place with exceptional mountain view. The perfect place for relaxation and excaping the stressful city life.");

    // TODO addToFave.addEventListener()

    // TODO: hostIconContainer.addEventListener('click', ()=> staysOfHost to be printed);
    hostIconContainer.addEventListener('click', () => {  });

    printSimpleSection(titleContainer, chosenStay.title);
    printSimpleSection(singleStayRating, chosenStay.rating);
    printSimpleSection(singleStayReviews, `(${chosenStay.reviews} reviews)`);
    printSimpleSection(hostType, 'Superhost');
    printSimpleSection(locationWrapper, chosenStay.location);
    appendImage(imagesContainer, chosenStay.images);
    printSimpleSection(stayTypeAndHostContainer, `${chosenStay.stayType} hosted by ${chosenStay.host.split(' ')[0]}`);
    printSimpleSection(spaceArrangement, `${chosenStay.guests || 0} guests &#xb7 ${chosenStay.bedrooms || 0} bedrooms &#xb7 ${chosenStay.beds || 0} beds`);
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
        if (stay.houseRules[el]) {
            console.log(el, stay.houseRules[el], ' pri true');
            allowed.push(el);
        } else  {
            console.log(el, stay.houseRules[el], ' pri false');
            forbidden.push(el);
        }
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
    if (stay.houseRules.checkIn) {
        innerText += ` Check-in: After ${stay.houseRules.checkIn}.`;
        if (stay.houseRules.checkOut) innerText += ` Check-out: Before ${stay.houseRules.checkOut}.`
    } else if (stay.houseRules.checkOut) innerText += ` Check-out: Before ${stay.houseRules.checkOut}.`;
    
    if (stay.houseRules.additionalRules) {
        innerText += ` Additional rules: ${stay.houseRules.additionalRules}`;
    }

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