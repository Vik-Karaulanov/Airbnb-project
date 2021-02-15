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
function hideElements(...elements) {
    elements.forEach(el => el.style.display = 'none');
}
