// (function () {
    window.addEventListener('hashchange', router);

    let header = getById('mainHeader');
    let main = document.querySelector('main');
    let footer = getById('footer');
    let sectionsInMain = document.querySelectorAll('main > section');
    let search = getById('littleSearchLabel');
    
    search.addEventListener('click', (e) => {
        window.location.hash = 'allLocations';
    })

    function router(){
        let currentPage = window.location.hash.slice(1);

        switch (currentPage) {
            case 'homePage': {
                hideElements(test);
                showElements(...sectionsInMain);
            }
                break;
            case 'allLocations': {
                hideElements(...sectionsInMain);
                showElements(test);
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