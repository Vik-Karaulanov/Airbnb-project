let allLocationsPage = getById('#allLocations');
// allLocationsPage.addEventListener('load', )
let selectedStayContainer = getById('targetStayContainer');
let errorMessage = getById('errorMessageP');
let currentLocation = localStorage.getItem('chosenLocation');
let allStaysInLoc = staysManager.allStays.filter(el => el.location === currentLocation);
let currentStay = staysManager.allStays.find(el => el.id === parseInt(localStorage.getItem('selectedStayId')));

if (currentStay) {
    errorMessage.innerHTML = '';
    printTargetStayPage(selectedStayContainer, currentStay);
} else errorMessage.innerHTML = 'No stay selected';

window.addEventListener('click', (ev) => {
    let selectedStay = ev.target.closest('.new-card')
    if (selectedStay) {
        errorMessage.innerHTML = '';
        let currentStayId = parseInt(selectedStay.id);
        staysManager.allStays.find(el => {
            if(el.id === currentStayId) {
                console.log(el);
                return el;
            }
        })

        currentStay = staysManager.allStays.find(el => el.id === currentStayId);

        localStorage.setItem('selectedStayId', currentStayId);

        printTargetStayPage(selectedStayContainer, currentStay);

        window.location.hash = 'targetLocation';
    }
})