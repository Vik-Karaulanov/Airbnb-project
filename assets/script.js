// (function () {
    window.addEventListener('hashchange', router);

    let header = getById('mainHeader');
    let main = document.querySelector('main');
    let footer = getById('footer');
    let sectionsInMain = document.querySelectorAll('main > section');
    let search = getById('littleSearchLabel');
    let loginBtn = document.querySelector('.login-container');
    let signup = getById('signup');
    
    loginBtn.addEventListener('click', () => {
        window.location.hash = "login";
    })
    
    search.addEventListener('click', (e) => {
        window.location.hash = 'allLocations';
    })

    function router(){
        let currentPage = window.location.hash.slice(1);

        switch (currentPage) {
            case 'homePage': {
                showElements(...sectionsInMain);
            }
                break;
            case 'allLocations': {
                hideElements(...sectionsInMain);
            }
                break;
            case 'targetLocation': {
                
            }
                break;
            case 'becomeAHost': {

            }
                break;
            case 'login': {
                showElementsFlex(signup);
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