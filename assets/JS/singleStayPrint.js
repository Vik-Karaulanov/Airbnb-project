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
    let staysOfHost = staysManager.allStays.filter(el => el.host === hostName);
    let staySpecificsContainer = document.querySelector('.stay-specifics-container');
    let amenitiesInfoContainer = document.querySelector('.amenities-info-container');
    let hostPic = userModel.localStorageUsers.find(user => user.fullName === hostName).profilePicture;
    hostIconContainer.style.backgroundImage = `url(${hostPic})`;
    let stayDescription = document.querySelector('.stay-description');
    stayDescription.innerHTML = chosenStay.description;

    // selecting all Amenities icons + labels (wifi-info);


    for (let key in chosenStay.amenities){
        chosenStay.amenities[key].forEach(item => {
            let info = (item.replaceAll(' ','-') + '-info').toLowerCase();
            console.log(info);
            setItemToUnavailable(info)
        })
    };

    function setItemToUnavailable(elClass) {
        let label = document.querySelector(`.${elClass}`) ?? false;
        if (label) {
            let icon = label.previousElementSibling;
            label.classList.add('amenity-info-not-included');
            icon.classList.add('amenity-icon-not-included');
        } else console.log('nqma takova');
    }






    

    // TODO: hostIconContainer.addEventListener('click', ()=> staysOfHost to be printed);
    hostIconContainer.addEventListener('click', () => {console.log(staysOfHost)});

    printSimpleSection(titleContainer, chosenStay.title);
    printSimpleSection(singleStayRating, chosenStay.rating);
    printSimpleSection(singleStayReviews, `(${chosenStay.reviews} reviews)`);
    printSimpleSection(hostType, 'Superhost');
    printSimpleSection(locationWrapper, chosenStay.location);
    appendImage(imagesContainer, chosenStay.images);
    printSimpleSection(stayTypeAndHostContainer, `${chosenStay.stayType} hosted by ${chosenStay.host.split(' ')[0]}`);
    printSimpleSection(spaceArrangement, `${chosenStay.guests} guests &#xb7 ${chosenStay.bedrooms} bedrooms &#xb7 ${chosenStay.beds} beds &#xb7 ${chosenStay.baths} baths`);
    // printMultipleElements(staySpecificsContainer, )
}

function printSimpleSection(container, value) {
    container.innerHTML = value;
}

function printMultipleElements(container, ...values) {}

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