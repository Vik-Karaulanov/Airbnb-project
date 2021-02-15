// (function () {
    window.addEventListener('hashchange', router);
    window.addEventListener('DOMContentLoaded', router);

    let staysManager = new StaysManager();
    stays.forEach(el => {
        let stay = new Stay(el.location);
        console.log(stay);
        staysManager.allStays.push(stay);
    });

    let header = getById('mainHeader');
    let main = document.querySelector('main');
    let footer = getById('footer');
    let sectionsInMain = document.querySelectorAll('main > section');
    let search = getById('littleSearchLabel');
    let allLocations = getById('allLocations');
    let miniLocations = document.querySelectorAll('#mini .container .mini-card');
    
    console.log(miniLocations);

    miniLocations.forEach(el => {
        let chosenLocation = el.querySelector('.destination b').innerHTML;
        el.addEventListener('click', printAllLocationsPage(chosenLocation, staysManager.allStays))
    });

    search.addEventListener('click', (e) => {
        window.location.hash = 'allLocations';
    })

    function router(){
        let currentPage = window.location.hash.slice(1);

        switch (currentPage) {
            case 'homePage': {
                hideElements(allLocations);
                showElements(...sectionsInMain);
            }
                break;
            case 'allLocations': {
                hideElements(...sectionsInMain);
                showElements(allLocations);
            }
                break;
            case 'targetLocation': {
                
            }
                break;
            case 'becomeAHost': {

            }
                break;
            case 'login': {

            }
                break;
            case 'errorPage': {

            }
                break;
            default:
                break;
        }
    }
// })();