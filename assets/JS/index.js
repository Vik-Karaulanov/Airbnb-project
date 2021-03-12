(function () {
window.addEventListener('hashchange', router);
window.addEventListener('DOMContentLoaded', router);
window.addEventListener('load', () => {
    localStorage.setItem('allStays', JSON.stringify(staysManager.allStays));
});
})();