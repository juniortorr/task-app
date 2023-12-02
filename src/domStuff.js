import newProj from './views/partials/popup.html?render'
const newProjectButton = document.querySelector('.newProject')
const cardContainer = document.querySelector('.container');

console.log('hello')

function newProjPopup() {
    cardContainer.innerHTML = newProj
    console.log('you hit me')
}




export { newProjectButton, newProjPopup }

