(function () {
    
    function alreadyOpened() {
        return Array.from(collapsible).filter(el => {
            return el.classList.contains('active');
        });
    }

    let progressBar = getById('progress-bar');
    let getStartedDiv = getById('get-started');
    let userNamePlaceholder = document.querySelector('#get-started-heading .userName');
    
    // userNamePlaceholder.innerText = userModel.currentLoggedUser.firstName || 'Guest';  // TODO !!!!!!!!!!!!!!!!!!!!!!!

    let becomeAHost = document.querySelector('.inner-header-container > div:first-of-type');
    let HTHBtn = getById('menuHYHBtn2');
    let sections = document.querySelectorAll('main > section');

    becomeAHost.addEventListener('click', () => {    
        Array.from(sections).forEach(el => el.style.display = 'none');
    });
    
    let collapsible = (document.getElementsByClassName("collapsible"));

    Array.from(collapsible).forEach((step) => {
        step.addEventListener('click', () => {
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

                toggleDisplay(step.nextElementSibling, 'flex');
                if (!nextStepBtn.classList.contains('active')) {
                    nextStepBtn.classList.toggle('active');
                    toggleDisplay(nextStepContent, 'flex');
                }
            });
        }
    })
})();
