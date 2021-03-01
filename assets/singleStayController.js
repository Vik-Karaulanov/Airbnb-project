let allLocationsPage = getById('#allLocations');
// allLocationsPage.addEventListener('load', )
let selectedStayContainer = getById('targetStayContainer');
let currentLocation = localStorage.getItem('chosenLocation');
let allStaysInLoc = staysManager.allStays.filter(el => el.location === currentLocation);
let currentStay = localStorage.getItem('selectedStay') || {};
let currentStayTitle = '';

printTargetStayPage(selectedStayContainer, JSON.parse(currentStay));

window.addEventListener('click', (ev) => {
    let selectedStay = ev.target.closest('.new-card')
    if (selectedStay) {
        let currentStayTitle = selectedStay.querySelector('.stay-title').innerHTML;
        currentStay = staysManager.allStays.find(el => el.title.startsWith(currentStayTitle));
        localStorage.setItem('selectedStay', JSON.stringify(currentStay));

        printTargetStayPage(selectedStayContainer, currentStay);

        window.location.hash = 'targetLocation';
    }
})