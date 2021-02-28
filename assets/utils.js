function createEl(type, prop, value) {
    let el = document.createElement(type);
    el[prop] = value;
    return el;
}
function getById(id) {
    return document.getElementById(id);
}
function showElements(...elements) {
    elements.forEach(el => el.style.display = 'block');
}
function showElementsFlex(...elements) {
    elements.forEach(el => el.style.display = 'flex');
}
function hideElements(...elements) {
    elements.forEach(el => el.style.display = 'none');
}

function toggleDisplay(el, value) {
    let display = (window.getComputedStyle ? getComputedStyle(el, null) : el.currentStyle).display;
    if (display === 'none') {
        el.style.display = value;
    }
    else {
        el.style.display = 'none';
    }
}