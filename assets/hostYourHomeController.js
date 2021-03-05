// (function () {

function alreadyOpened() {
    return Array.from(collapsible).filter(el => {
        return el.classList.contains('active');
    });
}

function readImageURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            console.log(e.target);
            input.nextElementSibling.src = e.target.result;
        }

        reader.readAsDataURL(input.files[0]); // convert to base64 string
    }
}

let progress = getById('progress');
let getStartedDiv = getById('get-started');
let userNamePlaceholder = document.querySelector('#get-started-heading .userName');


// userNamePlaceholder.innerText = userModel.currentLoggedUser.firstName || 'Guest';  // TODO !!!!!!!!!!!!!!!!!!!!!!!

let becomeAHost = document.querySelector('.inner-header-container > div:first-of-type');
let HTHBtnHeaderProfileMenu1 = getById('menuHYHBtn');
let HTHBtnHeaderProfileMenu2 = getById('menuHYHBtn2');
let HYHFinalBtn = getById('HYH');

[becomeAHost, HTHBtnHeaderProfileMenu1, HTHBtnHeaderProfileMenu2].forEach(btn => {
    btn.addEventListener('click', () => {
        window.location.hash = 'becomeAHost';
    });
});

let collapsible = document.getElementsByClassName("collapsible");

function updateProgressBar(progress, el) {
    let parentElId = el.parentElement.id;
    let id = parentElId.slice(parentElId.length - 1);
    progress.style.width = `${id * 20}%`;
}

Array.from(collapsible).forEach((step) => {
    step.addEventListener('click', () => {
        updateProgressBar(progress, step);
        alreadyOpened().forEach(el => {
            el.classList.toggle('active');
            hideElements(el.nextElementSibling);
        });
        step.classList.toggle('active');
        let content = step.nextElementSibling;
        toggleDisplay(content, 'flex');
    });

    let continueBtn = step.parentElement.querySelector('.continue');

    if (continueBtn) {
        continueBtn.addEventListener('click', () => {
            step.classList.toggle('active');
            let nextStep = step.parentElement.nextElementSibling;
            let nextStepBtn = nextStep.querySelector('.collapsible');
            let nextStepContent = nextStep.querySelector('.content');

            updateProgressBar(progress, nextStepBtn);
            toggleDisplay(step.nextElementSibling, 'flex');
            if (!nextStepBtn.classList.contains('active')) {
                nextStepBtn.classList.toggle('active');
                toggleDisplay(nextStepContent, 'flex');
            }
        });
    }
});

let imageDivContainers = document.querySelectorAll('#uploadImages > div');
Array.from(imageDivContainers).forEach(div => {
    let input = div.querySelector('input');
    input.addEventListener('change', () => {
        readImageURL(input);
    })
})

function getInputData(id) {
    let el = getById(`${id}`);
    return data = el.querySelectorAll('select, input:not(input[type="checkbox"])');
}
function getCheckedValues(id) {
    let el = getById(`${id}`);
    let checked = Array.from(el.querySelectorAll('input[type="checkbox"]')).filter(el => el.checked === true);
    return checked
}

function getAllUserData() {
    let stayObj = {};
    let amenitiesObj = {};

    let locationData = getInputData('place-location');
    let country = locationData[0].value;
    let city = locationData[1].value;
    let street = locationData[2].value;

    stayObj['location'] = {
        "country": country,
        "city": city,
        "street": street
    }

    let stayTypeData = getInputData('type');
    let propertyType = stayTypeData[0].value;
    let numberOfGuests = stayTypeData[1].value;
    let numberOfBedrooms = stayTypeData[2].value;
    let numberOfBeds = stayTypeData[3].value;
    let title = stayTypeData[4].value;
    let pricePerNight = stayTypeData[5].value;
    let description = getById('description').value;

    stayObj["stayType"] = propertyType;
    stayObj["guests"] = numberOfGuests;
    stayObj["bedrooms"] = numberOfBedrooms;
    stayObj["beds"] = numberOfBeds;
    stayObj["title"] = title;
    stayObj["price"] = pricePerNight;
    stayObj["description"] = description;

    // All amenities data
    let bathroomAmenities = getCheckedValues('bathroom');
    let bedroomAndLaundry = getCheckedValues('bedroom-and-laundry');
    let entertainment = getCheckedValues('entertainment');
    let heatingAndCooling = getCheckedValues('heating-and-cooling');
    let kitchenAndDining = getCheckedValues('kitchen-and-dining');
    let parkingAndFacilities = getCheckedValues('Parking-and-facilities');

    amenitiesObj['Bathroom'] = bathroomAmenities.map(el => el.value);
    amenitiesObj['Bedroom and laundry'] = bedroomAndLaundry.map(el => el.value);
    amenitiesObj['Entertainment'] = entertainment.map(el => el.value);
    amenitiesObj['Heating and cooling'] = heatingAndCooling.map(el => el.value);
    amenitiesObj['Parking and facilities'] = kitchenAndDining.map(el => el.value);
    amenitiesObj['Parking and facilities'] = parkingAndFacilities.map(el => el.value);

    console.log(amenitiesObj);
    
    stayObj['Amenities'] = amenitiesObj;
    // All house rules data
    let checkInData = getInputData('rules')[0].value;
    let checkOutData = getInputData('rules')[1].value;
    let additionalRules = getInputData('rules')[2].value;
    let houseRulesChecked = getCheckedValues('rules');


    let houseRulesObj = {};
    houseRulesObj['checkIn'] = checkInData;
    houseRulesObj['checkOut'] = checkOutData;
    houseRulesObj['additionalRules'] = additionalRules;
    houseRulesChecked.forEach(el => houseRulesObj[el.value] = el.checked);
    
    stayObj['houseRules'] = houseRulesObj;

    let uploadedImages = getById('uploadImages');
    let images = Array.from(uploadedImages.querySelectorAll('img')).map(el => el.src);
    
    stayObj['images'] = images;

    return stayObj;
}


// HYHFinalBtn.addEventListener('click', getAllUserData)
// })();
