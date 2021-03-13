(function () {

    function alreadyOpened() {
        return Array.from(collapsible).filter(el => {
            return el.classList.contains('active');
        });
    }

    let areAllImagesRightSize = true;

    function readImageURL(input) {
        let span = input.parentElement.querySelector('.imgTooLarge');
        console.log(span);
        if (input.files && input.files[0]) {
            if (input.files[0].size > 100000) {
                areAllImagesRightSize = false;
                span.innerText = 'The image is too large! It must be less than 100Kb';
                input.parentElement.append(span);
            }
            else {
                span.innerText = '';
                areAllImagesRightSize = true;
                var reader = new FileReader();

                reader.onload = function (e) {
                    console.log('target', e.target);
                    input.nextElementSibling.src = e.target.result;
                }
                reader.readAsDataURL(input.files[0]); // convert to base64 string
            }
        }
    }

    let progress = getById('progress');
    let getStarted = getById('get-started');
    let userNamePlaceholder = document.querySelector('#get-started-heading .userName');

    let becomeAHost = document.querySelector('.inner-header-container > div:first-of-type');
    let HTHBtnHeaderProfileMenu1 = getById('menuHYHBtn');
    let HTHBtnHeaderProfileMenu2 = getById('menuHYHBtn2');
    let HYHFinalBtn = getById('HYH');

    [becomeAHost, HTHBtnHeaderProfileMenu1, HTHBtnHeaderProfileMenu2].forEach(btn => {
        btn.addEventListener('click', () => {
            // if (userModel.currentLoggedUser !== 'Guest') {
            window.location.hash = 'becomeAHost';
            userNamePlaceholder.innerText = userModel.currentLoggedUser.firstName;
            // }
            // else {
            //     showElementsFlex(login);
            // }
        });
    });

    let collapsible = document.getElementsByClassName("collapsible");

    function updateProgressBar(progress, el) {
        let parentElId = el.parentElement.id;
        let id = parentElId.slice(parentElId.length - 1);
        progress.style.width = `${id * 20}%`;
    }

    Array.from(collapsible).forEach((step) => {
        step.addEventListener('click', (e) => {
            e.preventDefault();
            updateProgressBar(progress, step);
            alreadyOpened().forEach(el => {
                el.classList.toggle('active');
                // hideElements(el.nextElementSibling);
                showElementsStyle('none', el.nextElementSibling);
            });
            step.classList.toggle('active');
            let content = step.nextElementSibling;
            toggleDisplay(content, 'flex');
        });

        let continueBtn = step.parentElement.querySelector('.continue');

        if (continueBtn) {
            continueBtn.addEventListener('click', (e) => {
                e.preventDefault();
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

        stayObj['locationInfo'] = {
            "country": country,
            "city": city,
            "street": street
        }
        stayObj['location'] = city;

        let stayTypeData = getInputData('type');
        let propertyType = stayTypeData[0].value;
        let numberOfGuests = stayTypeData[1].value;
        let numberOfBedrooms = stayTypeData[2].value;
        let numberOfBeds = stayTypeData[3].value;
        let title = stayTypeData[4].value;
        let pricePerNight = stayTypeData[5].value;
        let description = getById('description').value;

        stayObj["stayType"] = propertyType;
        stayObj["guests"] = parseInt(numberOfGuests);
        stayObj["bedrooms"] = parseInt(numberOfBedrooms);
        stayObj["beds"] = parseInt(numberOfBeds);
        stayObj["title"] = title;
        stayObj["price"] = parseInt(pricePerNight);
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

        stayObj['amenities'] = amenitiesObj;
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

        let uploadImages = getById('uploadImages');
        let images = Array.from(uploadImages.querySelectorAll('img'));

        stayObj['images'] = images.map(el => el.src);;
        stayObj['host'] = userModel.currentLoggedUser.fullName;

        stayObj['id'] = staysManager.allStays.length + 1;
        return stayObj;
    }

    HYHFinalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (areAllImagesRightSize) {
            if (uploadImages.classList.contains('wrong')) uploadImages.classList.remove('wrong');

            let newStay = staysManager.addStay(getAllUserData());
            let user = userModel.currentLoggedUser;

            userModel.addStayToCurrentUser(user, newStay);
            setTimeout(() => {
                let images = Array.from(getById('uploadImages').querySelectorAll('img'));
                images.forEach(el => el.src = '');
                getStarted.reset();
                window.location.hash = 'homePage'
            }, 500);
        } else {
            uploadImages.classList.add('wrong')
        }
    });

})();